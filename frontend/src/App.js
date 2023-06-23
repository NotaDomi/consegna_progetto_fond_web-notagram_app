
import './App.css';
import React, {useState, useEffect} from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Chats from './pages/Chats'


import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  const [isLogged, setLogged] = useState(false);
  const [loggedUser,setLoggedUser] = useState({username:'', id:''})
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const navigate = useNavigate()

  useEffect( () => { 
    
    axios.get('/auth/check')
    .then((response)=>{
      console.log(isLogged)
      console.log(response)
      setLogged(response.data.isLogged)
      setLoggedUser(response.data.user)
    })
    
  }, [] )

  useEffect(()=>{
    console.log(loggedUser)
    console.log(isLogged)
    isLogged ? navigate('/home') : navigate('/login')
  },[isLogged])

return (
    <>
    
    <Routes>
      <Route path='/home' element={<Home isLogged={isLogged} setLogged={setLogged} loggedUser={loggedUser} setLoggedUser={setLoggedUser} setIsButtonDisabled={setIsButtonDisabled} isButtonDisabled={isButtonDisabled}/>}/>
      <Route path="/register" element={<Register setLogged={setLogged} setLoggedUser={setLoggedUser} isButtonDisabled={isButtonDisabled} setIsButtonDisabled={setIsButtonDisabled}/>} />
      <Route path="/login" element={ <Login setLogged={setLogged} setLoggedUser={setLoggedUser} isButtonDisabled={isButtonDisabled} setIsButtonDisabled={setIsButtonDisabled}/> } />
      <Route path="/chats" element={ <Chats isLogged={isLogged} setLogged={setLogged} loggedUser={loggedUser} setLoggedUser={setLoggedUser} isButtonDisabled={isButtonDisabled} setIsButtonDisabled={setIsButtonDisabled}/> } />
    </Routes>
    </>
  );
}

export default App;
