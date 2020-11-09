const express = require('express')
const router = express.Router()

const mongoUser = require('../models/Users.js').mongoUser
const User = require('../objects/User.js')

router.get('/', async (req, res) => {
    const result = await mongoUser.find().exec()
    res.status(200).send( JSON.stringify(result) )
})

router.post('/', async (req, res) => {
    const newUser = new mongoUser({
        userData: User.toUser(req.body.user)
    })
    const result = await newUser.save()
    res.status(200).send( JSON.stringify( result ) )
})

module.exports = router