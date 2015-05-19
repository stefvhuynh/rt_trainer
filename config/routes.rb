Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :scores, only: :create
    resources :users, only: :create
    resource :session, only: [:create, :destroy]
  end
end
