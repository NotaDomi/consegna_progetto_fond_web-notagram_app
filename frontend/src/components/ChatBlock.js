import Message from './Message'
import { faPaperPlane, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



export default function ChatBlock({messages, setMessages, setLogged, loggedUser, setLoggedUser, friend, setFriend} ) {
  const [message,setMessage] = useState('')
    const referenceChat = useRef(null); //reacthook per referenziare un componente 
    const navigate = useNavigate()      //reacthook per la navigazione tra le pagine

    useEffect( () => {
        if (referenceChat.current) {
          referenceChat.current.scrollTop = referenceChat.current.scrollHeight;
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
            .then( (response)=>{
                console.log(response)
                setLogged(error.response.data.isLogged)
                setLoggedUser(error.response.data.user)
                navigate('/login')
            })
        })
    }
  
    //handler richiamato quando si preme sul tasto per aggiornare la chat (abbiamo deciso di non utilizzare l'approccio real-time)
      const updateHandler = () => {
        axios.get(`/api/messages/getMessages/${loggedUser.id}/${friend.id}`).then( res => {
          
          setMessages(res.data);
          setFriend({user:friend.user,id:friend.id})
          }).catch(error=>{
          alert(error.response.data.message)
          axios.get('/auth/check')
              .then((response)=>{
                console.log(response)
                setLogged(error.response.data.isLogged)
                setLoggedUser(error.response.data.user)
                navigate('/login')
            })
        })
      }
  return (
    <>
        <header id="chat-head">
          <img id="chat-profile-image" alt="profile" src="user.png"/>
          <h2>{friend.user}</h2>
          <button onClick={updateHandler}> <FontAwesomeIcon icon={faArrowRotateRight} /> </button>
          </header>
          <section id="messages" ref={referenceChat}> 
            {messages.map((message,index)=> <Message sender={message.sender._id} loggedUser={loggedUser.id} content={message.content} key={index} timestamp={message.timestamp}/>)}
          </section>
          <form id="inputMessage" onSubmit={sendMessage}> 
              <input type='text' placeholder='Scrivi un nuovo messaggio' size='120' value={message} onChange={(e)=>setMessage(e.target.value)} />
              <button className="button" type="submit" > Invia messaggio <FontAwesomeIcon icon={faPaperPlane} /></button>
          </form>
    </>
  )
}

