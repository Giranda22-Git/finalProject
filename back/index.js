const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')

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
            if (err) return new Error(`error by in starting server, error: ${err}`)
            else console.log(`server started on \nPORT: ${serverData.PORT}\nURL: ${serverData.serverUrl}`)
        })

    })

    mongoose.connection.close()
}
