module.exports = { "extract_keywords_from": function (text){


 
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
};
//console.log("This is the result: " + JSON.stringify(extract_keywords_from("Five monkeys are jumping the rope and playing with each other. They are the bonobos. ")));