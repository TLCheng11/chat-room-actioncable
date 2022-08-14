Rails.application.routes.draw do
  resources :conversations
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  mount ActionCable.server => '/cable'

  resources :conversations, only: [:index, :create]
  post "conversations/join-channel", to: "conversations#join_channel"
end
