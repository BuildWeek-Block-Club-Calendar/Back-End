const express = require('express')

const router = express.Router()

const Events = require('../models/events')

router.get('/', (req, res) => {
    Events.find()
    .then(events => {
        res.status(200).json(events)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router