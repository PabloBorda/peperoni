//  Use https://github.com/michaeldelorenzo/keyword-extractor



/*

var conf = require.config({
    paths:{
        jquery:'/javascripts/nonmini/jquery',
        underscore:'/javascripts/underscore-min'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        waitSeconds: 15
    }
   });


require([
    'jquery',
    'underscore',
]);



*/




function modalopen(methodtocall,parameter){

$.get(("/" + methodtocall + "?matched_value=" + parameter),function(data){
  $("#dialog").html(data);
  $("#dialog").dialog({width: 800,
                       height: 600,
                       position: { my: "center", at: "center", of: window }

                     }).ready(function(){

                        $("div[role='dialog']").css("z-index","10000");

                     });
  
});





}




   function check(){
        var t = $("#correct").val().toString();
        var u = $("#verify").val().toString();
        $.get( "/validate_request", JSON.stringify({ "original_request": t, "compare_to": u })).done(function( data ) { 
            $("#result").html(data);  
          });
   }


function strip(html)
{
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}








function getElementXPath(element)
{
    if (element && element.id)
        return '//*[@id="' + element.id + '"]';
    else
        return this.getElementTreeXPath(element);
}

function getElementTreeXPath(element)
{
    var paths = [];

    // Use nodeName (instead of localName) so namespace prefix is included (if any).
    for (; element && element.nodeType == 1; element = element.parentNode)
    {
        var index = 0;
        for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling)
        {
            // Ignore document type declaration.
            if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE)
                continue;

            if (sibling.nodeName == element.nodeName)
                ++index;
        }

        var tagName = element.nodeName.toLowerCase();
        var pathIndex = (index ? "[" + (index+1) + "]" : "");
        paths.splice(0, 0, tagName + pathIndex);
    }

    return paths.length ? "/" + paths.join("/") : null;
}

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}






$.fn.focusEnd = function() {
    $(this).focus();
    var tmp = $('<span />').appendTo($(this)),
        node = tmp.get(0),
        range = null,
        sel = null;

    if (document.selection) {
        range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        range = document.createRange();
        range.selectNode(node);
        sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
    tmp.remove();
    return this;
}





function white_editor(){
$.get("/find_ticket_feed",{"ticket_number" : "141117-000002".toString()}).done(function(data){

    console.log(JSON.stringify(data));
   // remove_garbage = data.substring(0,52);
    //make_valid_json = "{" + remove_garbage
    my_note = JSON.parse(data);



    my_note.RightNowTicket[0].RefNum="666666-666666";
    my_note.RightNowTicket[0].DateEntered="";
    my_note.RightNowTicket[0].AccountID="";
    my_note.RightNowTicket[0].ContactEmail="";
    my_note.RightNowTicket[0].Priority="";
    my_note.RightNowTicket[0].Note=[{"paragraph":""}];
    my_note.RightNowTicket[0].Subject="";
    my_note.RightNowTicket[0].Assigned="";
    my_note.RightNowTicket[0].BugID="";
    my_note.RightNowTicket[0].EntryType="";
    my_note.RightNowTicket[0].Severity="";
    my_note.RightNowTicket[0].SupportLevel="";
    my_note.RightNowTicket[0].TargetDate="";
    my_note.RightNowTicket[0].Status="Unresolved";
    my_note.RightNowTicket[0].TargetVersion="";





   if (my_note!=null){
   // build_editor("",my_note.RightNowTicket.length);
    for (var i in my_note.RightNowTicket){
      console.log("LOADING NOTE " + JSON.stringify(my_note.RightNowTicket[i]));
      build_editor(my_note.RightNowTicket[i],i);
      parser_updater(i);
      $("#autocomplete" + i.toString()).accordion({active: true});
    }
   } else {
    alert("Input ticket number");
   }

  });


}



function get_keywords(text){

  var keyword_extractor = require(["/javascripts/underscode.js","/javascripts/keywords/index.js"]);



}




function load_ticket_by_number(){
  var ticket_number = $("#find_by_ticket_number_field").val();
  $.get("/find_ticket_feed",{"ticket_number" : ticket_number.toString()}).done(function(data){

    console.log(JSON.stringify(data));
   // remove_garbage = data.substring(0,52);
    //make_valid_json = "{" + remove_garbage
    my_note = JSON.parse(data);
   if (my_note!=null){
   // build_editor("",my_note.RightNowTicket.length);
    for (var i in my_note.RightNowTicket){
      console.log("LOADING NOTE " + JSON.stringify(my_note.RightNowTicket[i]));
      build_editor(my_note.RightNowTicket[i],i);
      parser_updater(i);
    }
   } else {
    alert("Input ticket number");
   }

  });


}





function fork_note(ticket,note_number) {

   alert(ticket + " " + note_number);

}


function view_ticket(note_number,ticket){

  //alert(ticket + " " + note_number);
    $.get("/find_ticket_feed",{"ticket_number" : ticket.toString()}).done(function(data){
        $("#view_ticket").attr("title","Ticket " + ticket.toString());
        $('#json-renderer').jsonViewer(eval("(" + data.toString() + ")"));
        $("#view_ticket").dialog({width: 800,
            height: 600,
            position: { my: "center", at: "center", of: window }

        });

    });


}




function imgError(image) {
    image.onerror = "";
    image.src = "/images/nopic.png";
    return true;
}


function freshStyle(stylesheet){
   $('.questions').attr('href',stylesheet);
}



function getCaretPosition(editableDiv) {
  var caretPos = 0,
    sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode == editableDiv) {
        caretPos = range.endOffset;
      }
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    if (range.parentElement() == editableDiv) {
      var tempEl = document.createElement("span");
      editableDiv.insertBefore(tempEl, editableDiv.firstChild);
      var tempRange = range.duplicate();
      tempRange.moveToElementText(tempEl);
      tempRange.setEndPoint("EndToEnd", range);
      caretPos = tempRange.text.length;
    }
  }
  return caretPos;
}





/*

Sample JSON format for DOM modifications

var a = [{"at_xpath":"/html/body/p/text()","replace_node_by":"\u003clink rel='stylesheet' type='text/css' href='/styles/menu.css?version=51'\u003e\n \u003cdiv class='cssmenu' contenteditable='false'\u003e\n \u003cul\u003e\n \u003cli class='has-sub'\u003e\n \u003ca href='#'\u003e\n \u003cspan\u003e\n \u003clabel\u003eHello the account 3838383838384747589\u003c/label\u003e\n \u003c/span\u003e\n \u003c/a\u003e\n \u003cul\u003e\u003cli class=\"last\"\u003e\u003ca href='#'\u003e\u003cspan\u003eaccount_number\u003c/span\u003e\u003c/a\u003e\u003c/li\u003e\u003cli class=\"last\"\u003e\u003ca href='#'\u003e\u003cspan\u003ebrowse_flowlogs\u003c/span\u003e\u003c/a\u003e\u003c/li\u003e\u003c/ul\u003e\n \u003c/li\u003e\n\n \u003c/ul\u003e\n \u003c/div\u003e"}];
var b = eval(a);
console.log("The length is: " + b.length.toString());

console.log("/" + b[0].at_xpath.replace(/([^\/])\/([^\/])/g,"$1//$2"));

getElementByXpath("/" + b[0].at_xpath.replace(/([^\/])\/([^\/])/g,"$1//$2")).innerHTML = b[0].replace_node_by;

 */
// $x("//*/div[@id='autocomplete0']/p/text()")

/*
*/





function textNodesUnder(node,matched_value){
  return $(":contains(" + matched_value + ")").contents().filter(function() {

                                                                   return ((this.nodeType == 3)&&(this.textContent.indexOf(matched_value)>-1));
                                                                 });

}


function text_nodes_under_node(node){
  var all = [];
  for (node=node.firstChild;node;node=node.nextSibling){
    if (node.nodeType==3) all.push(node);
    else all = all.concat(text_nodes_under_node(node));
  }
  return all;
}

String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length == 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};





function is_match_already_rendered(editor_name,match){
  return _.find(window[editor_name]["processed_nodes"],function(a){return (JSON.stringify(a)==JSON.stringify(match))});


}



function filter_out_parsed_nodes(search_string_no_hash,text_nodes_list){

function parentNodes(node){

  var els = [];
  while (node) {
    els.unshift(node);
    node = node.parentNode;
  }

  return els;


}

var avoid_parsing = _.filter(text_nodes_under_node(document.getElementById(search_string_no_hash)),function(a){
  //alert(a.textContent);

  return (_.filter(parentNodes(a),function(parent_node){ 
    //alert(parent_node.innerHtml);
    if (parent_node.id!=undefined){
      return parent_node.id.indexOf("generated_")>-1;         
    } else {
      return false;  
    }
  }).length==0);

});

return avoid_parsing;


}



function parser_updater(note_number){




  var search_string = "#autocomplete" + note_number.toString(); 
  var search_string_no_hash = "autocomplete" + note_number.toString();

  if (window[search_string_no_hash]==undefined){
    window[search_string_no_hash] = {};
  }

  if (window[search_string_no_hash]["processed_nodes"] == undefined){
    window[search_string_no_hash]["processed_nodes"] = [];
  }

  var parsecall = function (){

    var currentText = CKEDITOR.instances[search_string_no_hash].getData();

    console.log("TEXT BEFORE PARSING: " + currentText);

    var text_nodes_list = filter_out_parsed_nodes(search_string_no_hash,text_nodes_under_node(document.getElementById(search_string_no_hash)));

    for (var j=0;j<text_nodes_list.length;j++){

      var text_node_content = text_nodes_list[j].textContent;


      for (var i=0;i<window.web_addons.length;i++){

        var json_parsed_addon = JSON.parse(window.web_addons[i]);
        //console.log("MATCHING LAMBDA: " + json_parsed_addon.matching_lambda);
        var my_regex = new RegExp(json_parsed_addon.matching_lambda,"g");
        var my_regex_matches = _.filter(_.uniq(text_node_content.match(my_regex)),function(a){ return (a!=undefined) });

        if (my_regex_matches!=null){

          for (var my_regex_matches_index=0;my_regex_matches_index<my_regex_matches.length;my_regex_matches_index++){
            console.log("I found the value " + my_regex_matches[my_regex_matches_index].toString() + " that matched with regex " + json_parsed_addon.addon_name.toString() + " represented by this expression " + json_parsed_addon.matching_lambda.toString());
            var current_text_node_from_dom = text_nodes_list[j];



            var render_annotation = {"matched_value": my_regex_matches[my_regex_matches_index],"hash":my_regex_matches[my_regex_matches_index].hashCode()};
            if (is_match_already_rendered(search_string_no_hash,render_annotation)==undefined){


              if (json_parsed_addon.render_lambda==undefined){

                json_parsed_addon["render_lambda"] = function(addon,matched){
                      var menu_options = "";

                      _.each(addon.menu_items,function(e){
                        var keys = [];
                        for(var k in e) keys.push(k);
                        menu_options = menu_options + "<li class=\"last\">\
                                                         <a href=\"#\" onclick=\"modalopen(\'" + keys[0].toString() + "\',\'" + matched.toString() + "\');\">\
                                                           <span>" + keys[0].toString() + "</span>\
                                                         </a>\
                                                       </li>";

                      });





                      var building_menu = "<div class=\"cssmenu\" contenteditable=\"false\">" +   
                                          "<link rel=\"stylesheet\" type=\"text/css\" href=\"/styles/menu.css?version=51\">" + 
                                            "<ul style=\"background:" + addon.color + "!important;width: "  + (matched.toString().length*10+5).toString() +  "px;\">\
                                               <li class=\"has-sub\">\
                                                 <a href=\"#\">\
                                                   <span>\
                                                     <label style=\"color:white!important;\">" + matched.toString() + "</label>\
                                                   </span>\
                                                 </a><ul>" + menu_options.toString() + "</ul>\
                                               </li>\
                                             </ul>\
                                           </div>";

                      return building_menu.toString();





                };

              }
              if (json_parsed_addon.on_mouse_over_lambda==undefined){




                   json_parsed_addon["on_mouse_over_lambda"] = function(addon) { 
                      return "";
                    }


              }

              var render_to_browser = "<span id=\"generated_" + render_annotation.hash + "\">" + (json_parsed_addon.render_lambda(json_parsed_addon,render_annotation.matched_value.toString()).toString() + json_parsed_addon.on_mouse_over_lambda(json_parsed_addon).toString())  + "</span>&nbsp;";




             // var render_to_browser_including_other_texts = current_text_node_from_dom.data.replace(render_annotation.matched_value,render_to_browser);

              if (current_text_node_from_dom.parentNode!=null){
                current_text_node_from_dom.parentNode.innerHTML = current_text_node_from_dom.parentNode.innerHTML.replace(render_annotation.matched_value,render_to_browser).replace("<br>","");
              } else {
                current_text_node_from_dom.innerHTML = current_text_node_from_dom.innerHTML.replace(render_annotation.matched_value,render_to_browser).replace("<br>","");                
              }
            

              $(search_string).focusEnd();


              window[search_string_no_hash]["processed_nodes"].push(render_annotation);

            }
          }

        }




      }


    }



  }


  $(search_string).trigger("input");
  var delayed;
  $(search_string).on('input', function() { times_parse=0;clearTimeout(delayed); delayed = setTimeout(function() {     
    parsecall();
  }, 500); });




}


    function build_editor(note,note_number){ 

         var search_string = "#autocomplete" + note_number.toString();
        var search_string_no_hash = "autocomplete" + note_number.toString();
        var search_string_node_javascript_version = "autocomplete" + note_number.toString();
        // var currentText = CKEDITOR.instances[search_string_no_hash].getData();





         var date = note.DateEntered;
         var contact_email = note.ContactEmail;
         var severity = note.Severity;
         var who_writes = note.AccountID;
         var status = note.Status;
         if ((who_writes!=undefined)&&(who_writes!="")){
           var who_writes_name_and_lastname_separated = who_writes.split(" ");
           var who_writes_possible_user_name = who_writes_name_and_lastname_separated[0].charAt(0).toLowerCase() + who_writes_name_and_lastname_separated[1].toLowerCase();

         } else {
          if (note_number==0){
            who_writes = "Agent Typing";

          } else {
          who_writes = "Unknown Person";
          }
         }



         var pic_url = "http://myhub.corp.ebay.com/User%20Photos/Profile%20Pictures/_w/corp_" + who_writes_possible_user_name + "_MThumb_jpg.jpg"


         var build_editor_html = new EJS({url: '/new_editor.ejs'}).render({data: [pic_url,who_writes,note_number,date,status]});



         build_editor_html = $($.parseHTML(build_editor_html));

         $(".questions").append(build_editor_html);

         var current_note_from_paragraphs = "";
         for(var i in note.Note){
           current_note_from_paragraphs = current_note_from_paragraphs + note.Note[i].paragraph;


         }

/*
  $(search_string).keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the enter key code
    {         

      var separate_current_paragraphs = $(search_string).val().toString().split("<br>").filter(function(n){ return n != "" });
      console.log ("Separate current paragraphs" + JSON.stringify(separate_current_paragraphs));
      var last_paragraph = separate_current_paragraphs[separate_current_paragraphs.length - 1];

      $.post("/static_feeds",{query: last_paragraph}).done(function( data ) {
        if (data.length>0){
          $("#static_feeds").empty();                      
          $("#static_feeds").html( data );          
        }
    });

   // $(search_string).append("<br>");

    } else {
      if (key == 32) { // space key is pressed
       // tmp = $(search_string).val().toString();
       // if ((tmp.slice(-1)!=" ")){
         $(search_string).append(" ");          
       // } else {
       //  $(search_string).focusEnd(); 
       // }


      } else {

      }
    }

  });   

*/






         $(".questions").accordion("refresh");



        $(search_string).ckeditor();


        //$(search_string).val($.parseHTML(current_note_from_paragraphs));
        CKEDITOR.instances[search_string_no_hash].setData(current_note_from_paragraphs);



         var $ac =  $(search_string).autocomplete({
            isMultiline: true,
            delay: 300,
            minLength: 4,
            source: function(request, response) {
                // $(CKEDITOR.instances["autocomplete0"].getData()).contents().filter(function() {   return (this.nodeType == 3) && (this.textContent.length>2); }).last().text();
              var last_paragraph  = $(CKEDITOR.instances["autocomplete0"].getData()).contents().filter(function() {   return (this.nodeType == 3) && (this.textContent.length>2); }).last().text();



              $(search_string).data("last_paragraph",strip(last_paragraph));
              console.log ("Last last_paragraph: " + strip(last_paragraph));




              var extract_keywords_from = module.exports.extract_keywords_from;


              $.getJSON("/suggest_me", {                  
                q: extract_keywords_from(last_paragraph.replace(":","").replace(",","").replace(";","").replace(".",""))
              }, function(data) {
                // data is an array of objects and must be transformed for autocomplete to use
                var array = data.error ? [] : $.map(data.suggestions, function(m) {
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




           var last_paragraph  = $(CKEDITOR.instances["autocomplete0"].getData()).contents().filter(function() {   return (this.nodeType == 3) && (this.textContent.length>2); }).last().text();

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

         $ac.autocomplete({ disabled: true });




     }






   $(document).ready(function(){


     $.get("/load_web_addons_as_json").done(function(data){
       window["web_addons"] = eval(data);

     });






    white_editor();

    // $("div[id^='autocomplete'").autocomplete("disable");

  /*  $.post("/static_feeds",{query: ""}).done(function( data ) {
      $("#static_feeds").empty();
      $("#static_feeds").html( data );
    });*/


     var latest_q = "";

     $('#ppbutton').scroll(function() { 
        $('.followscroll').css('top', $(this).scrollTop()); 
     });

/*
     $('[data-slidepanel]').slidepanel({
        orientation: 'left',
        mode: 'overlay',
        static: false
     });
*/
//   ------------------------------------ACCORDION STUFF--------------------------------------
     $( "> div", "#questionsDispos" ).draggable({
        helper: "clone",
        revert: "invalid",
        cursor: "move",
        handle: "h3",
        connectToSortable: ".questions"
    });

    $( ".questions" ).accordion({
        header: "> div > h3",
        collapsible: true,
        animate: false,
        active: false,
        autoHeight: false,
        autoActivate: true,
        activate: function (event, ui) {

                $("div[id^='autocomplete']").autocomplete({ disabled: true });

                var activeIndex = $('.questions').accordion('option', 'active');

                $("#autocomplete"+activeIndex).autocomplete({ disabled: false });
                //$(".ui-menu-item").get(activeIndex).autocomplete("enable"):
                //$("#activate" + activeIndex).trigger("change");
               // alert(activeIndex);
            }
    });

    $( ".questions" ).sortable({
        axis: "y",
        handle: "h3",
        items: "div",
        receive: function(event, ui) {
            $(ui.item).removeClass();
            $(ui.item).removeAttr("style");
            $( ".questions" ).accordion("add", "<div>" + ui.item.hmtl() + "</div>");
        }
    });



// ----------------------------------------------------------------------------------------
/*$(".questions").accordion("refresh");

   build_editor({"RefNum":"000000-000000","DateEntered":"06/06/2006 06:06 PM","AccountID":"Pablo Borda"
 ,"CID":"Pablo Borda","Subject":"New ticket","Note":[{"paragraph":""}],"Assigned":"Pablo Borda"
,"Status":"Open","ContactEmail":"pborda@paypal.com"},30);
    $(".questions").accordion("refresh");
    parser_updater(30);*/
   });  
 //http://www.marcofolio.net/webdesign/a_fancy_apple.com-style_search_suggestion.html
