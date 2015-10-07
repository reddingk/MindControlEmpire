Rails.application.routes.draw do

# CMS - Editor  
  get '_cms_/index'
  get '_cms_/edit'
  
# Home
  get 'home/index'
  root 'home#index'
  get 'home/construction'
 
end
