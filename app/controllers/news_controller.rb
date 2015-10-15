class NewsController < ApplicationController
  def index
    @jfile = File.read(Rails.public_path+"info.json")	
  	@jdata = JSON.parse(@jfile)
  	
  	@newsitems = []
  	
  	@jdata["news"].each do |item|
  	  @newsitems << item  
  	end
  	
  ##END index
  end
end
