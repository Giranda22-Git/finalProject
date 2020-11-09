const mongoose = require('mongoose')
const freshAuctions = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 128
    },
    description: {
        type: String,
        required: true,
        min: 15,
        max: 512
    },
    objectName: {
        type: String,
        required: true,
        min: 3,
        max: 128
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    images: {
        type: Array,
        required: true,
        min: 1,
        max: 15
    },
    startedPrice: {
        type: Number,
        required: true,
        min: 100,
        max: Infinity
    },
    currentPrice: {
        type: Number,
        required: true,
        min: 100,
        max: Infinity
    },
    startedPriceForStep: {
        type: Number,
        required: true,
        min: 100,
        max: Infinity
    },
    currentPriceForStep: {
        type: Number,
        required: true,
        min: 100,
        max: Infinity
    },
    like: {
        type: Array,
        required: true
    },
    messages: {
        type: Array,
        required: true,
        max: Infinity
    }, // массив обьектов messages => message
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }, // objectId аукционера
    participants: {
        type: Array,
        required: true
    }, // Массив обьектов User
    status: {
        type: String,
        enum: ['created', 'inprogress', 'finished ']
    },
    log: [Object]
})

const mongoFreshAuction = mongoose.model('freshAuction', freshAuctions)
module.exports = { mongoFreshAuction }