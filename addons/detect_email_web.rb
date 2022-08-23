
{
  :addon_name => "detect_email_web",
  :description => "Detects and highlights emails",
  :type => "WEB",
  :matching_lambda => "([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9._-]+)",
  :menu_items => [{ :get_flowlog_for_this_paypal_account => Proc.new { 
                                            
                                             "<iframe width=\"800\" height=\"600\" src=\"http://10.64.255.76:6666/search_cal_errors?cal=" + params[:matched_value] + "&run=Search\">Your browser does not support iframes</iframe>"
                                           }
                      },
                      {:get_flowlog_for_this_paypal_account_in_sandbox => Proc.new {
                                    
                                           "<iframe width=\"800\" height=\"600\" src=\"http://cal.vip.paypal.com/cgi/idsearch_manager.py?id_type=corr_id&id_value=" + params[:matched_value] + "&fetchlog=1&submit=Search\">Your browser does not support iframes</iframe>"
                                          }

                      }, 
                      { 
                        :open_paypal_account => Proc.new {
                             "<iframe width=\"800\" height=\"600\" src=\"http://10.64.255.76:6666/search_cal_errors?cal=" + params[:matched_value] + "&run=QuickSearch\">Your browser does not support iframes</iframe>"

                        }
 

                      }
 

                      
                                        
  ],
  :color => "#FF66FF"
}