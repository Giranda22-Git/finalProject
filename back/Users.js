const mongoose = require('mongoose')
const users = new mongoose.Schema({
    userData: {
        Login: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
            unique: true
        },
        Password: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },
        privilege: {
            type: String,
            required: true
        }
    },
    status: String
})

const mongoUser = mongoose.model('users', users)
module.exports = { mongoUser }