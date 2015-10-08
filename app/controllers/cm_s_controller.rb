class CmSController < ApplicationController
  def index
    @jfile = File.read(Rails.public_path+"info.json")	
  	@jdata = JSON.parse(@jfile)
  	
	  @newreleases = []
  	@jdata["artists"].each do |artist|
  	  artist["releases"].each do |release|
  	    if @newreleases.size < 4
  		    
  		    release["artist"] = artist["name"]
  		    @newreleases << release
  		    @newreleases.sort_by!{|e| e["date"].to_date }.reverse!
  		  else
  		    if release["date"].to_date > @newreleases[3]["date"].to_date
  		      release["artist"] = artist["name"]
  		      @newreleases[3] = release
  		      @newreleases.sort_by!{|e| e["date"].to_date }.reverse!
  		    end
  		  end
  		end
  	end
    
  end

  def edit
  end
end
