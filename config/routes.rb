Rails.application.routes.draw do
  resources :images
  resources :stories
  resources :users

  root 'stories#home'
 
end
