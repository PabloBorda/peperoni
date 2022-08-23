
 
# Detects HTML source code
# feedback: pborda@paypal.com



{


  :addon_name => "html_code_web",
  :description => "Detects html source code and renders it or sends it to jsfiddle, etc...",
  :type => "WEB",
  :matching_lambda => "(<(\"[^\"]*\"|\'[^\']*\'|.*|[^\'\">])*>)",

  :menu_items => [{ :render_this_html => Proc.new { 
                                                  "Render html"
                                           }},
                                           { :send_to_jsfiddle => Proc.new { 
                                             
                                             "JSFIDDLE"

                                           } }
                                        
  ],
  :color => "#3F4B4F",
  :childs => [],
  :parent => ""


}
