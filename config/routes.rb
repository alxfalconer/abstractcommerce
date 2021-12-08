Rails.application.routes.draw do
  resources :purchases
  resources :orders
  resources :artworks
  get 'users/:id', to: 'users#show'
  resources :users
  resources :login, only: [:create]
end
