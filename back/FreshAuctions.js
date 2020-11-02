const mongoose = require('mongoose')
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
    messages: Array, // массив обьектов messages => message
    owner: mongoose.Schema.Types.ObjectId, // objectId аукционера
    participants: Array // Массив обьектов User
})

const mongoFreshAuction = mongoose.model('freshAuction', freshAuctions)
module.exports = { mongoFreshAuction }