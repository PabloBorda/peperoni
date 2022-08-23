

{
  :addon_name => "account_number_web",
  :description => "Detects account numbers and show up menu with tools such us find account, view las flowlog activity, etc...",
  :type => "WEB",
  :matching_lambda => "[0-9]{19}",

  :menu_items => [{ :account_number => Proc.new { 
                                             require 'json'
                                             require 'mechanize'
                                             puts "ACCOUN ADDONS GET PARAMETERS" + params.to_json
                                             agent = Mechanize.new{|a|  a.ssl_version, a.verify_mode = 'SSLv3', OpenSSL::SSL::VERIFY_NONE, a.gzip_enabled = false}
                                             page = agent.get "https://admin.paypal.com/cgi-bin/admin"
                                             page.forms.first[:mac_admin_name] = "pborda"
                                             page.forms.first[:static_password_text] = "pan.hot.red-506"
                                             page_logged_in = agent.forms.first.submit


                                             page_account = agent.get "https://admin.paypal.com/cgi-bin/admin?node=loaduserpage_home&account_number=" + params[:matched_value].to_s + "&page_selector=ar_home"
                                             page_account.body

                                           }},
                                           { :browse_flowlogs => Proc.new { 
                                             
                                             "Browse flowlogs"

                                           } }
                                        
  ],
  :color => "#01447C",
  :childs => [],
  :parent => ""


}