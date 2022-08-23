#  This is a TICKETING addon, this addon is to obtain tickets from emails

require 'nylas'



{
  :type => "TICKETING",
  :addon_name => "email_threads",
  :login => Proc.new{ 
    CALLBACK_URL = 'http://localhost:4567/login_callback'
    APP_ID = '1dy7m2arc6usnz0p9985bdkfo'
    APP_SECRET ='1xton2axisfhyeemksuyzscve'

  
    message_thread_compatible = {}
    nylas = Nylas::API.new(APP_ID, APP_SECRET)
    nylas
  },
  :retriever => Proc.new { |nylas|
    messages = nylas.messages.where(:tag => 'unread').all
    puts "API FOR MESSAGES " + messages.to_json


    tr = nylas.threads.where(:tag => 'unread')

    # Get the first five threads in the namespace
    recent_threads = []
    tr.range(0,5).each do |thread|
      message_thread_compatible[:participants] = thread.participants
      message_thread_compatible[:subject] = thread.subject
      message_thread_compatible[:messages] = []
 
      thread.message_ids.each do |a| 
        message_thread_compatible[:messages].push({:id => a, :raw_content => nylas.messages.find(a).raw })

      end

      recent_threads.push(message_thread_compatible)
    end

    recent_threads
  }



}

