
 
# This is a very basic example of addons.. detects an account number, a string sequence with 19 numbers.
# In order to test and edit regular expressions use the following tool https://regex101.com
# The code you see is ruby code, the regular expression should work in JavaScript, they are quite similar in Ruby and Javascript, and in most cases they do
# not require any changes. 
# feedback: pborda@paypal.com



{


  :addon_name => "currency_web",
  :description => "Detects when somebody speaks about a currency, etc...",
  :type => "WEB",
  :matching_lambda => "(AUD|BRL|CAD|CZK|DKK|EUR|HKD|HUF|ILS|JPY|MYR|MXN|NOK|NZD|PHP|PLN|GBP|RUB|SGD|SEK|CHF|TWD|THB|TRY|USD)",

  :menu_items => [{ :show_currency_information => Proc.new { 
                                                  ""
                                           }},
                                           { :convert_to_usd => Proc.new { 
                                             
                                             "<form><label>Input amount: </label><input type=\"text\" name=\"amount\"/></form> "

                                           } }
                                        
  ],
  :color => "#345927",
  :childs => [],
  :parent => ""


}
