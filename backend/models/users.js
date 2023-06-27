const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

/*
La collezione users è composta da record User che avranno indicazioni sullo username, password e amici.

La password è criptata usando bcrypt.js e con l'utilizzo di un certificato autofirmato abbiamo implementato
l'utilizzo di https così da avere una password criptata sul DB ma anche criptata mentre è "in volo" verso il server.

Il metodo comparePassword ci permette di verificare che la password inserita dall'utente coincida con quella salvata sul db
*/

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
})

userSchema.pre('save', function (next) {
  !this.isModified('password')&& next()

  bcrypt.genSalt(10)
    .then(salto => bcrypt.hash(this.password, salto))
    .then(hashedPassword => {
      this.password = hashedPassword
      next()
    })
    .catch(error => {
      console.error('Errore durante la generazione del salt o l\'hash della password:', error)
      next(error)
    })
})

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("User", userSchema)