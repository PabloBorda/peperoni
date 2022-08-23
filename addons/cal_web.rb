
{
  :addon_name => "cal_web",
  :description => "Detects CAL numbers and show up menu with tools such us list errors from CAL, and visit CAL itself...",
  :type => "WEB",
  :matching_lambda => "(?=\\w*\\d)(?=\\w*[a-z])\\w{12,13}",
  :menu_items => [{ :find_errors_on_cal => Proc.new { 
                                            
                                                       require 'mechanize'
                                                       require 'nokogiri'
                                                       require 'sinatra'
                                                       require 'base64'
 
                                                       classes_that_show_errors = ["evt_warn","evt_err","background:#FCC","evt_url","evt_tran"]                                                       
                                                       pools_to_query_errors = "helixserv,webservicesproxy,nvpacquiringserv,riskmodelserv,bindataserv,webscr"


                                                       m = Mechanize.new
                                                       page = m.get("http://cal.vip.paypal.com/cgi/idsearch_manager.py?id_type=corr_id&id_value=" + params[:matched_value] + "&fetchlog=1&submit=Search")
                                                       puts "My url is: http://cal.vip.paypal.com/cgi/idsearch_manager.py?id_type=corr_id&id_value=" + params[:matched_value] + "&fetchlog=1&submit=Search"
 
                                                       if !page.body.include? "ID not found"
                                                         puts "I found the cal ID " + params[:matched_value]
                                                         pools = []
                                                         if (params[:matched_value].eql? "Search")
                                                           pools = page.links.select {|l| (l.text.include? "Logview") }
                                                         else
                                                           pools = page.links.select {|l| (l.text.include? "Logview") and (pools_to_query_errors.split(",").any? {|w| l.href.include? w }) }
                                                         end
 
                                                         class_or_style = ""

                                                         ("<style>" + File.open("addons/cal.css", "rb").read + "</style>") + (pools.inject ("") {|tmp,p| pool_log_page =  p.click
                                                         class_or_style = (classes_that_show_errors.inject ("") {|tmp,c| (" (@style=\'" + c + "\') or (@class=\'" + c + "\') or") + tmp })[0..-4]
                                                         puts "*******************************************" + class_or_style
                                                         my_error = tmp + (pool_log_page.parser.xpath("//*[" + class_or_style + " or (contains(text(),'content0'))]").inject ("") {|tmp,n|

                                                         if (n.include? "content0")

                                                           "From pool: <a href=\""  + p.href + "\">"  + p.href.split("&")[1].split("=")[1] +  "</a> " +  "REQUEST OR RESPONSE, I DUNNO: " + Base64.decode64(n.to_s) + " " + tmp

                                                         else

                                                           "From pool: <a href=\""  + p.href + "\">"  + p.href.split("&")[1].split("=")[1] +  "</a> "  + "Found error: " + n.to_s + "<br/>" + tmp


                                                         end

                                                      })

                                                      puts my_error
                                                      my_error
                                                      })
                                                    else
                                                      "ID not found, go" + " <a href=\"/\">BACK</a>"
                                                    end

                                           }
                      },
                      {:visit_cal_site => Proc.new {
                                    
                                           "<iframe width=\"800\" height=\"600\" src=\"http://cal.vip.paypal.com/cgi/idsearch_manager.py?id_type=corr_id&id_value=" + params[:matched_value] + "&fetchlog=1&submit=Search\">Your browser does not support iframes</iframe>"
                                          }

                      }, 
                      { 
                        :find_errors_on_cal_quick_search => Proc.new {
                             "<iframe width=\"800\" height=\"600\" src=\"http://localhost:6666/search_cal_errors?cal=" + params[:matched_value] + "&run=QuickSearch\">Your browser does not support iframes</iframe>"

                        }
 

                      }
                                        
  ],
  :color => "#F69126",
  :childs => [],
  :parent => ""
}