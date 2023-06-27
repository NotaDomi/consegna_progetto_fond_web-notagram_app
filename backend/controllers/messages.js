const Message = require('../models/messages')

/*
In questo file abbiamo gestito i controllers per la visualizzazione della chat e l'invio del messaggio al percorso /api/messages con i suoi sottopercorsi

/getMessages/:sender/:receiver --> utilizza il controller getMessagesBySenderAndReceiver che ritornerà al frontend la lista di messaggi tra i due utenti (quello loggato e l'amico scelto)

/send --> utilizza il controller sendMessage per salvare nel database il messaggio inviato

in entrambi i casi prima di giungere all'uso del controller ci sarà il middleware che si occuperà di verificare che ci sia un utente loggato e quindi autorizzato a usare queste api

*/

module.exports = {
  
    getMessagesBySenderAndReceiver: (req,res)=>{
        Message.find({$or:  [
                                { sender: req.params.sender, receiver: req.params.receiver },
                                { sender: req.params.receiver, receiver: req.params.sender }
                            ]
                    })
        .populate({
            path: 'sender receiver',
            select: 'username username',
          })
        .then(r => res.json(r))
    },
    
    sendMessage: (req,res)=>{
        if(req.body.content!==''){
            Message.create({
                sender: req.body.sender,
                receiver: req.body.receiver,
                content: req.body.content,
                timestamp: new Date().toLocaleString()
            })
            .then( () => res.json({ message: 'Messaggio inviato' }))
        }else{
            res.status(200).json({ message: 'Messaggio vuoto. Scrivi qualcosa prima di inviare un messaggio' })
        }
    }
}