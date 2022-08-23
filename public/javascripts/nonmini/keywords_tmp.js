
function extract_keywords_from(text){


 
  var keyword_extractor = require("keyword-extractor");
 

  var sentence = text;
 

  var extraction_result = keyword_extractor.extract(sentence,{
                                                                language:"english",
                                                                remove_digits: true,
                                                                return_changed_case:true,
                                                                remove_duplicates: false
 
                                                           });
  return extraction_result;



}

