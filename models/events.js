const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
    eventTitle: {
        type: String,
        required: true
    },
    eventCreator: {
        type: String,
        required: true
    },
    eventAddress: {
        type: String,
        required: true
    },
    geolocation: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    eventStart: {
        type: String,
        required: true
    },
    eventEnd: {
        type: String,
        required: true
    },
    externalLink: {
        type: String,
        required: false
    },
    photo: {
        data: Buffer,
        contentType: String,
        required: false
    }                                                                  
})

const Events = mongoose.model('events', eventSchema)

module.exports = Events