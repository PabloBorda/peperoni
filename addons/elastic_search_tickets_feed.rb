#elastic search


require 'rubygems'
require 'rest_client'
require 'tire'
load 'helpers/string.rb'

def get_closest_paragraph(ticket,findstr)
  if !ticket["RightNowTicket"].nil?
    (ticket["RightNowTicket"].map { |t| 
      best_match = t["Note"].max_by { |p|
        p[:paragraph].count_similar_words(findstr)[:amount]      
      }
      best_match[:paragraph]
    }).max_by {|best_paragraph_for_note| best_paragraph_for_note.count_similar_words(findstr)[:amount] }
  else
    ""
  end
end


 {:base_url => "http://10.25.96.39:9200/tickets-notes-converted-into-paragraphs/document/_search",
  :username => "",
  :password => "",
  :addon_name => "elastic_search_ticket_feed",
  :description => "ElasticSearch feed, finds content as you type and displays suggestions at the right, etc...",
  :type => "DYNAMIC_FEED",
  :matching_lambda => Proc.new { /([0-9]{19})/ },
  :login => Proc.new { 
    "http://10.25.96.39:9200/tickets-notes-converted-into-paragraphs/document/_search"
  },
  :retriever => Proc.new { |login_result,search_term|
    Tire.configure do
      url "http://10.25.96.39:9200"
    end

    s = Tire.search('tickets-notes-converted-into-paragraphs') {

     filtered_search_term = search_term[:q].tr('^A-Za-z0-9 ', '')
     if (filtered_search_term.size>0)
       query { string ('document.RightNowTicket.Note.paragraph:' + filtered_search_term) }
     end
     size = 300
    }
    a = s.results
    a
  },
  :processor => Proc.new { |notes,findstr|

        suggestions = []
        suggestions_for_elastic_search = []
        suggestions_for_elastic_search = notes.map { |l| 
                                                    if !l["RightNowTicket"].nil?
                                                      #puts "THIS IS TICKET_________________________________" + l.to_json
                                                      { :q => findstr, 
                                                        :mr => "",#l["RightNowTicket"][0]["Assigned"].to_s.eql?("") ? (l["RightNowTicket"][0]["Assigned"].to_s.split(" ")[0][0].downcase + l["RightNowTicket"][0]["Assigned"].to_s.split(" ")[1].downcase) : "",
                                                        :knows => get_closest_paragraph(l,findstr),  #l.text
                                                        :for => findstr,
                                                        :ticket_number => l["RightNowTicket"][0]["RefNum"].to_s,
                                                        :note_number => "0",
                                                        :selection_counter => 0
                                         
                                                       } 
                                                      end
                                                    }

       suggestions = suggestions + suggestions_for_elastic_search
       (suggestions.select { |x| !(x[:knows].eql? "") and (x[:knows]!=nil) and !(x[:knows].include? "<") }).uniq! {|s| s[:knows]}

  },
  :how_many_results => 10,
  :menu_items => [{:find_ticket_feed => Proc.new {
    tik = params[:ticket_number]
    if (!tik.eql? "666666-666666")

      #puts "TICKET TO FIND " + tik

      Tire.configure do
        url "http://10.25.96.39:9200"
      end


      s = Tire.search('tickets-notes-converted-into-paragraphs') { query { string ('document.RightNowTicket.RefNum:' + tik) } }
    
      s.results.first.to_json

    else
      "{\"message\": \"THE SOURCE OF THIS PARAGRAPH IS NOT A TICKET\"}"
    end
    }}]
  
        
}
