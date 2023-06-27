import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import RegisterForm from '../components/RegisterForm'

export default function Register({setLogged,setLoggedUser,setIsButtonDisabled,isButtonDisabled}) {
  const [signInfo, setSignInfo] = useState({username: '', password: ''})
  let navigate = useNavigate();
  
  axios.defaults.withCredentials=true

  const handleInfo = (e) => {
    setSignInfo({...signInfo, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true)
    axios.post( '/auth/register', {
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
      navigate('/home');
    }).catch( error => {
      alert(error.response.data.message)
      setSignInfo({username: '', password: ''})
      setIsButtonDisabled(false)
    } );
  }

  return (
    <RegisterForm
    handleSubmit = {handleSubmit}
    handleInfo = {handleInfo}
    signInfo = {signInfo}
    IsButtonDisabled= {isButtonDisabled}
    />
    
  )
   

};


