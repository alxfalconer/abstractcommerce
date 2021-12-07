Rails.application.routes.draw do
  resources :purchases
  resources :orders
  resources :artworks
  resources :users
  resources :login, only: [:create]
end
