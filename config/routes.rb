Rails.application.routes.draw do
  resources :images
  resources :stories
  resources :users

  root 'stories#home'
  get  'login'   => 'session#new'
  post '/login' => 'session#create'
  delete '/logout' => 'session#destroy'

end
