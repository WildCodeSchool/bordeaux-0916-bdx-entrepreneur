'use strict'
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt');
let Controller = require('./Controller')
const USER = require('../models/user')
const ENV = require('../../config/env')
let salt = bcrypt.genSaltSync(10);

class UsersController extends Controller {

    constructor() {
        super(USER)

    }

    create(req, res, next) {
        // Create a password salt
        // Salt and hash password
        let newPassword = bcrypt.hashSync(req.body.password, salt)
        req.body.password = newPassword
        this.model.create(req.body, (err, document) => {
            if (err) next(err)
            else {
                delete document.password
                res.json(document)
            }
        })
    }


    connect(req, res, next) {
        let newPassword = bcrypt.hashSync(req.body.password, salt)
        req.body.password = newPassword
        if (!req.body.email || !req.body.password) {
            res.status(400).send("Please enter your email and password")
        } else {
            USER.findOne({
                email: req.body.email
            }, (err, user) => {
                if (err)
                    next(err)
                else if (!user)
                    res.status(403).send("User not found")
                else {                  
                    let token = jwt.sign(user, ENV.token, {
                        expiresIn: "24h"
                    })

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        user: user,
                        token: token
                    });
                }
            });
        }
    }


    find(req, res, next) {
        this.model.find({
            password: 0
        }).populate('company').exec((err, users) => {
            res.json(users)
        })
    }

}

module.exports = UsersController
