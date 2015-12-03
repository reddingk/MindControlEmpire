class ArtistsController < ApplicationController
  def index
    @jfile = File.read(Rails.public_path+"info.json")	
  	@jdata = JSON.parse(@jfile)
  	
  	@artists = []
  	@jdata["artists"].each do |artist|
  	  if artist["image"].nil? || artist["image"].empty?
  	    artist["image"] = "_MCE_logo.jpg"
  	  end
  	  @artists << artist
  	end
  ## END index	
  end

  def individual
    @artistname = params[:artist]
    
    @jfile = File.read(Rails.public_path+"info.json")	
  	@jdata = JSON.parse(@jfile)
    
  	@jdata["artists"].each do |artist|
  	  if artist["name"] == @artistname
  	    if artist["image"].nil? || artist["image"].empty?
  	      artist["image"] = "_MCE_logo.jpg"
  	    end
  	    @talent = artist
  	  end
  	end
  	
  	@releasecount = (@talent["releases"].count / 3.0).ceil
  	
  	##Events by artist
  	@talent["events"] = []
  	
  	@jdata["events"].each do |event|
  	  if event["artistname"] == @talent["name"] && event["date"].to_date > (Date.today - 1.day)
  	    @talent["events"] << event
  	  end
  	end
   @talent["events"].sort_by!{|e| e["date"].to_date }
   
  ## END individual	
  end
  
  def get_artistReleases
    
   #render :partial => "artistReleases"
   render :text => "<p>TEST</p>"
  end
end
