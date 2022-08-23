require 'rubygems'
require 'tire'
require 'yajl/json_gem'
require 'json'


    s = Tire.search('tickets') { query { string 'ContactEmail:pborda*' } }
    s.filter :terms, :ContactEmail => 'pborda@paypal.com'
    p s.results


puts s.to_json
