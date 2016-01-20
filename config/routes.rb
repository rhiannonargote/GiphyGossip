Rails.application.routes.draw do
  devise_for :users, :controllers => { omniauth_callbacks: 'omniauth_callbacks' }
  resources :images
  resources :stories
  resources :users

  root 'stories#home'
  get  'login'   => 'session#new'
  match '/users/:id/finish_signup' => 'users#finish_signup', via: [:get, :patch], :as => :finish_signup
  post '/login' => 'session#create'
  post '/login' => 'session#destroy'
  post '/refresh' => 'stories#refresh'

end
