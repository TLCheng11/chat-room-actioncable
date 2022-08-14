class ConversationsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stop_all_streams
    stream_from params[:channel_id]
    # ActionCable.server.broadcast params[:channel_id], "connected to channel #{params[:channel_id]}"
  end
  
  # def receive(data)
  #   ActionCable.server.broadcast "conversations_channel", data
  # end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    ActionCable.server.broadcast params[:channel_id], "disconnected from channel #{params[:channel_id]}"
    stop_all_streams
  end
end
