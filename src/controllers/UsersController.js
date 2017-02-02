'use strict'
let jwt = require('jsonwebtoken'),
    Controller = require('./Controller'),
    generator = require('generate-password'),
    sg = require('../middlewares/sendgrid'),
    bcrypt = require('bcrypt');

const USER = require('../models/user')
const COMPANY = require('../models/company')
const ENV = require('../../config/env')


class UsersController extends Controller {

    constructor() {
        super(USER)

    }

    create(req, res, next) {
        let password = generator.generate({
            length: 10,
            numbers: true
        });
        req.body.password = bcrypt.hashSync(req.body.password || password , 10)
        this.model.create(req.body, (err, document) => {
            if (err) next(err)
            else {
                delete document.password
                res.json(document)
            }
        })
    }


    connect(req, res, next) {
        if (!req.body.email || !req.body.password) {
            res.status(400).send("Veuillez saisir votre email et votre mot de passe")
        } else {
            USER.findOne({
                email: req.body.email
            }, (err, user) => {
                if (err)
                    next(err)
                else if (!user)
                    res.status(404).send("Utilisateur non trouvé")
                else if (!bcrypt.compareSync(req.body.password, user.password))
                    res.status(403).send("Le mot de passe ne correspond pas")
                else if (!user.active)
                    res.status(401).send("Votre compte a été désactivé, veuillez contacter un administrateur")
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
        if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 10)
        if (req.body.newCompany) {
            this.updateCompany(req.body).then((companies) => {
                this.model.findById(req.params.id, (err, user) => {
                    user.company = user.company.concat(companies.map((e) => {
                        return {
                            company: e._id
                        }
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
                'password': bcrypt.hashSync(password, 10)
            }
        }, (err, user) => {
            if (err) next(err)
            else if (!user) {
                // Renvoyer un message à l'utilisateur pour lui dire que son mail est incorrect
                res.status(404).send("Utilisateur non trouvé")
            } else {
                user.password = password
                sg.sendgrid.emailIt(user)
                res.sendStatus(200)
            }

        })
    }

    findActive(req, res, next) {
        this.model.find({
            'active': true
        }, (err, users) => {
            if (err) next(err)
            else
                res.json(users)
        })
    }

    emailAll(req, res, next) {
        this.model.find({
            'active': true
        }, (err, users) => {
            if (err) next(err)
            else {
                let message = {
                    subject: req.body.subject,
                    content: req.body.content,
                    to: users
                }
                sg.sendgrid.emailAll(message, res)
            }
        })
    }

}

module.exports = UsersController
