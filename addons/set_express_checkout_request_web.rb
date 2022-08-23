

{
  :addon_name => "set_express_checkout_request_web",
  :description => "Detects possible set express checkout requests within the current message...",
  :type => "WEB",
  :matching_lambda => ["user","pwd","signature","version","method","returnurl","cancelurl","amt","paymentaction"],

  :menu_items => [{ :execute_set_ec_request => Proc.new { 
                                            "TOKEN=EC-70011467VV745564K
                                             TIMESTAMP=2015-10-08T14:51:05Z
                                             CORRELATIONID=a15dcbbfaad54
                                             ACK=Success
                                             VERSION=109.0
                                             BUILD=18308778 "
                                            }
                                          }
                                        
  ],
  :color => "#6D9126"


}