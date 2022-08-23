# cal addon
# finds errors in all pools and shows up summary

{
  :addon_name => "aaron_web",
  :description => "Detects withdrawals from account deutche bank...",
  :type => "WEB",
  #:matching_lambda => "((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",
  :matching_lambda => "\"[0-9]{5}\",\"[A-Z]{3}\",\"\w{6}-[0-9]{2}\",\"CP\",\"EUR\",\"[0-9]{1,},[0-9]{2}\",\"EUR\",\"[0-9]{1,},[0-9]{2}\",\"1\",\"[0-9]{8}\",\"[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{3}\",\"[0-9]{14}.PT\"",
  :menu_items => [{ :check_if_this_is_correct => Proc.new { 
                                            
                                             "This is validated"
                                           }
                      }
                                        
  ],
  :color => "#FFA200",
  :childs => [],
  :parent => ""
}