{
  :addon_name => "ticket_number_web",
  :type => "WEB",
  :description => "Highlights ticket numbers, etc...",
  :matching_lambda => "([0-9]{6})-([0-9]{6})",


  :menu_items => [{ :ticket_number => Proc.new {
 
    redirect "https://mts/wnvp/?method=GetRightNowTicketDetails&Custom=" + params[:matched_value].to_s + "&ref_num=" + params[:matched_value].to_s + "&dojo.preventCache=1420544362909"

  }},
  { :mark_as_using_the_tool => Proc.new {
 
    redirect "https://mts/wnvp/?method=GetRightNowTicketDetails&Custom=" + params[:matched_value].to_s + "&ref_num=" + params[:matched_value].to_s + "&dojo.preventCache=1420544362909"

  }}

  ],
  :color => "#BB3520",
  :childs => [],
  :parent => ""







}