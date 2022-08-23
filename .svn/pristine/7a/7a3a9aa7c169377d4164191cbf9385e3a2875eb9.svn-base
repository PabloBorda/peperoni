require 'rubygems'
require 'tire'
require 'yajl/json_gem'

require 'json'
require 'mongo'
require 'bson'



    client = Mongo::MongoClient.new("10.64.255.76")
    db = client['pborda']
    coll = db['mts-tickets']
    coll_processed = db['mts-tickets']


    process_by_paragraph = []
    process_by_sentence = []
    ticket_count = 1

    Tire.index 'tickets-notes-converted-into-paragraphs' do     
      delete
      create
      coll.find().each do |ticket|
        my_ticket = JSON.parse(ticket.to_json)
        my_ticket.delete("_id")
        my_ticket.delete("Properties")

        
        my_ticket["RightNowTicket"].each do 
          |t|
          t["Note"] = ((t["Note"].split "<br>").map do
            |paragraph|
            
            if (!paragraph.eql? "")
              {"paragraph" => paragraph.gsub("\"","")}
             
            end

          end).compact
          
 
        end
        


        store (my_ticket)
        #puts "Inserted: " + ticket.delete("_id").to_json
  
      end
      refresh


    end






