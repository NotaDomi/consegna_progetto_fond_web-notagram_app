import React from 'react'

export default function Message({content, sender, loggedUser, timestamp}) {
  return (
    <>
    { sender === loggedUser ? 
      <div className="message-right" > 
         <p className="content"> {content} </p>
         <p className="time"> {timestamp} </p>
      </div> : 
      <div className="message-left" > 
        <p className="content"> {content} </p>
        <p className="time"> {timestamp} </p>
      </div>
    }
    </>
  )
}
