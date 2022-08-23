require 'rubygems'
require 'mechanize'
require 'json'
require 'rest_client'



 {:base_url => "https://jira.paypal.com",
  :username => "pborda",
  :password => "pan.hot.red-507",
  :addon_name => "jira_feed",
  :description => "Performs JIRA bug search and displays results at the top for each new paragraph you type...",
  :type => "STATIC_FEED",
  :matching_lambda => Proc.new { /([0-9]{19})/ },
  :login => Proc.new { 
  },
  :retriever => Proc.new { |login_result,search_term|
     
    bugs = RestClient.get "https://jira.paypal.com/jira/rest/api/2/search?jql=summary ~ '" + search_term + "' ORDER BY created DESC"
    JSON.parse(bugs)
  },
  :processor => Proc.new { |my_bug_links,findstr|

      suggestions = []
      if !my_bug_links["issues"].nil?
        suggestions_for_jira = my_bug_links["issues"].map { |l| { :q => findstr, 
                                                        :mr => "JIRA",
                                                        :knows => "<a href=\"https://jira.paypal.com/jira/browse/#{l["key"]}\">" + l["key"] + "<br>" + l["fields"]["summary"] + "</a>",
                                                        :for => findstr,
                                                        :ticket_number => "0",                
                                                        :note_number => "0",
                                                        :selection_counter => 0
                                       
        } }

       puts "Suggestions for jira" + suggestions_for_jira.inspect
       suggestions = suggestions + suggestions_for_jira[0..10]

     end

     suggestions

  },
  :how_many_results => 10,
  :menu_items => []
  
        
}
