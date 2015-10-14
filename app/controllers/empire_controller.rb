class EmpireController < ApplicationController
  def index
    @jfile = File.read(Rails.public_path+"info.json")	
  	@jdata = JSON.parse(@jfile)
  	
  	@empiremembers = []
  	
  	@jdata["mcempire"].each do |member|
  	  @empiremembers << member  
  	end
  end
end
