



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


function show_tickets(){















    
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



function load_threads(){


  $.get("/my_inbox",{}).done(function(data){

    console.log(JSON.stringify(data));
   // remove_garbage = data.substring(0,52);
    //make_valid_json = "{" + remove_garbage
   var my_tickets = JSON.parse(data);
   if (my_tickets!=null){
   // build_editor("",my_note.RightNowTicket.length);
    for (var i in my_tickets){
      console.log("LOADING TICKET " + JSON.stringify(my_tickets[i]));
      build_editor(my_tickets[i],i);
      parser_updater(i);
    }
   } else {
    alert("Error loading your inbox");
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




  











   $(document).ready(function(){


     $.get("/load_web_addons_as_json").done(function(data){
       window["web_addons"] = eval(data);

     });





    load_threads();
    //white_editor();

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

},{"keyword-extractor":1}]},{},[14]);
