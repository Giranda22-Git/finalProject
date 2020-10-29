const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')

const User = require('./User.js')
console.log(new User('Giranda22', 'newPassword'))

const serverData = {
    mongoUrl: 'mongodb://localhost:27017/finalProject',
    serverUrl: 'http://localhost:3000/',
    PORT: 3000
}

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

init(serverData)

async function init(serverData) {
    await mongoose.connect(serverData.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    
    mongoose.connection.on('error', (error) => console.log(error))
    
    mongoose.connection.on('connected', () => {
        app.listen(serverData.PORT, (err) => {
            if (err) return new Error(`error in starting server, error: ${err}`)
            else console.log(`server started on \nPORT: ${serverData.PORT}\nURL: ${serverData.serverUrl}`)
        })
        app.get('/', (req, res) => {
            const login = new Login('Giranda22')
            console.log(login)
            res.send( JSON.stringify(login) )
        })
    })
    mongoose.connection.emit('connected')
    mongoose.connection.emit('error')

    

    const User = new mongoose.Schema({
        login: String,
        password: String
    })


    const freshAuctions = new mongoose.Schema({
        title: String,
        text: String,
        objectName: String,
        startTime: Date,
        endTime: Date,
        images: Array,
        startedPrice: Number,
        currentPrice: Number,
        startedPriceForStep: Number,
        currentPriceForStep: Number,
        like: Number,
        messages: Array,
        owner: String,
        participants: Array
    })

    const freshAuction = mongoose.model('freshAuction', freshAuctions)

    



    mongoose.connection.close()
}
