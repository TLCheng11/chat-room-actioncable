import { useContext, useEffect, useState } from 'react';
import { ActionCableContext } from '.';

export default function MessageList() {
  const [channel, setChannel] = useState("")
  const cable = useContext(ActionCableContext)
  
  useEffect(() => {
    const channel = cable.subscriptions.create({
      channel: 'conversations_channel'
    })

    setChannel(channel)

    return () => {
      channel.unsubscribe()
    }
  },[])

  function sendData() {
    channel.send("some data")
  }

  return (
    <div>
      <button onClick={sendData}>Send data</button>
    </div>
  );
}