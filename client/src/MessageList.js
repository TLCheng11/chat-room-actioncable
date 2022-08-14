import { useEffect, useState } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';

export default function MessageList() {
  const [message, setMessage] = useState("")
  const [channelInput, setchannelInput] = useState(0)
  const [channel, setchannel] = useState(0);

  function sendData() {
    fetch(`/conversations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        channel_id: channel,
        message: message
      })
    })
  }

  function joinChannel(e) {
    setchannel(channelInput)
    fetch(`/conversations/join-channel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        channel_id: channelInput
      })
    })
  };

  function handleReceivedConversation(response) {
    console.log(response)
  };

  return (
    <div>
      <ActionCableConsumer
        channel={{ channel: 'ConversationsChannel', channel_id: channel }}
        onReceived={handleReceivedConversation}
      />
      <input type="number" value={channelInput} onChange={e => setchannelInput(e.target.value)}></input>
      <button onClick={joinChannel}>Set channel</button>
      <input value={message} onChange={e => setMessage(e.target.value)}></input>
      <button onClick={sendData}>Send data</button>
    </div>
  );
}