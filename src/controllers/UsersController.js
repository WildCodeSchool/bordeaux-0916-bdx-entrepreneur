'use strict'
let jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    salt = bcrypt.genSaltSync(10),
    Controller = require('./Controller'),
    generator = require('generate-password'),
    sg = require('../middlewares/sendgrid');
let password = generator.generate({
    length: 10,
    numbers: true
});
const USER = require('../models/user')
const ENV = require('../../config/env')


class UsersController extends Controller {

    constructor() {
        super(USER)

    }

    create(req, res, next) {
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
            }, {
                password: 0
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

    update(req, res, next) {
        if (req.body.password) {
            let newPassword = bcrypt.hashSync(req.body.password, salt)
            req.body.password = newPassword
        }
        this.model.update({
            _id: req.params.id
        }, req.body, (err, document) => {
            if (err) {
                next(err)
            } else {
                res.sendStatus(200)
            }
        })
    }


    find(req, res, next) {
        this.model.find().populate('company.company').exec((err, users) => {
            res.json(users)
        })
    }

    findOne(req, res, next) {
        this.model.findOneAndUpdate({
            'email': req.params.email
        }, {
            $set: {
                'password': password
            }
        }, (err, user) => {
            if (err) next(err)
            else if (!user) {
                // Renvoyer un message à l'utilisateur pour lui dire que son mail est incorrect
                res.sendStatus(404)
            } else {

                sg.sendgrid.emailIt(user)
                res.json(user)
            }

        })
    }

}

module.exports = UsersController
