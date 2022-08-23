 

$(".cke_wysiwyg_div").ready(function(){


    var my_editor = CKEDITOR.instances[$$("editor")._3rd_editor.name];

    var search_string = "#cke_" + $$("editor")._3rd_editor.name;
    
    var search_string_no_hash = $$("editor")._3rd_editor.name;



    var $ac =  $(search_string).autocomplete({
            isMultiline: true,
            delay: 300,
            minLength: 4,
            source: function(request, response) {
              alert("IM RUNNING ");
              require(["./keyword-extractor"]);
              var last_paragraph  = $(CKEDITOR.instances[search_string].getData()).contents().filter(function() {   return (this.nodeType == 3) && (this.textContent.length>2); }).last().text();

                                        
              $(search_string).data("last_paragraph",strip(last_paragraph));
              console.log ("Last last_paragraph: " + strip(last_paragraph));



              var get_relevant_information = function(text){
                var information = extract_keywords_from(last_paragraph.replace(":","").replace(",","").replace(";","").replace(".",""))


              }
              
              $(search_string).data("last_words_searched",_.reduce(extract_keywords_from(last_paragraph.replace(":","").replace(",","").replace(";","").replace(".","")),
                              function(memo,word){ return (memo + word + " "); },
                              ""));



              var key = $(search_string).data("last_words_searched").replace(/\s/g, '');
             
              if (key in $(search_string).data("request_cache")){                        
                 response($(search_string).data("request_cache")[key]);
                 return;
              } 


              $.getJSON("/suggest_me_feed", {                  
                   q: _.reduce(extract_keywords_from(last_paragraph.replace(":","").replace(",","").replace(";","").replace(".","")),
                               function(memo,word){ return (memo + word + " "); },
                               "")

                 }, function(data) {
                // data is an array of objects and must be transformed for autocomplete to use
                  
                  var array = data.error ? [] : $.map(data.suggestions, function(m) {
                    $(search_string).data("last_words_searched",m.q);
                    return {
                      q: m.q,
                      mr: m.mr,
                      knows: m.knows,
                      for_: m.for,
                      ticket_number: m.ticket_number,               
                      note_number: m.note_number,
                      selection_counter: m.selection_counter

                    };
                  });
                  $(search_string).data("request_cache")[key] = array;
                  response(array);
                });
            },
            focus: function(event, ui) {
              // prevent autocomplete from updating the textbox
              event.preventDefault();
            },
            error: function(event, ui){
              console.log("There is an error , dont care");
            },
            search: function(event,ui){
              //parsecall();

            },
            select: function(event, ui) { 

                  var originalEvent = event;
                  while (originalEvent) {
                      if (originalEvent.keyCode == 13)
                          originalEvent.stopPropagation();

                      if (originalEvent == event.originalEvent)
                          break;

                      originalEvent = event.originalEvent;
                  }
                  var updated_text_content = CKEDITOR.instances[search_string_no_hash].getData().substring(0,CKEDITOR.instances[search_string_no_hash].getData().lastIndexOf(ui.item.q));// + "<br>";
                  var ticket_text = updated_text_content + ui.item.knows;
                  ticket = ticket_text;
                  var note_number = ui.item.note_number;
                  var ticket_number = ui.item.ticket_number;
                  if (ui.item.mr != "JIRA"){
                    //$.post('/record_selection',{"ticket_number": ticket_number, "note_number" : note_number,"findstr" : ui.item.q  });
                  }


                  //var tmp = CKEDITOR.instances[search_string_no_hash].setData(CKEDITOR.instances[search_string_no_hash].getData().replace($(search_string).data("last_paragraph"),""));
                  //$(search_string).empty();
                  //$(search_string).val($.parseHTML(tmp));
                  CKEDITOR.instances[search_string_no_hash].insertElement(CKEDITOR.dom.element.createFromHtml("<p>" + ui.item.knows.toString() + "</p>"));
                  //CKEDITOR.instances[search_string_no_hash].setData(CKEDITOR.instances[search_string_no_hash].getData() + "<p>" + ui.item.knows.toString() + "</p>");
                  //CKEDITOR.instances[search_string_no_hash].insertText(CKEDITOR.instances[search_string_no_hash].getData() + "<p>" + ui.item.knows.toString() + "</p>");
                  $(search_string).data("last_selected_paragraph",("<p>" + ui.item.knows.toString() + "</p>"));

                  $(search_string).focusEnd();
            }
     

    });

    $ac.autocomplete("instance")._renderItem = function(ul, item) {
      var $a = $("<a></a>");
      var last_paragraph  = $(CKEDITOR.instances[search_string_no_hash].getData()).contents().filter(function() {   return (this.nodeType == 3) && (this.textContent.length>2); }).last().text();

      var segmented_query = last_paragraph.split(" ").map(function(spaced_word){ return spaced_word.replace(/\s/g, ''); });
      var text_to_highlight = item.knows;
      var text_highlighted = "";

      if ((text_to_highlight.indexOf("<\/label>")==-1) && ( $(search_string).data("last_selected_paragraph")!=("<br>" + last_paragraph + "<br>"))){
        for (var i in segmented_query){
          text_to_highlight = text_to_highlight.replace(segmented_query[i],"<label style=\"font-weight: bold;font-size: 16px;\">" + segmented_query[i] + "</label>");
        }
      }
      text_highlighted = ("<br>" + text_to_highlight + "<br>");
      console.log("text_highlighted: " + text_highlighted);
      var ticket_number = item.ticket_number;
      var note_number = item.note_number;
      var mr = item.mr.toString();
      var markup = new EJS({url: '/suggestion_item.ejs'}).render({data: [note_number,ticket_number,text_highlighted,mr]});
      $a.html(markup);
      return $("<li></li>").append($a).appendTo(ul);
    };   


    $(search_string).keydown(function(){
                  var updated_text_content = CKEDITOR.instances[search_string_no_hash].getData().substring(0,CKEDITOR.instances[search_string_no_hash].getData().lastIndexOf(ui.item.q));// + "<br>";
                  var ticket_text = updated_text_content + ui.item.knows;
                  ticket = ticket_text;
                  var note_number = ui.item.note_number;
                  var ticket_number = ui.item.ticket_number;
                  if (ui.item.mr != "JIRA"){
                    //$.post('/record_selection',{"ticket_number": ticket_number, "note_number" : note_number,"findstr" : ui.item.q  });
                  }


                  //var tmp = CKEDITOR.instances[search_string_no_hash].setData(CKEDITOR.instances[search_string_no_hash].getData().replace($(search_string).data("last_paragraph"),""));
                  //$(search_string).empty();
                  //$(search_string).val($.parseHTML(tmp));
                  CKEDITOR.instances[search_string_no_hash].insertElement(CKEDITOR.dom.element.createFromHtml("<p>" + ui.item.knows.toString() + "</p>"));
                  //CKEDITOR.instances[search_string_no_hash].setData(CKEDITOR.instances[search_string_no_hash].getData() + "<p>" + ui.item.knows.toString() + "</p>");
                  //CKEDITOR.instances[search_string_no_hash].insertText(CKEDITOR.instances[search_string_no_hash].getData() + "<p>" + ui.item.knows.toString() + "</p>");
                  $(search_string).data("last_selected_paragraph",("<p>" + ui.item.knows.toString() + "</p>"));

                  $(search_string).focusEnd();

      
    });



});         
