import { useContext, useEffect, useState } from 'react';
import { ActionCableContext } from '.';

export default function MessageList() {
  const [channel, setChannel] = useState("")
  const cable = useContext(ActionCableContext)
  
  useEffect(() => {
    const channel = cable.subscriptions.create({
      channel: "ConversationsChannel"
    }, {
      received(data) {
        console.log(data)
      }
    })

    // const channel = cable.subscriptions.create("conversations_channel")
    // const channel = cable.subscriptions.create("ConversationsChannel")

    setChannel(channel)

    return () => {
      channel.unsubscribe()
    }
  },[])

  function sendData() {
    channel.send({ message: "This is a cool chat app." })
  }

  return (
    <div>
      <button onClick={sendData}>Send data</button>
    </div>
  );
}