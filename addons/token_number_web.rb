

{
  :addon_name => "token_number_web",
  :description => "Highlights token numbers and show options to see its flowlog, find errors on the account that belongs to a token, find token in sandbox,alternative values for tokens suchs as transaction IDs etc...",
  :type => "WEB",
  :matching_lambda => "EC-(?=\\w*\\d)(?=\\w*[A-Z])\\w{17}",
  :menu_items => [{ :get_flowlog_for_this_token => Proc.new { 
                                            require 'mechanize'
                                             "<iframe width=\"800\" height=\"600\" src=\"http://10.64.255.76:6666/search_cal_errors?cal=" + params[:matched_value] + "&run=Search\">Your browser does not support iframes</iframe>"
                                           }
                      },
                      {:run_token_in_sandbox => Proc.new {
                                           require 'mechanize'
                                           "<iframe width=\"800\" height=\"600\" src=\"http://cal.vip.paypal.com/cgi/idsearch_manager.py?id_type=corr_id&id_value=" + params[:matched_value] + "&fetchlog=1&submit=Search\">Your browser does not support iframes</iframe>"
                                          }

                      }, 
                      { 
                        :find_errors_on_token_flowlog => Proc.new {
                             require 'mechanize'
                             "<iframe width=\"800\" height=\"600\" src=\"http://10.64.255.76:6666/search_cal_errors?cal=" + params[:matched_value] + "&run=QuickSearch\">Your browser does not support iframes</iframe>"

                        }
 

                      },
                       { 
                        :get_alternative_values_for_this_token => Proc.new {
                          require 'mechanize'
                             "<p>The idea of this is to get a transaction id for a token, a cal set for a token, and all values that belong to the same operation</p>"

                        }
 

                      }
                                        
  ],
  :color => "#F2F179",
  :childs => [],
  :parent => ""
}