$(document).ready(function(){
	
  $("#addon_list_results").show();
  $("#toolbar").hide();
  $("#editor").hide();

  



});



function open_new_addon_editor(){
  $("#addon_list_results").hide();
  $("#toolbar").show();
  $("#editor").show();
   window["addon_editor"] = ace.edit("editor");
   window["addon_editor"].setTheme("ace/theme/monokai");
   window["addon_editor"].getSession().setMode("ace/mode/javascript");


}

function search(){
  $("#addon_list_results").show();
  $("#toolbar").hide();
  $("#editor").hide();

}



function save_addon(){
  var editor = window["addon_editor"];
  console.log("IM POSTING: " + editor.getSession().getValue());
  $.post("/save_addon",{addon_source_code: editor.getSession().getValue()}).done(function(data){ alert("Automation is end of suffering, lets upload our consciousness posthumans! thank you !");});


}
