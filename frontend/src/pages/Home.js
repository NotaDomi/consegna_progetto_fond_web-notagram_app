import {React, useEffect, useState} from 'react'
import axios from 'axios'
import User from '../components/User'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import BannerHome from '../components/BannerHome'
import { useNavigate } from 'react-router-dom'

export default function Home ({isLogged,setLogged,loggedUser,setLoggedUser,isButtonDisabled,setIsButtonDisabled}) {
    const [allUsers, setAllUsers] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [showTextHome,setText]=useState(false)
    let navigate = useNavigate();

    axios.defaults.withCredentials=true


/* 
useEffect eseguito ogni volta che allUsers cambia (accade quando aggiungiamo un nuovo utente come amico, rimuovendolo dal relativo stato)
Se non ci sono più utenti da visualizzare allora setta lo stato showTextHome a true in maniera tale da visualizzare il componente BannerHome
*/
    useEffect(()=>{
        allUsers.length>0 ? setText(false):setText(true)
    },[allUsers])

    

    useEffect( () => { 

        axios.get('/api/users/allUsers')
        .then(res => {
            setAllUsers(res.data)
            setLoading(false)
        })
        .catch(error=>{
            alert(error.response.data.message)
            axios.get('/auth/check')
                .then((response)=>{
                console.log(response)
                setLogged(error.response.data.isLogged)
                setLoggedUser(error.response.data.user)
                setIsButtonDisabled(false)
                navigate('/login')
              });
            
          })
      }, [isLogged] )
 
    return (
        <> 
        <Navbar isLogged={isLogged} setLogged={setLogged} loggedUser={loggedUser} setLoggedUser={setLoggedUser}/> 
        {
        isLoading ? <Loading /> :
            <div id="user-container">
            {showTextHome ? <BannerHome/> :
            allUsers.map( (user,index) => <User 
                                            username={user.username} 
                                            key={index} 
                                            myId={user._id} 
                                            setLogged={setLogged} 
                                            setLoggedUser={setLoggedUser} 
                                            setIsButtonDisabled={setIsButtonDisabled} 
                                            isButtonDisabled={isButtonDisabled} 
                                            showTextHome={showTextHome} 
                                            setText={setText} 
                                            allUsers={allUsers} 
                                            setAllUsers={setAllUsers}
                                        />)
            }
            </div>
        }
        </>
    )
}