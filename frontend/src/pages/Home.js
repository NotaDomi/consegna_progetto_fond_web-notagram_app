import {React, useEffect, useState} from 'react'
import axios from 'axios'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'

export default function Home ({isLogged,setLogged,loggedUser,setLoggedUser,isButtonDisabled,setIsButtonDisabled}) {
    // mappare per ogni utente un componente card
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);

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
        <div id="user-container">
        {allUsers.map( (user,index) => <Card username={user.username} key={index} myId={user._id} setLogged={setLogged} setLoggedUser={setLoggedUser} setIsButtonDisabled={setIsButtonDisabled} isButtonDisabled={isButtonDisabled}/>)}
        </div> 
        }
        
        </>
    )
}