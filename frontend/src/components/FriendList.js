import React, { useEffect, useState } from 'react'
import Friend from './Friend'


export default function FriendList({allFriends, setLogged, loggedUser, setLoggedUser, setMessages, setClick, setFriend,setFriends,isButtonDisabled, setIsButtonDisabled}) { 
  const [showTextFriend,setText]=useState(false);  //stato per sapere se mostrare o meno il paragrafo nel container aside-friends

  //controllo per mostrare il paragrafo <p> ... </p> alla riga 16 quando l'utente loggato non ha amici
  useEffect(()=>{
    allFriends.length>0 ? setText(false):setText(true)
  },[allFriends])

  return (
    <div id="aside-friends">
    { showTextFriend? 
      <p>Al momento non hai amici <br></br>Aggiugine uno</p> :
      allFriends.map( (friend,index) =>  <Friend 
                                            username={friend.username} 
                                            key={index} 
                                            myId={friend._id} 
                                            setLogged={setLogged}           //
                                            loggedUser={loggedUser}         //tutti e 3 vengono passati perchè usati nella richiesta a /auth/check
                                            setLoggedUser={setLoggedUser}   //
                                            setMessages={setMessages} 
                                            setClick={setClick} 
                                            setFriend={setFriend} 
                                            allFriends={allFriends} 
                                            setFriends={setFriends} 
                                            isButtonDisabled={isButtonDisabled} 
                                            setIsButtonDisabled={setIsButtonDisabled}
                                              /> )
     
    } 
    </div>

  )
}

