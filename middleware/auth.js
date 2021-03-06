const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    const secret = process.env.SECRET || 'not so secret now...'
    if (authorization) {
        jwt.verify(authorization, secret, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'invalid credentials' })
            }
            else {
                req.decoded = decoded
                next()
            }
        })
    }
    else {
        res.status(401).json({ message: 'auth header not provided' })
    }
}