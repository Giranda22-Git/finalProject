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
        },
        cash: {
            type: Number,
            default: 0
        },
        freshAuctions: {
            type: [mongoose.Schema.Types.ObjectId],
            default: []
        },
        lostAuctions: {
            type: [mongoose.Schema.Types.ObjectId],
            default: []
        },
        wonAuctions: {
            type: [mongoose.Schema.Types.ObjectId],
            default: []
        },
        participatedAuctions: {
            type: [mongoose.Schema.Types.ObjectId],
            default: []
        }
    }
})

const mongoUser = mongoose.model('users', users)
module.exports = { mongoUser }