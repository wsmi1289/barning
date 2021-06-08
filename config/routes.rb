Rails.application.routes.draw do
  root to: 'recipes#index'

  resources :recipes
  resources :ingredients
  namespace :users do
    resources :sessions, only: [:new]
  end
end
