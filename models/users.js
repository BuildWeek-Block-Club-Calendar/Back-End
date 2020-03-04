const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    businessName: {
        type: String,
        required: false
    },
    events: {
        type: Array,
        require: false
    },
    photo: {
        data: Buffer,
        contentType: String,
        required: false
    },                                                       
    latitude: {
        type: String,
        required: false
    },
    longitude: {
        type: String,
        required: false
    }
})

const Users = mongoose.model('users', userSchema)

module.exports = Users