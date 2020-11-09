const express = require('express')
const router = express.Router()

const fs = require('fs')
const multer = require('multer')
const upload = multer({dest: 'tmp/'})
const tmpDir = __dirname + 'tmp/'
const uploadDir = __dirname + 'public/uploads'

const mongoFreshAuction = require('../models/FreshAuctions.js').mongoFreshAuction
const mongoUser = require('../models/Users.js').mongoUser
const log = require('../objects/log.js')

router.get('/', async (req, res) => {
    const result = await mongoFreshAuction.find().exec()
    res.status(200).send( JSON.stringify(result) )
})

router.post('/', upload.array('images', 15), async (req, res) => {
    const files = req.images
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
            fs.renameSync(tmpDir + '/' + file.filename, uploadDir + '/' + data.owner + index++)
            images.push(data.owner + index - 1)
            res.status(200).json({
                type: 'success',
                message: 'Изображения загружено',
                path: '/uploads/' + data.owner + index - 1
            })
        } else {
            delBadFile(file.filename)
            res.status(500).json({
                type: 'error',
                message: 'недопустимый формат изображения'
            })
        }
    })
    
    const newAuction = new mongoFreshAuction({
        title: data.title,
        description: data.description,
        objectName: data.objectName,
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
        status: 'created',
        log: [new log(await mongoUser.findById(data.owner).exec().Login.login, 'created an auction')]
    })
    const result = await newAuction.save()
    res.status(200).send( JSON.stringify( result ) )
})

router.put('/like', async (req, res) => {
    if (await mongoUser.findById(req.body.owner).exec() && !await mongoFreshAuction.findById(req.body.owner).exec().like.includes(req.body.liker))
    {
        const result = await mongoFreshAuction.findByIdAndUpdate(req.body.owner, { $push: { like: req.body.liker } }, (err) => {
            if (err) res.sendStatus(500)
        })
        res.status(200).json( result )
    } else res.sendStatus(500)
})

module.exports = router