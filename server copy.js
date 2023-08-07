require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3002


mongoose.connect(process.env.DATABASE_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (err)=> console.log(err))
db.once('open', ()=> console.log('Database Connecte'))

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
    console.log('Página raiz');
})

app.get('/sobre', (req, res) => {
    res.send('ola')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})