'use strict'
let jwt = require('jsonwebtoken')
const ENV = require('../../config/env')

exports.user = {

    isAuthenticate(req, res, next) {
        if (req.headers.authorization || (req.headers.cookie && req.headers.cookie.indexOf('token=') > -1)) {
            let token = req.headers.authorization || req.headers.cookie.split('token=')[1]
            jwt.verify(token, ENV.token, (err, decoded) => {
                if (err)
                    return res.sendStatus(403)
                else
                    next()
            })
        } else {
            return res.sendStatus(403)
        }
    },

    isAdmin(req, res, next) {
        if (req.headers.authorization || (req.headers.cookie && req.headers.cookie.indexOf('token=') > -1)) {
            let token = req.headers.authorization || req.headers.cookie.split('token=')[1]
            jwt.verify(token, ENV.token, (err, decoded) => {
                if (err || !decoded._doc.isAdmin)
                    return res.sendStatus(403)
                else
                    next()
            })
        } else {
            return res.sendStatus(403)
        }
    },

    getDecoded(req) {
        return new Promise((resolve, reject) => {
            if (req.headers.authorization || (req.headers.cookie && req.headers.cookie.indexOf('token=') > -1)) {
                let token = req.headers.authorization || req.headers.cookie.split('token=')[1]
                jwt.verify(token, ENV.token, (err, decoded) => {
                    if (err)
                        reject()
                    else
                        resolve(decoded._doc)
                })
            } else {
                reject()
            }
        })
    }
}
