
 
# This is a very basic example of addons.. detects an account number, a string sequence with 19 numbers.
# In order to test and edit regular expressions use the following tool https://regex101.com
# The code you see is ruby code, the regular expression should work in JavaScript, they are quite similar in Ruby and Javascript, and in most cases they do
# not require any changes. 
# feedback: pborda@paypal.com



{


  :addon_name => "ipn_web",
  :description => "Detects when somebody speaks about an IPN, etc...",
  :type => "WEB",
  :matching_lambda => "ipn",

  :menu_items => [{ :check_ipns => Proc.new { 
                                    "CHECKING IPNS!"
                             

                                           }},
                                           { :resend_ipn => Proc.new { 
                                             
                                             "IPN WAS RESENT!"

                                           } }
                                        
  ],
  :color => "#1F84A6",
  :childs => [],
  :parent => ""


}
