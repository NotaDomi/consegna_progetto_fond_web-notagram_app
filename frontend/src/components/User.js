import React from 'react' 
import { faHeart} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function User ({ username, myId, setLoggedUser, setLogged ,isButtonDisabled,setIsButtonDisabled,allUsers, setAllUsers,showTextHome,setText}) {

    let navigate = useNavigate();

    const addFriend = () => {
        setIsButtonDisabled(true)
        axios.post('/api/users/addFriend?_method=PUT', {
            id: myId,
            username: username
        }).then( res => {
            alert(res.data.message)
            setAllUsers(allUsers.filter(user=>user._id!==myId))
            setIsButtonDisabled(false)
        }).catch(error=>{
            alert(error.response.data.message)
            axios.get('/auth/check')
                .then( (response)=>{
                console.log(response)
                setLogged(error.response.data.isLogged)
                setLoggedUser(error.response.data.user)
                setIsButtonDisabled(false)
                navigate('/login')
              })
          })
    }

    return (
        <div className="userCard"> 
            <p> <img alt="profile" src="user.png" width="50px" heght="50px" /> <span className="user"> {username} </span> </p>
            <button className="button" onClick={addFriend} disabled={isButtonDisabled}> <span> Aggiungi amico </span> <FontAwesomeIcon icon={faHeart} />  </button>
        </div>
    )
    
}