import React from 'react'
import { faPaperPlane, faUser, faKey } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'

export default function LoginForm({signInfo, handleInfo, handleSubmit,IsButtonDisabled}) {

  return (
    <div className="signForm"> 
      <img className="logoForm" alt="Logo web-app" src="logo192.png"/>
      <h2>Login</h2>
      <h3> Inserisci le tue credenziali</h3>
      <form onSubmit={handleSubmit}>
        <label> <FontAwesomeIcon icon={faUser} /> Username </label>
        <input type="username" placeholder='Username' name="username" value={signInfo.username} onChange={handleInfo} required />
        <label> <FontAwesomeIcon icon={faKey} /> Password </label>
        <input type="password" placeholder='Password' name="password" value={signInfo.password} onChange={handleInfo} required />
        <button type="submit" disabled={IsButtonDisabled}>
            <span> Login </span>
          <FontAwesomeIcon icon={faPaperPlane} />
          </button>
      </form>
      <p> Non hai un account ? <Link className='redirect' to="/register">Registrati</Link></p>
    </div>
    
  )
}

