require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const cors = require('cors')
const https = require('https')
const fs = require('fs')

/*
Qui abbiamo usato alcuni moduli non visti a lezione per poter implementare cose più avanzate

- dotenv è stato usato per poter usare le variabili d'ambiente dal file .env (file non caricato nella nostra repository gitHub grazie al file .gitignore)

- cookie-parser e express-session sono stati usati per la gestione del cookie (nonostante si usi https l'attributo secure è stato commentato 
  perché testando l'applicazione su rete locale e non localhost dava problemi con il salvataggio del cookie)

Per il resto viene settato tutto come visto a lezione e grazie ai campi options viene specificato l'utilizzo del https invece che http

Le API sono state testate anche su postman e come previsto per essere utilizzate richiedono l'autenticazione
*/

const app = express()

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
}

const server = https.createServer(options, app)

mongoose.connect(process.env.DB_URI)

const db = mongoose.connection
db.once('open', () => {
  console.log('Connesso al DB')
  server.listen(3001, () => {
    console.log('App in ascolto')
  })
})

const authRouter = require('./routes/auth')
const router = require('./routes/api')
const authMiddleware = require('./middlewares/auth')

app.use(express.json())
app.use(cors({
  origin:["http://localhost:3000"],
  methods: ["GET","POST"],
  credentials: true
}))

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))

app.use(session({
  key: 'userLogged',
  secret: 'key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24*60*60*1000,
    sameSite: true,
    //secure: true,
    httpOnly: true
  }
}))


app.use('/auth', authRouter)

app.use('/api',authMiddleware.requireAuth)

app.use('/api', router)