Rails.application.routes.draw do

# Empire  
  get 'MCEmpire/', to: 'empire#index'
  #get 'empire/index'

# Artists
  get 'Artists/', to: 'artists#index'
  #get 'artists/index'
  get 'Artists/Empire', to: 'artists#individual'
  #get 'artists/individual'
  get 'artists/get_artistReleases'

# CMS - Editor  
  get 'cm_s/index'
  get 'cm_s/edit'
  
# Home
  get "", to: 'home#index'
  #get 'home/index'
  root 'home#index'
  get 'home/construction'
 
end
