Rails.application.routes.draw do
  resources :images
  resources :stories
  resources :users

  root 'stories#home'
  get  'login'   => 'sessions#new'
  get  'giphyshow'   => 'giphy#show'

end
