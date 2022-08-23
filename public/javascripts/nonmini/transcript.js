function getElementXPath(element)
{
    if (element && element.id)
        return '//*[@id="' + element.id + '"]';
    else
        return this.getElementTreeXPath(element);
};

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
};

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
















function textNodesUnder(node,matched_value){
  return $("p:contains(" + matched_value + ")");
  
}




var a = [{"at_xpath":"/html/body/div/ul/li/span[1]/span/a/span/label/text()","replace_node_by":"\u003c!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\" \"http://www.w3.org/TR/REC-html40/loose.dtd\"\u003e\n\u003chtml\u003e\u003cbody\u003e\n\u003cspan id=\"generated_11\"\u003e\u003clabel\u003e\u003c/label\u003e\u003clink rel=\"stylesheet\" type=\"text/css\" href=\"/styles/menu.css?version=51\"\u003e\n \u003cdiv class=\"cssmenu\" contenteditable=\"false\"\u003e\n \u003cul\u003e\n \u003cli class=\"has-sub\"\u003e\n \u003ca href=\"#\"\u003e\n \u003cspan\u003e\n \u003clabel\u003e4747474747474747477\u003c/label\u003e\n \u003c/span\u003e\n \u003c/a\u003e\n \u003cul\u003e\n\u003cli class=\"last\"\u003e\u003ca href=\"#\"\u003e\u003cspan\u003eaccount_number\u003c/span\u003e\u003c/a\u003e\u003c/li\u003e\n\u003cli class=\"last\"\u003e\u003ca href=\"#\"\u003e\u003cspan\u003ebrowse_flowlogs\u003c/span\u003e\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n \u003c/li\u003e\n\n \u003c/ul\u003e\n \u003c/div\u003e\u003c/span\u003e\u003clabel\u003e\u003c/label\u003e\n\u003c/body\u003e\u003c/html\u003e\n","matched":"4747474747474747477"},{"at_xpath":"/html/body/p[7]/text()","replace_node_by":"\u003c!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\" \"http://www.w3.org/TR/REC-html40/loose.dtd\"\u003e\n\u003chtml\u003e\u003cbody\u003e\n\u003cspan id=\"generated_30\"\u003e\u003clabel\u003ethe cal \u003c/label\u003e\u003clink rel=\"stylesheet\" type=\"text/css\" href=\"/styles/menu.css?version=51\"\u003e\n \u003cdiv class=\"cssmenu\" contenteditable=\"false\"\u003e\n \u003cul\u003e\n \u003cli class=\"has-sub\"\u003e\n \u003ca href=\"#\"\u003e\n \u003cspan\u003e\n \u003clabel\u003e3j3jd8d8f7g3\u003c/label\u003e\n \u003c/span\u003e\n \u003c/a\u003e\n \u003cul\u003e\n\u003cli class=\"last\"\u003e\u003ca href=\"#\"\u003e\u003cspan\u003efind_errors_on_cal\u003c/span\u003e\u003c/a\u003e\u003c/li\u003e\n\u003cli class=\"last\"\u003e\u003ca href=\"#\"\u003e\u003cspan\u003evisit_cal_site\u003c/span\u003e\u003c/a\u003e\u003c/li\u003e\n\u003cli class=\"last\"\u003e\u003ca href=\"#\"\u003e\u003cspan\u003efind_errors_on_cal_quick_search\u003c/span\u003e\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n \u003c/li\u003e\n\n \u003c/ul\u003e\n \u003c/div\u003e\u003c/span\u003e\u003clabel\u003e    brazil\u003c/label\u003e\n\u003c/body\u003e\u003c/html\u003e\n","matched":"3j3jd8d8f7g3"},{"at_xpath":"/html/body/p[7]/text()","replace_node_by":"\u003c!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\" \"http://www.w3.org/TR/REC-html40/loose.dtd\"\u003e\n\u003chtml\u003e\u003cbody\u003e\n\u003cspan id=\"generated_30\"\u003e\u003clabel\u003ethe c 3j3jd8d8f7g3   \u003c/label\u003e\u003clink rel=\"stylesheet\" type=\"text/css\" href=\"/styles/menu.css?version=51\"\u003e\n \u003cdiv class=\"cssmenu\" contenteditable=\"false\"\u003e\n \u003cul\u003e\n \u003cli class=\"has-sub\"\u003e\n \u003ca href=\"#\"\u003e\n \u003cspan\u003e\n \u003clabel\u003ebrazil\u003c/label\u003e\n \u003c/span\u003e\n \u003c/a\u003e\n \u003cul\u003e\u003cli class=\"last\"\u003e\u003ca href=\"#\"\u003e\u003cspan\u003echeck_everest_service_sheet\u003c/span\u003e\u003c/a\u003e\u003c/li\u003e\u003c/ul\u003e\n \u003c/li\u003e\n\n \u003c/ul\u003e\n \u003c/div\u003e\u003c/span\u003e\u003clabel\u003e \u003c/label\u003e\n\u003c/body\u003e\u003c/html\u003e\n","matched":"brazil"}];
console.log(a);


 for (var i=0;i<a.length;i++){
   console.log(JSON.stringify(a[i].matched));
   
   var node_to_replace_xpath = a[i].at_xpath.replace("/html/body","//*/div[@id='autocomplete0']");
	 var element = new CKEDITOR.dom.element(getElementByXpath(node_to_replace_xpath));
   
   
   var element_new = new CKEDITOR.dom.element.createFromHtml("<span>" + a[i].replace_node_by + "</span>");
   

   if (element.$==undefined){
    
     var elements = textNodesUnder(document.body,a[i].matched);
     element = new CKEDITOR.dom.element(getElementByXpath(getElementXPath(elements[0])));
     console.log("This is my element" + JSON.stringify(elements));
     
   }
   
   element_new.replace(element);

   
   console.log(JSON.stringify(elements));
   
   
 }





   var my_elements = textNodesUnder(document.body,"brazil");
   
   console.log(JSON.stringify(my_elements));


