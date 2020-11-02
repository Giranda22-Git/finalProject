const mongoose = require('mongoose')
const users = new mongoose.Schema({
    userData: mongoose.Schema.Types.Mixed,
    status: String
})

const mongoUser = mongoose.model('users', users)
module.exports = { mongoUser }