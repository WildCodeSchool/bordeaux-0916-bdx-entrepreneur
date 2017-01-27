'use strict'
let jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    salt = bcrypt.genSaltSync(10),
    Controller = require('./Controller'),
    generator = require('generate-password'),
    sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
let password = generator.generate({
    length: 10,
    numbers: true
});
const USER = require('../models/user')
const ENV = require('../../config/env')

let helper = require('sendgrid').mail,
    from_email = new helper.Email("poloc1722@hotmail.fr"),
    subject = "Nouveau mot de pass";

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

    findById(req, res, next) {
        this.model.findById(req.params.id).populate('company.company').exec((err, user) => {
            res.json(user)
        })
    }

    findOne(req, res, next) {
        let to_email = new helper.Email(`${req.params.email}`)
        this.model.findOneAndUpdate({
            'email': req.params.email
        }, {
            $set: {
                'password': password
            }
        }, (err, user) => {
            if (err) next(err)
            else if (!user) {
                res.sendStatus(404)
            }
            else {
                let content = new helper.Content("text/plain", `Bonjour ${user.firstname}, \n Suite à votre demande de renouvellement de mot de passe, votre nouveau mot de passe est ${password} \n\n Connectez vous avec celui-ci puis pensez à le changer dans votre espace profile. \n\n Sincèrement,\n\nBordeaux Entrepreneurs`)
                let mail = new helper.Mail(from_email, subject, to_email, content);
                let request = sg.emptyRequest({
                    method: 'POST',
                    path: '/v3/mail/send',
                    body: mail.toJSON()
                });
                sg.API(request, function(error, response) {
                    console.log(response.statusCode)
                    console.log(response.body)
                    console.log(response.headers)
                })
                res.json(user)
            }

        })
    }

}

module.exports = UsersController
