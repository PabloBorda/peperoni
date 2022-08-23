#encoding: utf-8
require 'rubygems'
require 'sinatra'
require 'sinatra/base'
require 'sinatra/assetpack'
require 'to_regexp'
require 'set'
require 'oj'
require 'date'
require 'levenshtein'
require 'thin'
require 'nokogiri'




session_store = {}


class Object
  def to_json
    Oj.dump(self)
  end


end




Encoding.default_external = Encoding::UTF_8
#class AdminTools < Sinatra::Base; end

app = Sinatra.new

app.set :public_folder, 'public'
app.set :bind, '0.0.0.0'  
app.set :port,9092
#app.set :server, 'thin'
app.enable :sessions

app.set :show_exceptions => false

app.error { |err|
  Rack::Response.new(
    [{'error' => err.message}.to_json],
    500,
    {'Content-type' => 'application/json'}
  ).finish
}

# THIS IS AN ADDON ARCHITECTURE, NO DIRTY CLASSES AND COMPLICATED PATTERNS .. AS EASY AS THAT !
# ONLY OBJECTS
# THIS STUFF IS QUITE ABSTRACT AND IT WORKS

addons = []
Dir.entries('addons').each do
  |dir|
  if (dir.include? ".rb")
    file_source_code = File.open("addons/" + dir, "rb")
    addon_source_code_as_string = file_source_code.read
    puts "Evaluating addon source code: " + dir.to_s
    addon = eval(addon_source_code_as_string)   
    addons.push(addon)
  end
end





app.before /[a-zA-Z][_]feed/ do

  puts "RUNNING BEFORE "
  

  addons.each do |a|
    if ((a[:type].include? "FEED"))      

      login_session_result = {}
      
      #puts "OPENNED SESSIONS " + session_store.to_json
      while (session_store[(session[:username] + "|||" + a[:addon_name])].nil?)
        begin
          puts "Trying to connect to " + a[:addon_name].to_s
          login_session_result = a[:login].call()
          session_store[(session[:username] + "|||" + a[:addon_name])] = ({:name => a[:addon_name],:session => login_session_result})
        rescue Exception => e  
          puts "Failed login for feed " + a[:addon_name] + " REASON: " + e.message

        
        end     
      end
      puts "LOGGED IN TO : " + a[:addon_name].to_s    
    end    
  end
end



addons.each do |a|
  puts a.to_json
  if ((a[:type]=="DYNAMIC_FEED"))
    puts "IS A DYNAMIC_FEED"
    app.get(("/" + a[:addon_name] + "*"),&a[:retriever])
  end

  puts "helper_methods " + a[:menu_items].to_json
  if (!a[:menu_items].nil?)
    a[:menu_items].each do |method_object|
      method_object.each_pair do |method_name,method_block|
      puts "METHOD_NAME_FROM_ADDON " + method_name.to_s + " METHOD_BLOCK " + method_block.to_s
        app.get "/" + method_name.to_s + "*", &method_block
        app.post "/" + method_name.to_s + "*", &method_block
      end
    end
  end
end
















CALLBACK_URL = 'http://localhost:9092/login_callback'
APP_ID = '1dy7m2arc6usnz0p9985bdkfo'
APP_SECRET ='1xton2axisfhyeemksuyzscve'



def login
    nylas = Nylas::API.new(APP_ID, APP_SECRET, nil)
    nylas.url_for_authentication(CALLBACK_URL, nil)
end


def get_token
    nylas = Nylas::API.new(APP_ID, APP_SECRET, nil)
    nylas.token_for_code(params[:code])
end


app.get '/login_callback' do
    # get token from code
    nylas_token = get_token

    if nylas_token
        # Store token in a session
        session[:nylas_token] = nylas_token
        redirect to('/')
    end

    "Error during auth"
end



app.get '/get_threads' do




end




  app.get '/' do
    session[:feed_sessions] = []
    
    message_thread_compatible = {}



    # Redirect to login if session doesn't have an access token
    redirect to(login) unless session[:nylas_token]


    if session[:nylas_token]
      session[:username] = session[:nylas_token]
    end

    # Get the first namespace
    nylas = Nylas::API.new(APP_ID, APP_SECRET, session[:nylas_token])


    tr = nylas.threads.where(:tag => 'unread')

    # Get the first five threads in the namespace
    recent_threads = []
    tr.range(0,5).each do |thread|
      message_thread_compatible[:participants] = thread.participants
      message_thread_compatible[:subject] = thread.subject
      message_thread_compatible[:messages] = []
 
      thread.message_ids.each do |a| 
        #message_thread_compatible[:messages].push({:id => a, :raw_content => nylas.messages.find(a).raw })
        message_thread_compatible[:messages].push({:id => a, :raw_content => nylas.messages.find(a).body})
      end

      recent_threads.push(message_thread_compatible)
    end

    session_store[(session[:username].to_s + "|||tickets")] = recent_threads
    
   # puts "THREAD CONTENTS: " +  tr.to_json
   # account_holder = tr.first.to['name']

     # List messages on the first thread
   # body = "Hello #{account_holder}, here are your last 5 emails:\n<br><br>"

   erb :search



    
  end


  #allowed_people = ["pborda@paypal.com","amusumeci@paypal.com","mlaskowski@paypal.com","anegro@paypal.com"]


  app.post '/login*' do
    puts "MY SESSION HAS " + session.to_json
    session[:username] = params[:email]   
    puts "LOGIN WITH " + params[:email].to_s
  #  if (allowed_people.include? session[:username])
    erb :search
  #  else
   #   "DENIED"
   # end
  end


  app.get '/ppbutton' do
    erb :ppbutton
  end



  app.get '/my_inbox' do
    
    
    my_threads = session_store[(session[:username].to_s + "|||tickets")]
    my_threads = my_threads.to_json



  end



  app.get '/load_web_addons_as_json' do
    addons.select {|a| a[:type].eql? "WEB"}.map {|a| 
        file_source_code = File.open("addons/" + a[:addon_name] + ".rb", "rb")
        eval(file_source_code.read).to_json
        
    }.to_json
  end


  app.get '/load_web_addons_as_normal_text' do
    addons.select {|a| a[:type].eql? "WEB"}.map {|a| 
        file_source_code = File.open("addons/" + a[:addon_name] + ".rb", "rb")
        file_source_code.read
        
    }.to_json
  end







  app.get '/suggest_me_feed' do
    begin
      findstr = params[:q]
      suggestions = []
      feed_addons = addons.select {|a| a[:type].to_s.eql? "DYNAMIC_FEED"}
      processed_suggestions = []
      feed_addons.each do |a|

        #byebug
        session_feed = session_store[(session[:username].to_s + "|||" + a[:addon_name].to_s)][:session]
        #puts "SESSION FROM SUGGEST_ME METHOD " + session_feed.to_json

        from_dynamic_feed_addon = a[:processor].call(a[:retriever].call(session_feed,params),findstr)

        if (!from_dynamic_feed_addon.nil?)
          processed_suggestions = processed_suggestions + from_dynamic_feed_addon
        else
          processed_suggestions
        end
      end
       a = { 
         :query => params[:q].to_s,
         :suggestions => processed_suggestions
         #:suggestions => global_suggestions_filter(processed_suggestions,findstr)
        }.to_json

      a

      rescue Exception => e
        puts e.message
        puts e.backtrace.inspect
        return ""
      end


  end



  # I found out different approaches to work on the pattern matching...
  # ===================================================================

  # Problem: lets supose you have transaction ID 3737373737373738472 and it is found by the parser, then it gets replaced to
  # <a href="http://www.sample.com/parser?tid=3737373737373738472">3737373737373738472</a>
  
  # 3737373737373738472 =====> <a href="http://www.sample.com/parser?tid=3737373737373738472">3737373737373738472</a>
 
 
  # But if you modify the same structure you are iterating over, you will get something like: 
  
  
  # 3737373737373738472 =====> <a href="http://www.sample.com/parser?tid=3737373737373738472"><a href="http://www.sample.com/parser?tid=3737373737373738472">3737373737373738472</a></a> ==> <a href="http://www.sample.com/parser?tid=3737373737373738472"><a href="http://www.sample.com/parser?tid=3737373737373738472"><a href="http://www.sample.com/parser?tid=3737373737373738472">3737373737373738472</a></a></a>
  
  # Or if you run the parsing everytime the editor changes content, the transaction ID you see in the parameters may be accidentally derived as well 
  
  # 3737373737373738472 =====> <a href="http://www.sample.com/parser?tid=<a href="http://www.sample.com/parser?tid=3737373737373738472">3737373737373738472</a>"><a href="http://www.sample.com/parser?tid=<a href="http://www.sample.com/parser?tid=3737373737373738472"><a href="http://www.sample.com/parser?tid=3737373737373738472">3737373737373738472</a></a>">3737373737373738472</a></a> ==> <a href="http://www.sample.com/parser?tid=<a href="http://www.sample.com/parser?tid=3737373737373738472">3737373737373738472</a>"><a href="http://www.sample.com/parser?tid=3737373737373738472"><a href="http://www.sample.com/parser?tid=3737373737373738472">3737373737373738472</a></a></a>
  
  
  # and then a dirty infinite loop....if not just dirty data
  # This is a HUGE problem, and I have tought about the following approaches

  
  
  # Solutions
  
  # a) Client side solution


  
  
  
  # 1- Server side pattern matching: The client everytime the editor changes content sends it to the parser so it detects and returns new markup. 
  
  # Bad things: When the editor changes, it sends the full DOM back to server... then the server will not also find the transaction ID, but it will find all extra transaction ID in parameters, and also the previously derived ones,  and simply derive them again, (even if you iterate on one DOM and generate a copy of it, because it will be sent back when it gets sent back to server when the editor changes its content)...
  # Server resources: Too much server resources.. imagine 100 people sending and receiving the text they are editing for every change they make 
  
  # 
  
  
  
  
  # 2- Server side pattern matching, but processing DOM nodes, instead of processing it as simply text to replace. 
  
  # Good things: Allows you to have exact rules in order to modify text, such as retrictions on "only modify text nodes or leafs", not parameters, allows you to use xpath, etc.. 
  # Bad things: Solves part of the problem, but you will get the full text node replaced by the link, but the next time the editor sends the full DOM again, it will replace the generated text nodes that contain the pattern, or transaction ID as in the example.
  
  
  
  
  
  
  
  # 3- Server side pattern matching, processing DOM nodes, but instead of returning the markup returning DOM list of changes (more eficcient from view, instead of setting full data from the editor), 
  # Steps

  # a- returning the list of nodes that should be modified and the new content with a modified flag, and the string pattern that matched in the text node, which may be not the whole text node,
  # b- then the javascript picks that list and modifies nodes if not previously modified, modifies it, and sets flag as modified.
  # c- Then the server received the full markup back again, and sends back to the server the list with the necessary changes.
  # d- The client needs to filter out the nodes that have same xpath, have been modified and have flag false, but that DOM change existing in the client changes list  needs to have modified flag set in true, else the client parser will pick and find out the modified flag is false and attempt to modify again... 
  # e- When the DOM is sent back to the server, it will not know what was already modified... so il will return the list of modifications even for the previously generated links or "renders" from the transaction ID, but their modified flags will be set to false, but the path of the new modification, MAY DIFFER FROM THE ONE THAT WAS ALREADY MODIFIED, THUS IT WONT ENABLE TO PROTECT THE MODIFICATION OF DOM THAT WAS PREVIOUSLY MODIFIED !! FUCK!
  # f- To prevent this I would need to get the suggested modification by the server, find the matched pattern within all text nodes, and then iterating over parents, compare both DOM structures to see if the detection was not already a change
  
  
  
  
  
  

  # 4- Make WEB addons be javascript based instead of ruby, and serialize the addon and send it to the client at login time. Then use eval to execute it and execute a loop thru all addons searching for patterns when the editor changes content..
  #  I would need to taka care not to modify the same DOM structure I'm traversing over, but instead for each traversed element if it is or not modified, insert it to a new blank DOM, then once it finished, set the editor with that data by using setData 

  # Good things: The server does not need to handle all parsing stuff and the pattern detection should be executed by the javascript at client side. Imagine 100 guys using the system, and sending and receiving parsing data all the time...
  # Bad thinngs: The client could be able to modify or to write new javascript malicious code (which I doubt about it since the access to data should be server controlled.)
  # Have to translate my ruby WEB addons to javascript, modify the session so when it finds a WEB addon in the directory instead of interpreting it, send the javascript code serialized to the browser, and keep it in session on client side, and then run eval on each addon from javascript.
  
  
  
  # Using solution 3


  def parse_function(ticket,level,sibling,addons)
    dom_modifications = []
    if !ticket.nil?
      ticket_html = Nokogiri::HTML(ticket)
      ticket_html_text_nodes = ticket_html

      ticket_html_text_nodes.traverse do
        |t|

        if t.text?

          puts "PARSING NODE: " + t.text.to_s
          addons.each do |a|
              if (a[:type]=="WEB")
                k = a[:addon_name]                
                puts "SEARCHING " + k.to_s
                
                v = a[:matching_lambda]
                r = a[:render_lambda]
                mo = a[:on_mouse_over_lambda]
                hmetu = a[:menu_items]
                childs = a[:childs]
                parent = a[:parent]
                color = a[:color]
                 
                v1 = v.call



                if t.content=~/#{v1}/
                  #byebug
                  match_position_in_this_text_node = (t.content=~/#{v1}/)
                  matched_content_from_text_node = t.content[/#{v1}/]
                  string_prior_match = t.content[0..match_position_in_this_text_node].delete(matched_content_from_text_node).to_s
                  string_after_match = t.content[(match_position_in_this_text_node-1)..(t.content.size)].delete(matched_content_from_text_node).to_s
                  
                  if r.nil?
                    r =  Proc.new { |addon,matched|

                      menu_options = ""

                      a[:menu_items].each { |e|
                        menu_options = menu_options + "<li class=\"last\"><a href='#'><span>" + e.keys[0].to_s + "</span></a></li>"

                      }

                      sibling = 0
                      if !childs.nil?
                        childs.each { |e|
                          menu_options = menu_options + parse_function(ticket,level+1,sibling,addons)
                          sibling = sibling + 1

                        }
                      end


                      building_menu = "<link rel='stylesheet' type='text/css' href='/styles/menu.css?version=51'>
                                     <div class='cssmenu' contenteditable='false'>
                                       <ul style='background:#{a[:color]}!important;'>
                                         <li class='has-sub'>
                                           <a href='#'>
                                             <span>
                                               <label style='color:white!important;'>" + matched.to_s + "</label>
                                             </span>
                                           </a>
                                           <ul>" + menu_options + "</ul>
                                         </li>

                                       </ul>
                                     </div>"

                      building_menu.to_s


                    }
                  end
                  if mo.nil?
                    mo = Proc.new { |addon|
                      "".to_s
                    }
                  end
                  new_node ="<label>" + string_prior_match +  "</label><span id=\"generated_" + matched_content_from_text_node.hash.to_s + "\">" + (r.call(a,matched_content_from_text_node.to_s).to_s + mo.call(a).to_s)  + "</span><label>"  + string_after_match + "</label>" 
                  new_node_parsed_into_dom = Nokogiri::HTML(new_node)
                  #byebug
                  puts "THE INDEX OF THIS TEXT NODE IS: " + t.parent.children.index(t).to_s
                  
                  if (!ticket.include? ("replaced_" + matched_content_from_text_node.hash.to_s))
                    #byebug
                    # inside the outer if I make sure this modification node is generated only for those nodes that were not modified
                    dom_modifications.push({:regex => a[:matching_lambda],:replace_text_by => new_node_parsed_into_dom.to_html,:matched => matched_content_from_text_node,:hash_for_match => matched_content_from_text_node.hash.to_s })
                  
                  end

                end
              end
          end

        end

      end
      puts "THE DOM REPLACEMENTS ARE: " + dom_modifications.to_json
      dom_modifications.to_json
    else
      "empty"
    end
  end



  app.get '/addons' do
    session[:my_addons] = []
    
    Dir.entries('addons').each do
      |dir|
      if (dir.include? ".rb")
        file_source_code = File.open("addons/" + dir, "rb")  
        addon = eval(file_source_code.read)   
        session[:my_addons].push({:addon_name => dir.to_s, :allowed => true, :installed => true, :description => addon[:description]})
      end
    end
    erb :addons
  end




  app.post '/parse*' do
   begin
    parse_function(params[:ticket],0,0,addons).to_s
   rescue Exception => e
     puts e.message
   end


  end


app.get '/suggestion_item.ejs' do
  File.read(File.join('views', 'suggestion_item.ejs'))
end


app.get '/new_editor.ejs' do
  File.read(File.join('views', 'new_editor.ejs'))
end

app.get '/matched_item_menu.ejs' do
  File.read(File.join('views','matched_item_menu.ejs'))

end


app.get '/tools' do
  erb :tools

end


app.post '/static_feeds' do
  begin
    @static_feeds_notification_area = ""

    addons.each do |a|
      #puts a.to_json
      if (a[:type]=="STATIC_FEED")
        #puts "IS A STATIC_FEED"
        addon_session = session_store[(session[:username].to_s + "|||" + a[:addon_name].to_s)][:session]
        #puts "addon_session: " + addon_session.inspect 
        addon_retrieved_data = a[:retriever].call(addon_session,params[:query])
        #puts "i got search term: " + params[:query]
        #puts "addon_retrieved_data: " + addon_retrieved_data.inspect
        addon_processed_data = a[:processor].call(addon_retrieved_data, params[:query])
        #puts "addon_processed_data: " + addon_processed_data.inspect
        #byebug
  
        addon_processed_data_renderized = addon_processed_data.inject("") { |r,e| r = r + "<li class=\"last\"><a href='#'><span>" + e[:knows] + "</span></a></li>" }
 
      



        @static_feeds_notification_area = @static_feeds_notification_area + "<li class='has-sub'><a href='#'><span><img  src=\"/images/" + a[:addon_name] + ".png\" />" + 
        "</span></a><ul>" + addon_processed_data_renderized + "</ul></li>"
      end
    end
    @static_feeds_notification_area
    erb :static_feeds

  rescue
    puts "static_feeds failed, I dont care, next time will work"

  end
end


app.routes["GET"].each do |route|
  puts "ROUTE GET: " + route[0].to_s
end


app.routes["POST"].each do |route|
  puts "ROUTE POST: " + route[0].to_s
end




app.post '/learn*' do


  sample_ticket = JSON.parse("{
        \"RightNowTicket\": [
            {
                \"RefNum\": \"666666-666666\",
                \"DateEntered\": \"66/66/6666 66:66 AM\",
                \"AccountID\": \"\",
                \"CID\": \"\",
                \"Subject\": \"\",
                \"EntryType\": \"2\",
                \"Assigned\": \"\",
                \"Status\": \"\",
                \"SupportLevel\": \"\",
                \"ContactEmail\": \"\",
                \"Priority\": \"\",
                \"TargetVersion\": \"\",
                \"TargetDate\": \"\",
                \"BugID\": \"\",
                \"Severity\": \"\"
            }
        ],
        \"Ack\": \"Success\",
        \"CorrelationID\": \"\",
        \"Errors\": null,
        \"Version\": \"1\",
        \"Build\": \"11\"
    }

")



  unless params[:learnfile] &&
      (tmpfile = params[:learnfile][:tempfile]) &&
      (name = params[:learnfile][:filename])
    @error = "No file selected"
    return haml(:upload)
  end


  pick_all_directly_from_file = tmpfile.read


  chunks = pick_all_directly_from_file.gsub("\t","").gsub("\r","").split("\n")





  chunks.each_slice(5) do |a,b,c,d,e|


    sample_ticket['RightNowTicket'][0]['Note'] = [{:paragraph => a.to_s.gsub("\n","").force_encoding("utf-8")},{:paragraph => b.to_s.gsub("\n","").force_encoding("utf-8")},{:paragraph => c.to_s.gsub("\n","").force_encoding("utf-8")},{:paragraph => d.to_s.gsub("\n","").force_encoding("utf-8")},{:paragraph => e.to_s.gsub("\n","").force_encoding("utf-8")}]

    # puts sample_ticket['RightNowTicket'][0]['Note'].to_json

    Tire.index 'tickets-notes-converted-into-paragraphs' do

      my_ticket = sample_ticket.clone

      store (my_ticket)

      refresh


    end


  end
  "OK FINISHED"
end






app.post '/save_addon' do
  addon_source_code = params[:addon_source_code].to_s
  puts "I GOTS STRING: " + addon_source_code.to_s
  addon_instance = eval(addon_source_code)
  puts "SAVING: " + addon_instance.to_json
  addon_name = addon_instance[:addon_name]
  File.write('addons/' + addon_name + ".rb",addon_source_code)



end





app.get '/editor.ejs' do
  File.read(File.join('views','editor.ejs'))

end












app.run!
