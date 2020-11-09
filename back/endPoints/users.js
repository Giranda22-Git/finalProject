const express = require('express')
const router = express.Router()

const mongoUser = require('../models/Users.js').mongoUser
const Password = require('../objects/Password.js')
const User = require('../objects/User.js')

router.get('/', async (req, res) => {
    const result = await mongoUser.find().exec()
    res.status(200).send( JSON.stringify(result) )
})

router.post('/', async (req, res) => {
    try {
        const newUser = new mongoUser({
            userData: User.toUser(req.body.user)
        })
        const result = await newUser.save()
        res.status(200).send( JSON.stringify( result ) )
    }
    catch(err) {
        res.sendStatus(500)
    }
})

router.get('/id/:id', async (req, res) => {
    try {
        const result = await mongoUser.findById(req.params.id).exec()
        res.status(200).json(result)
    }
    catch(err) {
        res.sendStatus(500)
    }
})

router.get('/login/:login', async (req, res) => {
    try {
        const result = await mongoUser.findOne({'Login._login': req.params.login}).exec()
        res.status(200).json(result)
    }
    catch(err) {
        res.sendStatus(500)
    }
})

router.post('/autorization', async (req, res) => {
    try {
        const user = User.toUser(await mongoUser.findOne({'Login._login': req.body.user.login}).exec())
        const result = user.Password.passwordVerify(req.body.user.password)
        res.status(200).send(result)
    }
    catch(err) {
        res.sendStatus(500)
    }
})

module.exports = router