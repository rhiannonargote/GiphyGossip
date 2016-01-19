Rails.application.routes.draw do
  resources :images
  resources :stories
  resources :users

  root 'stories#home'
  get  'login'   => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/login' => 'sessions#destroy'
  get  'giphy'   => 'stories#show'

end
