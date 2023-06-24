import {React, useEffect, useState} from 'react'
import axios from 'axios'
import User from '../components/User'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'

export default function Home ({isLogged,setLogged,loggedUser,setLoggedUser,isButtonDisabled,setIsButtonDisabled}) {
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [showTextHome,setText]=useState(false);  

    useEffect(()=>{
        console.log(allUsers)
        allUsers.length>0 ? setText(false):setText(true)
    },[allUsers])

    axios.defaults.withCredentials=true

    useEffect( () => { 

        axios.get('/api/users/allUsers')
        .then(res => {
            setAllUsers(res.data)
            setLoading(false)
        })
        .catch(error=>{
            alert(error.response.data.message)
            axios.get('/auth/check')
                .then(()=>{
                
                setLogged(error.response.data.isLogged)
                setLoggedUser(error.response.data.user)
              });
            
          })
      }, [isLogged] )
 
    

    return (
        <> 
        <Navbar isLogged={isLogged} setLogged={setLogged} loggedUser={loggedUser} setLoggedUser={setLoggedUser}/> 
        {
        isLoading ? <Loading /> :
            
            showTextHome? 
            <div id="user-container">
                <div className='chat-exp'>
                    <img className="logoForm" alt="Logo web-app" src="logo192.png"/><br></br>
                    <br></br>Per visualizzare qui la chat
                    <br></br>selezionane una dalla barra laterale
                    <br></br>cliccando il bottone apri chat
                </div>
            </div>:
            <div id="user-container">
            {allUsers.map( (user,index) => <User username={user.username} key={index} myId={user._id} setLogged={setLogged} setLoggedUser={setLoggedUser} setIsButtonDisabled={setIsButtonDisabled} isButtonDisabled={isButtonDisabled} showTextHome={showTextHome} setText={setText} allUsers={allUsers} setAllUsers={setAllUsers}/>)}
            </div> 
    
        }
        
        </>
    )
}