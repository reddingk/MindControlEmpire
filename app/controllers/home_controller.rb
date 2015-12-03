class HomeController < ApplicationController
  def index
    
    @jfile = File.read(Rails.public_path+"info.json")	
  	@jdata = JSON.parse(@jfile)
  	
  	## New Releases
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
  	
  	@newreleases.sort_by!{|e| e["date"].to_date }.reverse!
  	
  	## Events
  	@newevents = []
  	@jdata["events"].each do |event|
  	  if @newevents.size < 7 && event["date"].to_date > (Date.today - 1.day)
  	    @jdata["artists"].each do |artist|
  	      if event["artistname"] == artist["name"]
  	        event["photo"] = artist["image"]
  	      end
  	    end
  	    if event["photo"].nil? || event["photo"].empty?
  	      event["photo"] = "_MCE_logo.jpg"
  	    end
  	    if event["artistname"].nil? || event["artistname"].empty? 
  	      event["artistname"] = "Mind Control Empire"
  	    end
  	    @newevents << event
  	  end
  	end
  	@newevents.sort_by!{|e| e["date"].to_date }
  	
  	## 
  end
  
## End Controller  
end
