import Message from './Message'
import { faPaperPlane, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef } from 'react'
import axios from 'axios'


export default function ChatBlock({message, setMessage, messages, setMessages, setLogged, loggedUser, setLoggedUser, friend, setFriend} ) {
    
    const messageDiv = useRef(null);

    useEffect( () => {
        if (messageDiv.current) {
          messageDiv.current.scrollTop = messageDiv.current.scrollHeight;
        }
      }, [messages])
  
  
      const sendMessage = (event) => {
        event.preventDefault();
        axios.post('/api/messages/send', {
            sender: loggedUser.id,
            receiver: friend.id,
            content: message
        }).then( () => {
          
          axios.get(`/api/messages/getMessages/${loggedUser.id}/${friend.id}`).then( res => {
            
            setMessages(res.data);
            setMessage('');
          })
        }).catch(error=>{
          alert(error.response.data.message)
          axios.get('/auth/check')
          .then( ()=>{
                setLogged(error.response.data.isLogged)
                setLoggedUser(error.response.data.user)
            })
        })
    }
  
  
      const updateHandler = () => {
        axios.get(`/api/messages/getMessages/${loggedUser.id}/${friend.id}`).then( res => {
          
          setMessages(res.data);
          setFriend({user:friend.user,id:friend.id})
          }).catch(error=>{
          alert(error.response.data.message)
          axios.get('/auth/check')
              .then(()=>{
              
              setLogged(error.response.data.isLogged)
              setLoggedUser(error.response.data.user)
            })
        })
      }
  return (
    <>
        <header id="chat-head">
          <h2>{friend.user}</h2>
          <button onClick={updateHandler}> <FontAwesomeIcon icon={faArrowRotateRight} /> </button>
          </header>
          <section id="messages" ref={messageDiv}> 
            {messages.map((message,index)=> <Message sender={message.sender._id} loggedUser={loggedUser.id} content={message.content} key={index} timestamp={message.timestamp}/>)}
          </section>
          <form id="inputMessage" onSubmit={sendMessage}> 
              <input type='text' placeholder='Scrivi un nuovo messaggio' size='120' value={message} onChange={(e)=>setMessage(e.target.value)} />
              <button className="button" type="submit" > Invia messaggio <FontAwesomeIcon icon={faPaperPlane} /></button>
          </form>
    </>
  )
}

