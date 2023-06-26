const User = require('../models/users')

/*
In questo file abbiamo gestito i controllers per la gestione degli utenti e visualizzazione degli amici al percorso /api/users con i suoi sottopercorsi

/allUsers --> utilizza il controller getAllUsers che ritornerà al frontend la lista di utenti registrati

/allFriends --> utilizza il controller getAllFriends che ritornerà al frontend la lista di utenti amici dell'utente loggato

/addFriend --> utilizza il controller addFriend che aggiungerà al vettore amici presente nel record dell'utente loggato l'utente da aggiungere come amico
(nel model è gestito l'accesso al solo id e username dell'utente da aggiungere come amico dato che per motivi di sicurezza la password criptata deve rimanere solo sul record dell'utente stesso)

/removeFriend --> utilizza il controller removeFriend che rimuoverà dal vettore amici presente nel record dell'utente loggato l'utente da rimuovere come amico 
(anche qui come nella parentesi di sopra)

in tutti i casi prima di giungere all'uso del controller ci sarà il middleware che si occuperà di verificare che ci sia un utente loggato e quindi autorizzato a usare queste api

*/

module.exports = {

    getAllUsers: (req,res) => {
        User.find({_id: { $ne: req.session.userLogged.id }}, `_id username`)
        .then(r => usersList=r)
        .then(()=>User.findOne({_id: req.session.userLogged.id}, `friends`)
        .populate({
          path: 'friends',
          select: 'username',
        })
        .then(r=>friendsList=r.friends))
        .then(()=>{
          res.json(usersList.filter(user =>!friendsList.some(friend => friend.username===user.username)))
        })
    },

    getAllFriends: (req,res) => {
        User.findOne({_id: req.session.userLogged.id}, `username friends`)
        .populate({
            path: 'friends',
            select: 'username',
          })
        .then(r => res.json(r))
    },

    addFriend: (req,res) => {
        User.findOne({_id:req.body.id})
        .populate([`friends`])
        .then(user => {
          user.friends.push({_id:req.session.userLogged.id, username:req.session.userLogged.username})
          user.save()
        })

        User.findOne({_id:req.session.userLogged.id})
        .populate([`friends`])
        .then(user => {
          user.friends.push({_id:req.body.id, username:req.body.username})
          user.save()
        })
        .then(()=>res.send({ message: 'Amico aggiunto' }))
        
    },

    removeFriend: (req,res) => {

      User.findOne({_id:req.body.id})
      .populate({
        path: 'friends',
        select: 'username',
      })
      .then(user=>{
        user.friends=user.friends.filter(e=>e.username!==req.session.userLogged.username)
        user.save()
      })

      User.findOne({_id:req.session.userLogged.id})
      .populate({
        path: 'friends',
        select: 'username',
      })
      .then(user=>{
        user.friends=user.friends.filter(e=>e.username!==req.body.username)
        user.save()
      })
      .then(()=>res.send({ message: 'Amico rimosso' }))
    }
}