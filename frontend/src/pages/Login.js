import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function Login ({setLogged,setLoggedUser,setIsButtonDisabled,isButtonDisabled})  {
  const [signInfo, setSignInfo] = useState({username: '', password: ''})
  let navigate = useNavigate();

  axios.defaults.withCredentials=true

  const handleInfo = (e) => {
    setSignInfo({...signInfo, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true)
    axios.post( '/auth/login', {
        username: signInfo.username,
        password: signInfo.password
      }).then(r => {
        alert(r.data.message)
        axios.get('/auth/check')
        .then((response)=>{
        console.log(response)
        setLogged(response.data.isLogged)
        setLoggedUser(response.data.user)
      })
        setIsButtonDisabled(false)
        navigate('/home')                            //se il login va a buon fine vengo redirezionato alla home
      }).catch( error => {
        alert(error.response.data.message)
        setSignInfo({username: '', password: ''})   //azzero lo stato relativo ai campi del form
        setIsButtonDisabled(false)
      } );
    
  }

  return (
    <LoginForm 
    handleSubmit = {handleSubmit}
    handleInfo = {handleInfo}
    signInfo = {signInfo}
    IsButtonDisabled= {isButtonDisabled}
    /> 
    
  );
};


