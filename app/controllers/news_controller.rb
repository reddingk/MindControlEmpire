class NewsController < ApplicationController
  def index
    @jfile = File.read(Rails.public_path+"info.json")	
  	@jdata = JSON.parse(@jfile)
  	
  	@articlecount = (@jdata["news"].count / 3.0).ceil
  	
  ##END index
  end
  
  def newsitem
    @articlenum = params[:item]
    
    
    @jfile = File.read(Rails.public_path+"info.json")	
  	@jdata = JSON.parse(@jfile)
  	
  	@newslist = @jdata["news"].sort_by!{|e| e["date"].to_date }.reverse!
  	@newsitem = @newslist[@articlenum.to_i];
  	
  	
  ##END newsitem  
  end
  
  def get_newsArticles
    
    render :partial => "newsArticles"
  end
  
end
