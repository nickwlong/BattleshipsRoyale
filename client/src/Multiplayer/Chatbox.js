import './Chatbox.css'
import { socket } from '../SinglePlayer/RunGame';
import { useState } from 'react';


var message

export function Chatbox (props) {
  const [messages, setMessages] = useState([])
  const handleTextBoxChange = (event) => { // Tracks changes in the RoomID form
    message = (event.target.value);
  }

  const handleMessageClick = (e) => { // Submits the RoomID form
      e.preventDefault();
      console.log(message)
      console.log(props.roomId)
      console.log(props.username)
      socket.emit('message', message, props.username, props.roomId)
  }

  socket.on('messageIn', (room) => {
    let fiveMessages = room.chatMessages.slice(-6,-1)
    setMessages(fiveMessages)
  })



  return(
    <div className='chatBox'>
        <ul id="messages">
          {messages.map(
              (message) => (<Message message={message}/>)
          )}
        </ul>
        <form id="form" action="">
          <input id="input" autocomplete="off" onChange={handleTextBoxChange}/><button onClick={handleMessageClick}>Send</button>
        </form>
    </div>
  )
}

export function Message ({message}) {
  return(<li>{message}</li>)
}