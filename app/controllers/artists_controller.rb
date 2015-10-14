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
  end
  
  def get_artistReleases
    
    render :partial => "artistReleases"
  end
end
