class EventsController < ApplicationController
  def index
    @jfile = File.read(Rails.public_path+"info.json")	
  	@jdata = JSON.parse(@jfile)
    
    @comingevents = []
    @pastevents = []
    
  	@jdata["events"].each do |event|
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
  	  ## Add to coming events or Past Events
  	  if event["date"].to_date > (Date.today - 1.day)
  	    @comingevents << event
  	  else
  	    @pastevents << event
  	  end
  	end
  	@comingevents.sort_by!{|e| e["date"].to_date }
    @pastevents.sort_by!{|e| e["date"].to_date }.reverse!
    
  ##End index
  end
end
