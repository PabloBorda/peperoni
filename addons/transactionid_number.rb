# cal addon
# finds errors in all pools and shows up summary

{
  :addon_name => "transactionid_number_web",
  :description => "Detects and highlights transaction IDs...",
  :type => "WEB",
  :matching_lambda => Proc.new { /(?=\w*\d)(?=\w*[A-Z])\w{17}/
    #  !!((str.size>=12) and (str.size < 14) and (str.match /[a-z]{1,}/) and (str.match /\d{1,}/))
   },
  :menu_items => [{ :get_flowlog_for_this_transactionid => Proc.new { 
                                            
                                             "<iframe width=\"800\" height=\"600\" src=\"http://10.64.255.76:6666/search_cal_errors?cal=" + params[:matched_value] + "&run=Search\">Your browser does not support iframes</iframe>"
                                           }
                      },
                      {:mimic_transaction_in_sandbox => Proc.new {
                                    
                                           "<iframe width=\"800\" height=\"600\" src=\"http://cal.vip.paypal.com/cgi/idsearch_manager.py?id_type=corr_id&id_value=" + params[:matched_value] + "&fetchlog=1&submit=Search\">Your browser does not support iframes</iframe>"
                                          }

                      }, 
                      { 
                        :find_errors_on_transaction_flowlog => Proc.new {
                             "<iframe width=\"800\" height=\"600\" src=\"http://10.64.255.76:6666/search_cal_errors?cal=" + params[:matched_value] + "&run=QuickSearch\">Your browser does not support iframes</iframe>"

                        }
 

                      },
                       { 
                        :get_alternative_values_for_this_transaction_id => Proc.new {
                             "<p>The idea of this is to get a transaction id for a token, a cal set for a token, and all values that belong to the same operation</p>"

                        }
 

                      }
                                        
  ],
  :color => "#222D65"
}