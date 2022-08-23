
{
  :addon_name => "url_detect_web",
  :description => "Detects URL and allows to visit it, to send it an IPN, to check for POODLE, and so on...",
  :type => "WEB",
  :matching_lambda => "(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?(\\s|\\n)",
  :menu_items => [{ :send_sample_ipn => Proc.new { 
                                            
                                             "<iframe width=\"800\" height=\"600\" src=\"http://10.64.255.76:6666/search_cal_errors?cal=" + params[:matched_value] + "&run=Search\">Your browser does not support iframes</iframe>"
                                           }
                      },
                      {:check_for_poodle_and_encoding => Proc.new {
                                    
                                           "<iframe width=\"800\" height=\"600\" src=\"http://cal.vip.paypal.com/cgi/idsearch_manager.py?id_type=corr_id&id_value=" + params[:matched_value] + "&fetchlog=1&submit=Search\">Your browser does not support iframes</iframe>"
                                          }

                      }, 
                      { 
                        :open_url_in_browser => Proc.new {
                             "<iframe width=\"800\" height=\"600\" src=\"http://10.64.255.76:6666/search_cal_errors?cal=" + params[:matched_value] + "&run=QuickSearch\">Your browser does not support iframes</iframe>"

                        }
 

                      },
                      { 
                        :open_url_in_browser => Proc.new {
                             "<iframe width=\"800\" height=\"600\" src=\"http://10.64.255.76:6666/search_cal_errors?cal=" + params[:matched_value] + "&run=QuickSearch\">Your browser does not support iframes</iframe>"

                        }
 

                      },
                      { 
                        :detect_shopping_cart_he_is_using => Proc.new {
                             "<iframe width=\"800\" height=\"600\" src=\"http://10.64.255.76:6666/search_cal_errors?cal=" + params[:matched_value] + "&run=QuickSearch\">Your browser does not support iframes</iframe>"

                        }
 

                      }
                                        
  ],
  :color => "#7209E3",
  :childs => [],
  :parent => ""
}