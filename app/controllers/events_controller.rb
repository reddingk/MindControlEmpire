class EventsController < ApplicationController
  def index
    @jfile = File.read(Rails.public_path+"info.json")	
  	@jdata = JSON.parse(@jfile)
    
    @comingevents = []
  	@jdata["events"].each do |event|
  	  if event["date"].to_date > (Date.today - 1.day)
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
  	    @comingevents << event
  	  end
  	end
  	@comingevents.sort_by!{|e| e["date"].to_date }
  
  ##End index
  end
end
