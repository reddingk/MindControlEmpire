Rails.application.routes.draw do

  

# CMS - Editor  
  get 'cm_s/index'
  get 'cm_s/edit'
  
# Home
  get 'home/index'
  root 'home#index'
  get 'home/construction'
 
end
