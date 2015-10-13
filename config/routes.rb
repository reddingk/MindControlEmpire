Rails.application.routes.draw do

  
# Artists
  get 'artists/index'
  get 'Artists/Empire', to: 'artists#individual'
  #get 'artists/individual'

# CMS - Editor  
  get 'cm_s/index'
  get 'cm_s/edit'
  
# Home
  get 'home/index'
  root 'home#index'
  get 'home/construction'
 
end
