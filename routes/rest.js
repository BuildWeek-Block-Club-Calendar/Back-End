const express = require('express')

const router = express.Router()

const Events = require('../models/events')
const Users = require('../models/users')

router.post('/events/create', (req, res) => {
    const { eventTitle, eventCreator, eventAddress, eventCity, eventCountry, latitude, longitude, eventDescription, eventStart, eventEnd, externalLink, photo } = req.body
    if (eventTitle && eventCreator && eventAddress && eventCity && eventCountry && eventDescription && eventStart && eventEnd) {
        const newEvent = new Events({
            eventTitle: eventTitle,
            eventCreator: eventCreator,
            eventAddress: eventAddress,
            eventCity: eventCity,
            eventCountry: eventCountry,
            eventDescription: eventDescription,
            eventStart: eventStart,
            eventEnd: eventEnd,
            // add PHOTO here,
            latitude: latitude,
            longitude: longitude,
            externalLink: externalLink
        })
        newEvent.save()
        .then(event => {
            res.status(201).json(event)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    else {
        res.status(400).json({ message: 'please provide all required fields' })
    }
})

router.post('/events/near', (req, res) => {
    const { country } = req.body
    if (country) {
        Events.find({ eventCountry })
        .then(events => {
            res.status(200).json(events)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    else {
        res.status(400).json({ message: 'please specify a country in the body '})
    }
})

router.get('/events/:id', (req, res) => {
    Events.findById({ _id: req.params.id })
    .then(event => {
        res.status(200).json(event)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.put('/events/:id', (req, res) => {
    const { eventTitle, eventCreator, eventAddress, eventCity, eventCountry, latitude, longitude, eventDescription, eventStart, eventEnd, externalLink, photo } = req.body
    Events.findByIdAndUpdate({ _id: req.params.id }, {
        eventTitle: eventTitle,
        eventCreator: eventCreator,
        eventAddress: eventAddress,
        eventCity: eventCity,
        eventCountry: eventCountry,
        eventDescription: eventDescription,
        eventStart: eventStart,
        eventEnd: eventEnd,
        // add PHOTO here,
        latitude: latitude,
        longitude: longitude,
        externalLink: externalLink
    }, { new: true }).then(event => {
        res.status(200).json(event)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.delete('/events/:id', (req, res) => {
    Events.findOneAndRemove({ _id: req.params.id})
    .then(dunno => {
        res.status(200).json(dunno)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.get('/events/attend/:id', (req, res) => {

})

module.exports = router