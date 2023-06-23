import React from 'react'
import { faUser, faKey, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'

export default function RegisterForm({handleInfo, signInfo, handleSubmit,IsButtonDisabled}) {
  return (
    <div className="signForm"> 
      <img className="logoForm" alt="Logo web-app" src="logo192.png"/>
      <h2>Registrazione</h2>
      <h3> Inserisci le tue credenziali</h3>
      <form onSubmit={handleSubmit}>
        <label> <FontAwesomeIcon icon={faUser} /> Username </label>
        <input type="username" placeholder='Username' name="username" value={signInfo.username} onChange={ (e) => handleInfo(e) } required />
        <label> <FontAwesomeIcon icon={faKey} /> Password </label>
        <input type="password" placeholder='Password' name="password" value={signInfo.password} onChange={ (e) => handleInfo(e)} required />
        <button type="submit" disabled={IsButtonDisabled}>
            <span> Registrati </span>
          <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
        <p> Hai già un account? <Link className='redirect' to="/login">Login</Link></p>
    </div>
  )
}

