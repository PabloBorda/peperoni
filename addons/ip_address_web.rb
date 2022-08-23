# cal addon
# finds errors in all pools and shows up summary

{
  :addon_name => "ip_address_web",
  :description => "Detects IP addresses in a message and allows you to do different thing such as sending an IPN and see the response, or scanning ports, or ping...",
  :type => "WEB",
  #:matching_lambda => "((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",
  :matching_lambda => "^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
  :menu_items => [{ :send_test_ipn => Proc.new { 
                                            
                                             "<iframe width=\"800\" height=\"600\" src=\"http://10.64.255.76:6666/search_cal_errors?cal=" + params[:matched_value] + "&run=Search\">Your browser does not support iframes</iframe>"
                                           }
                      },
                      {:ping_ip => Proc.new {
                                    
                                           "<iframe width=\"800\" height=\"600\" src=\"http://cal.vip.paypal.com/cgi/idsearch_manager.py?id_type=corr_id&id_value=" + params[:matched_value] + "&fetchlog=1&submit=Search\">Your browser does not support iframes</iframe>"
                                          }

                      }, 
                      { 
                        :scan_ports => Proc.new {
                             "<iframe width=\"800\" height=\"600\" src=\"http://10.64.255.76:6666/search_cal_errors?cal=" + params[:matched_value] + "&run=QuickSearch\">Your browser does not support iframes</iframe>"

                        }
 

                      },
                      { 
                        :get_ip_geography => Proc.new {
                             "<iframe width=\"800\" height=\"600\" src=\"http://10.64.255.76:6666/search_cal_errors?cal=" + params[:matched_value] + "&run=QuickSearch\">Your browser does not support iframes</iframe>"

                        }
 

                      }
                                        
  ],
  :color => "#0781BA",
  :childs => [],
  :parent => ""
}