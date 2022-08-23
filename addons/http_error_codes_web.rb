
{
  :addon_name => "http_error_codes_web",
  :description => "Detects http error code text patterns in a message, so it shows the error reference...",
  :type => "WEB",
  :matching_lambda => "(100|101|200|201|202|203|204|205|206|300|301|302|303|304|305|400|401|402|403|404|405|406|407|408|409|410|411|412|413|414|415|500|501|502|503|504|505)",
  :menu_items => [{ :show_http_error_definition => Proc.new { 
                                            
                                             "<iframe width=\"800\" height=\"600\" src=\"http://10.64.255.76:6666/search_cal_errors?cal=" + params[:matched_value] + "&run=Search\">Your browser does not support iframes</iframe>"
                                           }
                      },
                      {:copy_http_error_definition_to_clipboard => Proc.new {
                                    
                                           "<iframe width=\"800\" height=\"600\" src=\"http://cal.vip.paypal.com/cgi/idsearch_manager.py?id_type=corr_id&id_value=" + params[:matched_value] + "&fetchlog=1&submit=Search\">Your browser does not support iframes</iframe>"
                                          }

                      }
                                        
  ],
  :color => "#FF0000",
  :childs => [],
  :parent => ""
}

