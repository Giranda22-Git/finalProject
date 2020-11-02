const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const wss = require('ws')

const User = require('./User.js')
//import mongoFreshAuction from './FreshAuctions.js'
const mongoUser = require('./Users.js').mongoUser

const serverData = {
    mongoUrl: 'mongodb://127.0.0.1:27017/finalProject',
    serverUrl: 'http://localhost:3000/',
    PORT: 3000
}

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.contentType('application/json')
    next()
})
app.use(cors())

init(serverData)

async function init(serverData) {
    await mongoose.connect(serverData.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    
    mongoose.connection.once('open', () => {
        app.listen(serverData.PORT, (err) => {
            if (err) return new Error(`error in starting server, error: ${err}`)
            else console.log(`server started on \nPORT: ${serverData.PORT}\nURL: ${serverData.serverUrl}`)
        })
        app.get('/', async (req, res) => {
            const result = await mongoUser.find().exec()
            res.send( JSON.stringify(result) )
        })

        app.post('/create/user', async (req, res) => {
            const newUser = new mongoUser({
                userData: User.toUser(req.body.user)
            })
            const result = await newUser.save()
            res.status(200).send( JSON.stringify( result ) )
        })
    })
    mongoose.connection.emit('open')
}
