class HomeController < ApplicationController
  def index
    
    @jfile = File.read(Rails.public_path+"info.json")	
  	@jdata = JSON.parse(@jfile)
  	
  	## New Releases
	  ##@newreleases = []
	  @newreleases = @jdata["spotlights"]
	  @newreleases.sort_by!{|s| s["order"]}
  	
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
