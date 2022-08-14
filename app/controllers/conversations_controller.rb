class ConversationsController < ApplicationController
  def index
    render json: Conversation.all
  end

  def create
    ActionCable.server.broadcast params[:channel_id], params[:message]
    # ConversationsChannel.receive(params[:message])
  end

  def join_channel
    ActionCable.server.broadcast params[:channel_id], "joined channel #{params[:channel_id]}"
  end
end
