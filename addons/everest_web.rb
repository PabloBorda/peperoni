
{
  :addon_name => "everest_web",
  :type => "WEB",
  :description => "Detects when you speak about product availability in certain countries, when click on a country shows up a popup with the country information...",
  :matching_lambda => "((is not available|is available|is available?)|australia|belgium|brazil|china|france|germany|hong kong|ireland|italy|luxemburgo|mexico|netherlands|norway|poland|russia|singapore|spain|sweden|turkey|united kingdom|united states)",

  :menu_items => [{ :check_everest_service_sheet => Proc.new { 
                                             require 'mechanize'

                                             country_codes = { "australia" => "AU",
                                                               "belgium"=> "BE",
                                                               "brazil"=>"BR",
                                                               "china"=>"CN",
                                                               "france"=>"FR",
                                                               "germany"=>"DE",
                                                               "hong kong"=>"HK",
                                                               "ireland"=>"IE",
                                                               "italy"=>"IT",
                                                               "luxemburgo"=>"LU",
                                                               "mexico"=>"MX",
                                                               "netherlands"=>"NL",
                                                               "norway"=>"NO",
                                                               "poland"=>"PL",
                                                               "russia"=>"RU",
                                                               "singapore"=>"SG",
                                                               "spain"=>"ES",
                                                               "sweden"=>"SE",
                                                               "turkey"=>"TR",
                                                               "united kingdom"=>"GB",
                                                               "united states"=> "US"  }

                                             if (!params[:matched_value].include? "available")

  	                                           "<iframe width=\"800\" height=\"600\" src=\"http://apslb.paypalcorp.com/everest/factsheet-countries.php?country=" + country_codes[params[:matched_value]].to_s + "\">Browser does not support iframe</iframe>"

                                             else
                                               "<p>Type a country in the message</p>"
                                             end

                                           }}
                                        
  ],
  :color => "#3A8437",
  :childs => [],
  :parent => ""


}