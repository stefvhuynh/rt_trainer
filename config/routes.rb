Rails.application.routes.draw do
  root to: 'pages#main'

  namespace :api, defaults: { format: :json } do
    resources :scores, only: :create
    resources :users, only: :create
    resource :session, only: [:show, :create, :destroy]
  end
end
