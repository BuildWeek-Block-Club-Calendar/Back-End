const express = require('express')
//const mongoose = require('mongoose')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const router = express.Router()

const Users = require('../models/users')

router.post('/register', (req, res) => {
    const { email, password, username, streetAddress, city, country, businessName, latitude, longitude } = req.body
    Users.findOne({email})
    .then(async user => {
        if (user) {
            res.status(400).json({
                message: 'email exists'
            })
        }
        else {
            try {
                const hashedPass = await argon2.hash(password)
                const newUser = new Users({
                    email: email,
                    username: username,
                    password: hashedPass,
                    streetAddress: streetAddress,
                    city: city,
                    country: country,
                    businessName: businessName,
                    latitude: latitude,
                    longitude: longitude
                })
                newUser.save()
                .then(user => {
                    res.status(201).json(user)
                })
                .catch(err => {
                    console.log(err)
                })
            }
            catch (err) {
                console.log(err)
            }
            
        }
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    Users.findOne({email})
    .then(async user => {
        if (!user) {
            res.status(404).json({
                message: 'User not found'
            })
        }
        else {
            try {
                if (await argon2.verify(user.password, password)) {
                    const token = generateToken(user)
                    res.status(200).json({
                        message: `Welcome, ${user.email}`,
                        user: user,
                        token // may need to be token: token
                    })
                }
                else {
                    res.status(401).json({
                        message: 'Invalid credentials'
                    })
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    })
    .catch(err => {
        console.log(err)
    })
})

function generateToken(user) {
    const payload = {
        email: user.email
    }
    const secret = process.env.SECRET || 'not so secret now...'

    const options = {
        expiresIn: '24h'
    }

    return jwt.sign(payload, secret, options)
}

module.exports = router