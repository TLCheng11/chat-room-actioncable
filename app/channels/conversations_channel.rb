class ConversationsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stop_all_streams
    @username = params[:username]
    @channel = params[:channel_id]
    stream_from @channel
    ActionCable.server.broadcast @channel, "#{@username} joined channel ##{@channel}"
  end
  
  def receive(data)
    ActionCable.server.broadcast @channel, "#{@username}: #{data["message"]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    ActionCable.server.broadcast @channel, "#{@username} left channel ##{@channel}"
    stop_all_streams
  end
end
