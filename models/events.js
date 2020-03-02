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
    eventCity: {
        type: String,
        required: true
    },
    eventCountry: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: false
    },
    longitude: {
        type: String,
        required: false
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
    },
    rsvpd: {
        type: Array,
        required: false
    }                                                                 
})

const Events = mongoose.model('events', eventSchema)

module.exports = Events