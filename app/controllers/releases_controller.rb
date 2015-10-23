class ReleasesController < ApplicationController
  def index
    @jfile = File.read(Rails.public_path+"info.json")	
  	@jdata = JSON.parse(@jfile)
  	
    ## All Releases
	  @allreleases = []
  	@jdata["artists"].each do |artist|
  	  artist["releases"].each do |release|
  		    release["artist"] = artist["name"]
  		    if release["art"].nil? || release["art"] == ""
  		      if !(artist["image"].nil?) && artist["image"] != "" 
  		        release["art"] = "artists/"+artist["image"]
  		      else
  		        release["art"] = "N/A"
  		      end
  		    end
  		    @allreleases << release
  		end
  	end
  	
    @allreleases.sort_by!{|e| e["date"].to_date }.reverse!
    ## End index
  end

  def individual
    @jfile = File.read(Rails.public_path+"info.json")	
  	@jdata = JSON.parse(@jfile)
  	
  	allreleases = []
  	@jdata["artists"].each do |artist|
  	  artist["releases"].each do |release|
  		    release["artist"] = artist["name"]
  		    if release["art"].nil? || release["art"] == ""
  		      if !(artist["image"].nil?) && artist["image"] != "" 
  		        release["art"] = "artists/"+artist["image"]
  		      else
  		        release["art"] = "N/A"
  		      end
  		    end
  		    allreleases << release
  		end
  	end
  	
  	allreleases.sort_by!{|e| e["date"].to_date }.reverse!
  	
  	@tracknum = params[:track]
  	@individualrelease = allreleases[@tracknum.to_i]
  	
  	
    ## End individual
  end
end
