import './Chatbox.css'
import { socket } from '../SinglePlayer/RunGame';
import { useEffect, useState } from 'react';


var message

export function Chatbox (props) {

  useEffect(() => {

  }, [props.messages])

  const handleTextBoxChange = (event) => { // Tracks changes in the RoomID form
    message = (event.target.value);
  }

  const handleMessageClick = (e) => { // Submits the RoomID form
      e.preventDefault();
      socket.emit('message', message, props.username, props.roomId)
      const textBox = document.getElementById('inputTextChat')
      textBox.value = ''
  }

  socket.on('messageIn', (room) => {
    let fiveMessages = room.chatMessages.slice(-5)
    props.setMessages(fiveMessages)
  })

  return(
    <div className='chatBox'>
        <ul id="messages">
          {props.messages.map(
              (message) => (<Message message={message}/>)
          )}
        </ul>
        <form id="form" action="">
          <input id="inputTextChat" autocomplete="off" onChange={handleTextBoxChange}/><button onClick={handleMessageClick}>Send</button>
        </form>
    </div>
  )
}

export function Message ({message}) {
  return(<li>{message}</li>)
}