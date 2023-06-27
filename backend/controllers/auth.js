const User = require('../models/users')

/*
In questo file abbiamo gestito i controllers per l'autenticazione al percorso /auth con i suoi sottopercorsi

/check --> utilizza il controller getUserLogged che ritornerà al frontend l'id dell'utente corrispondente al valore salvato nel cookie (su questo metodo non è applicato il middleware requireAuth)

/register --> utilizza il controller registerUser che permetterà di registrare un utente controllando che l'username non sia già utilizzato (su questo metodo non è applicato il middleware requireAuth)

/login --> utilizza il controller loginUser che permetterà di effettuare il login usando il metodo compare che abbiamo definito nel model users (su questo metodo non è applicato il middleware requireAuth)

/logout --> utilizza il controller logoutUser che permetterà di effettuare il logout comunicando al client di eliminare il cookie (su questo metodo è applicato il middleware requireAuth)

La scelta di usare il middleware solo sul logout verrà spiegata nel file apposito

*/

module.exports = {
  
    registerUser: (req, res) => {
      const username = req.body.username
      const password = req.body.password
    
      User.findOne({ username })
        .then(existingUser => {
          if (existingUser) {
            res.status(400).json({ message: 'Username già esistente' })
          } else {
            const newUser = new User({ username, password })
            return newUser.save()
                    .then(newUser => {
                      req.session.userLogged = { id: newUser._id, username: newUser.username }
                      res.status(201).json({ message: 'Registrazione avvenuta con successo' })
                    })
          }
        })
        .catch(error => {
          console.error('Errore nella registrazione:', error)
          res.status(500).json({ message: 'Errore interno al server' })
        })
    },

    getUserLogged:(req,res)=>{
      if(req.session.userLogged){
        res.send({isLogged: true, user: req.session.userLogged})
      }else{
        res.send({isLogged: false})
      }
    },

    loginUser: (req, res) => {
      const username = req.body.username
      const password = req.body.password
    
      User.findOne({ username })
        .then(user => {
          if (!user) {
            res.status(401).json({ message: 'Credenziali errate' })
          } else {
            return user.comparePassword(password)
                    .then((isMatch) => {
                      if (!isMatch) {
                        res.status(401).json({ message: 'Credenziali errate' })
                      } else {
                        req.session.userLogged = { id: user._id, username: user.username }
                        res.json({ message: 'Login avvenuto con successo' })
                      }
                    })
          }
        })
        .catch(error => {
          console.error('Errore nel login:', error)
          res.status(500).json({ message: 'Errore interno al server' })
        })
    },

    logoutUser: (req, res) => {
        req.session.destroy()
        res.clearCookie('userLogged')
        res.json({ message: 'Logout avvenuto con successo' })
    }

}