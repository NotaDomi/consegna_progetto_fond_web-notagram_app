const User = require('../models/users.js')

/*
Questo è il middleware che si occuperà di verificare che il cookie mandato dal client contenga le informazioni di un utente loggato. 
Viene usato su tutti i sottopercorsi di /api e per il percorso /aut/logout

Questa scelta è stata effettuata perché scaduta la sessione settata a 24 ore o non avendo effettuato il login non si deve essere 
autorizzati a usare le api dei relativi percorsi scritti sopra
*/

module.exports = {

  requireAuth: (req, res, next) => {

    if (!req.session.userLogged) {
      res.status(401).json({ notAutorized: true, message: 'Sessione scaduta. Per favore effettua nuovamente il login' })
    } else {
      User.findById(req.session.userLogged.id)
        .then(user => {
          req.user = user
          next()
        })
    }
  }
}