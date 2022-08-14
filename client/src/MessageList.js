import { useContext, useEffect, useState } from 'react';
import { ActionCableContext } from '.';

export default function MessageList() {
  const [username, setUsername] = useState("")
  const [channel, setChannel] = useState("")
  const [channelIdInput, setChannelIdInput] = useState(1)
  const [channelId, setChannelId] = useState("")
  const [message, setMessage] = useState("")

  const cable = useContext(ActionCableContext)
  
  useEffect(() => {
    if (channelId) {
      const channel = cable.subscriptions.create({
        channel: "ConversationsChannel",
        channel_id: channelId,
        username: username
      }, {
        received: (data) => {
          console.log(data)
        }
      })
  
      setChannel(channel)

      return () => {
        channel.unsubscribe()
      }
    }
  },[channelId])

  function joinChannel(e) {
    if (username) {
      setChannelId(channelIdInput)
    } else {
      alert("please enter your name")
    }
  }

  function sendData() {
    if (channel) {
      if (message) {
        channel.send({ message: message })
        setMessage("")
      } else {
        alert("please enter your message")
      }
    } else {
      alert("please join a channel first")
    }
  }

  return (
    <div>
      <div>
        <input type="text" maxLength="20" placeholder='please enter your name' value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <input type="number" min="1" value={channelIdInput} onChange={e => setChannelIdInput(e.target.value)} />
        <button onClick={joinChannel}>Join Channel</button>
      </div>
      <div>
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
        <button onClick={sendData}>Send data</button>
      </div>
    </div>
  );
}