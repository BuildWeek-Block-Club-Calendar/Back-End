const express = require('express')

const router = express.Router()

const Events = require('../models/events')
const Users = require('../models/users')

router.post('/events', (req, res) => {
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

router.get('/events', (req, res) => {
    Events.find()
    .then(events => {
        res.status(200).json(events)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.post('/events/near', (req, res) => {
    const { eventCountry } = req.body
    if (eventCountry) {
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
        let usernames = []
        event.rsvpd.forEach(rsvp => {
            Users.findById({ _id: rsvp._id })
            .then(user => {
                usernames.push(user.username)
            })
            .catch(err => {
                res.status(500).json(err)
            })
        })
        event.users = usernames
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

router.post('/events/attend/:id', (req, res) => {
    const { _id } = req.body
    Users.findById({ _id: _id })
    .then(initalUser => {
        Events.findByIdAndUpdate({ _id: req.params.id }, {
            $push: {
                users: _id,
                rsvpd: initalUser.username
            }
        }, { new: true })
        .then(event => {
            Users.findByIdAndUpdate({ _id: _id }, {
                $push: {
                    events: req.params.id
                }
            }, { new: true })
            .then(user => {
                res.status(200).json(event)
            })
            .catch(err => {
                res.status(500).json(err)
            })
            
        })
        .catch(err => {
            res.status(500).json
        })
    })
    
})

router.put('/user/:id', (req, res) => {
    const { email, username, password, streetAddress, city, country, businessName, photo, latitude, longitude } = req.body
    Users.findByIdAndUpdate({ _id: req.params.id }, {
        email: email,
        username: username,
        password: password,
        streetAddress: streetAddress,
        city: city,
        country: country,
        businessName: businessName,
        latitude: latitude,
        longitude: longitude
    }, { new: true }).then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.get('/user/:id', (req, res) => {
    Users.findById(req.params.id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


module.exports = router