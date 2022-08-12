class ConversationsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "conversations_channel"
  end

  def receive(data)
    ActionCable.server.broadcast "conversations_channel", "I received the data!"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end
end
