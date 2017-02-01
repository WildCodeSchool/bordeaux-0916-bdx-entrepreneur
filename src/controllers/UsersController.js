'use strict'
let jwt = require('jsonwebtoken'),
    Controller = require('./Controller'),
    generator = require('generate-password'),
    sg = require('../middlewares/sendgrid'),
    bcrypt = require('../middlewares/bcrypt');

let password = generator.generate({
    length: 10,
    numbers: true
});

const USER = require('../models/user')
const COMPANY = require('../models/company')
const ENV = require('../../config/env')


class UsersController extends Controller {

    constructor() {
        super(USER)

    }

    create(req, res, next) {
        req.body.password = bcrypt.password.cryptIt(req.body.password)
        this.model.create(req.body, (err, document) => {
            if (err) next(err)
            else {
                delete document.password
                res.json(document)
            }
        })
    }


    connect(req, res, next) {
        req.body.password = bcrypt.password.cryptIt(req.body.password)
        if (!req.body.email || !req.body.password) {
            res.status(400).send("Veuillez saisir votre email et votre mot de passe")
        } else {
            USER.findOne(req.body, '-password', (err, user) => {
                if (err)
                    next(err)
                else if (!user)
                    res.status(403).send("Utilisateur non trouvé")
                else if (!user.active)
                    res.status(403).send("Votre compte a été désactivé, veuillez contacter un administrateur")
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
        if (req.body.password) req.body.password = bcrypt.password.cryptIt(req.body.password)
        if (req.body.newCompany) {
            this.updateCompany(req.body).then((companies) => {
                this.model.findById(req.params.id, (err, user) => {
                    user.company = user.company.concat(companies.map((e) => {
                        return { company: e._id }
                    }))
                    user.save(err => console.log(err))
                    res.json(user)
                })
            })
        } else {
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
    }

    updateCompany(user) {
        return Promise.all(user.newCompany.map((usercompany) => {
            return new Promise((resolve, reject) => {
                COMPANY.findOne({
                    _id: usercompany.company
                }, (err, company) => {
                    if (err) reject(err)
                    company.contacts.push(user._id)
                    company.save()
                    resolve(company)
                })
            })
        }))
    }

    find(req, res, next) {
        this.model.find({}, '-password').populate('company.company').exec((err, users) => {
            res.json(users)
        })
    }

    findById(req, res, next) {
        this.model.findById(req.params.id, '-password').populate('company.company').exec((err, user) => {
            res.json(user)
        })
    }

    resetPassword(req, res, next) {
        this.model.findOneAndUpdate({
            'email': req.params.email
        }, {
            $set: {
                'password': bcrypt.password.cryptIt(password)
            }
        }, (err, user) => {
            if (err) next(err)
            else if (!user) {
                // Renvoyer un message à l'utilisateur pour lui dire que son mail est incorrect
                res.status(403).send("Utilisateur non trouvé")
            } else {
                user.password = password
                sg.sendgrid.emailIt(user)
                res.sendStatus(200)
            }

        })
    }

}

module.exports = UsersController
