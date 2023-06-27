import {React} from 'react'
import {faHeartCrack, faMessage} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Friend({username, myId, setLogged, loggedUser, setLoggedUser,setMessages,setClick,setFriend,allFriends,setFriends,setIsButtonDisabled,isButtonDisabled}) {

  let navigate=useNavigate()

  const removeFriend = () => {
    setIsButtonDisabled(true)
    axios.post('/api/users/removeFriend?_method=PUT', {
        id: myId,
        username: username
    }).then( res => {
      alert(res.data.message)
      setClick(false)
      setFriends(allFriends.filter(friend=>friend._id!==myId))
      setIsButtonDisabled(false)
      }).catch(error=>{
      alert(error.response.data.message)
      axios.get('/auth/check')
          .then((response)=>{
          console.log(response)
          setLogged(error.response.data.isLogged)
          setLoggedUser(error.response.data.user)
          setIsButtonDisabled(false)
          navigate('/login')
        })
    })
    
}

const apriChat = () => {
  axios.get(`/api/messages/getMessages/${loggedUser.id}/${myId}`).then( res => {
    
    setMessages(res.data);
    setClick(true);
    setFriend({user:username,id:myId})
    }).catch(error=>{
    alert(error.response.data.message)
    axios.get('/auth/check')
        .then((response)=>{
        console.log(response)
        setLogged(error.response.data.isLogged)
        setLoggedUser(error.response.data.user)
        setIsButtonDisabled(false)
        navigate('/login')
      })
  })
}


  return (
    <>   
        <div className="userCard">
        <p><img alt="profile" src="user.png" width="50px" heght="50px" /> <span className="user"> {username} </span></p>
        <button className="button" onClick={apriChat}> <span> Apri chat </span><FontAwesomeIcon icon={faMessage} /></button>
        <button className="button" onClick={removeFriend} disabled={isButtonDisabled} > <span> Rimuovi amico </span> <FontAwesomeIcon icon={faHeartCrack} /></button>
        </div> 
   </>
   )
}

