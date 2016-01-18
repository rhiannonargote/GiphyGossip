class GiphyController < ApplicationController



  def show

  giphy_search = Giphy.search('funny cat', {limit: 5, offset: 1})
  @gif = giphy_search


  end


end