require 'rubygems'
require 'nokogiri'



tree1_text = "<link href='/styles/menu.css?version=51' rel='stylesheet' type='text/css' />
<div class='cssmenu' contenteditable='false'>
<ul>
	<li class='has-sub'><span><a href='#'><span><label>3737373737373737377</label> </span> </a> </span>
	<ul>
		<li class='last'><span><a href='#'><span>account_number</span></a></span></li>
		<li class='last'><span><a href='#'><span>browse_flowlogs</span></a></span></li>
	</ul>
	<span> </span></li>
</ul>
</div>"


tree2_text = "<link href='/styles/menu.css?version=51' rel='stylesheet' type='text/css' />
<div class='cssmenu' contenteditable='false'>
<ul>
	<li class='has-sub'><span><a href='#'><span><label>3737373737373737377</label> </span> </a> </span>
	<ul>
		<li class='last'><span><a href='#'><span>account_number</span></a></span></li>
		<li class='last'><span><a href='#'><span>browse_flowlogs</span></a></span></li>
	</ul>
	<span> </span></li>
</ul>
</div>"

text_to_compare_from 



tree1_dom = Nokogiri::HTML(tree1_text)
tree2_dom = Nokogiri::HTML(tree2_text)

  
  
def search_string_in_dom_and_compare_paths_with_another_dom(my_initial_dom,string_to_find_in_the_middle_of_the_dom,my_path)
  if  my_initial_dom.childs.size==0
    if my_initial_dom.text?
      if my_initial_dom.content.include? string_to_find_in_the_middle_of_the_dom
        puts "I FOUND NODE: " + my_initial_dom.content
      end
    end
  else
    my_initial_dom.childs do |c|
      search_string_in_dom_and_compare_paths_with_another_dom(c,string_to_find_in_the_middle_of_the_dom,my_path.push(c.name + "|" + c))
    end
  end
  
  
end
  
tree1_dom.traverse do
     |t|
     if t.text?
       if t.content.include? "3737373737373737377"
         puts "Found node with content" + t.content
       end
     else
       puts "go to node: " + t.name
     end
end