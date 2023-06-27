import React, { useEffect, useState} from 'react'
import axios from 'axios'
import FriendList from '../components/FriendList'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import ChatBlock from '../components/ChatBlock'
import BannerChat from '../components/BannerChat'

export default function Chats({isLogged,setLogged,loggedUser,setLoggedUser,isButtonDisabled, setIsButtonDisabled}) {
    const [allFriends, setFriends ] = useState([])
    const [isLoading, setLoading] = useState(true)
    
    const [messages,setMessages]=useState([])
    const [click,setClick]=useState(false)
    const [friend,setFriend]=useState({user:'',id:''})  
  
    axios.defaults.withCredentials=true

    useEffect( () => {
        axios.get('/api/users/allFriends').then(res => {
            
            setFriends(res.data.friends);
            setLoading(false)
        }).catch(error=>{
          alert(error.response.data.message)
          axios.get('/auth/check')
              .then( (response)=>{
              console.log(response)
              setLogged(error.response.data.isLogged)
              setLoggedUser(error.response.data.user)
            })
        })
       
    }, [])

    return (
    <>
    <Navbar isLogged={isLogged} setLogged={setLogged} loggedUser={loggedUser} setLoggedUser={setLoggedUser}/> 
    {isLoading ? <Loading /> : 
      <div id="chat-content">
        <FriendList 
          allFriends = {allFriends}
          setFriends={setFriends}
          setMessages={setMessages}
          setLogged={setLogged}
          loggedUser={loggedUser} 
          setLoggedUser={setLoggedUser} 
          setClick={setClick}
          setFriend={setFriend} 
          isButtonDisabled={isButtonDisabled} 
          setIsButtonDisabled={setIsButtonDisabled}
        />
    <div id="chat-container">
        {click ? 
        <ChatBlock 
        messages={messages}  
        setMessages={setMessages}
        setLogged={setLogged} 
        loggedUser={loggedUser} 
        setLoggedUser={setLoggedUser} 
        friend={friend}
        setFriend={setFriend} 
        />
        : <BannerChat /> }
      </div>
    </div>
  }
  </>
    
  )
}

