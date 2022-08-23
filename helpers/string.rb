#string tools definitions

class String

  def count_similar_words(p2)
    p1_words = self.split(" ").map{|i| i.downcase}.uniq.select{|w| (w.size >= 4)}
    p2_words = p2.split(" ").map{|i| i.downcase}.uniq.select{|w| (w.size >= 4)}
    count = 0

    if (p1_words.size <= p2_words.size)
      p1_words.each do |w|
        if p2_words.include? w.downcase
          count = count + 1
        end
      end
    else
      p2_words.each do |w|
        if p1_words.include? w.downcase
          count = count + 1
        end
      end
    end
    {:amount => count,:pa => self,:pb => p2}
  end


end