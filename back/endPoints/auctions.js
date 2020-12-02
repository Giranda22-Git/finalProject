const express = require('express')
const router = express.Router()

const fs = require('fs')

const tmpDir = __dirname + '/tmp/'
const uploadDir = __dirname + '/uploads/'
const multer = require('multer')
const upload = multer({dest: './endPoints/tmp/'})

const mongoFreshAuction = require('../models/FreshAuctions.js').mongoFreshAuction
const mongoUser = require('../models/Users.js').mongoUser
const log = require('../objects/log.js')
const User = require('../objects/User.js')

router.get('/', async (req, res) => {
    const result = await mongoFreshAuction.find().exec()
    res.status(200).send( JSON.stringify(result) )
})

router.post('/', upload.array('files', 15), async (req, res) => {
    const files = req.files
    const data = req.body
    const validTypes = ['svg+xml', 'png', 'gif', 'jpeg']
    const images = new Array
    let index = 0
    files.forEach(file => {
        const fileType = file.mimetype.split('/')

        if (file.size > 1000000) {
            delBadFile(file.filename)
            res.status(500).json({
                type: 'error',
                message: 'Файл слишком большой'
            })
        }
        if (fileType[0] !== 'image') {
            delBadFile(file.filename)
            res.status(500).json({
                type: 'error',
                message: 'Загружать можно только изображения'
            })
        }
        if (validTypes.includes(fileType[1])) {
            fs.renameSync(tmpDir + file.filename, uploadDir + data.owner + index++ + file.originalname)
            images.push(uploadDir + data.owner + String(index - 1) + file.originalname)
        } else {
            delBadFile(file.filename)
            res.status(500).json({
                type: 'error',
                message: 'недопустимый формат изображения'
            })
        }
    })
    const owner = await mongoUser.findById(data.owner).exec()
    const newAuction = new mongoFreshAuction({
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        images: images,
        startedPrice: data.startedPrice,
        currentPrice: data.startedPrice,
        startedPriceForStep: data.startedPrice / 10,
        currentPriceForStep: data.startedPrice / 10,
        like: [],
        messages: [], // массив обьектов messages => message
        owner: data.owner, // objectId аукционера
        participants: data.participants, // Массив ObjectId
        log: [new log(owner.userData.Login._login, 'created an auction')]
    })
    const result = await newAuction.save()
    res.status(200).send( JSON.stringify( result ) )
})

router.put('/like', async (req, res) => {
    if (await mongoUser.findById(req.body.owner).exec() && !await mongoFreshAuction.findById(req.body.owner).exec().like.includes(req.body.liker))
    {
        const result = await mongoFreshAuction.findOneAndUpdate({owner: req.body.owner}, { $push: { like: req.body.liker } }, (err) => {
            if (err) res.sendStatus(500)
        })
        res.status(200).json( result )
    } else res.sendStatus(500)
})

router.put('/step', async (req, res) => {
    const data = req.body
    const user = User.toUser(await mongoUser.findById(data.owner).exec())
    const result = await mongoFreshAuction.findOneAndUpdate({owner: data.owner}, 
        { $inc: {
            currentPrice: data.step,
            currentPriceForStep: data.step / 10
        }, $push: {
            log: new log(user.Login.login, 'has buy step for lot')
        }}, err => {
        if (err) res.sendStatus(500)
    })
    res.status(200).json(result)
})

router.put('/status', async (req, res) => {
    const result = await mongoFreshAuction.findOneAndUpdate({owner: req.body.owner}, {$set: {status: req.body.status}}, err => {
        if (err) res.sendStatus(500)
    })
    res.status(200).json(result)
})

router.put('/participants', async (req, res) => {
    const result = await mongoFreshAuction.findOneAndUpdate({owner: req.body.owner}, {$push: {participants: req.body.participant}}, err => {
        res.sendStatus(500)
    })
    res.status(200).json(result)
})

router.get('/load/:aid/:fid', async (req, res) => {
    const resAuction = await mongoFreshAuction.findById(req.params.aid)
    console.log(resAuction.images[req.params.fid])
    res.sendFile(resAuction.images[req.params.fid])
})

function delBadFile(fileName) {
  fs.unlinkSync(tmpDir + '/' + fileName)
}

module.exports = router