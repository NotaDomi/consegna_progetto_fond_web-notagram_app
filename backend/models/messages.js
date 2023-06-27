const mongoose = require('mongoose')

/*
La collezione messages è composta da record Message che avranno indicazioni sul mittente, sul destinatario, un contenuto e un timestamp(data di invio messaggio)
*/

const messagesSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  content: String,
  timestamp: {
    type: String, 
    required: true,
  }
})

module.exports = mongoose.model("Message", messagesSchema)