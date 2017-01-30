'use strict'
let Controller = require('./Controller'),
    formidable = require('formidable'),
    fs = require('fs'),
    path = require('path'),
    sg = require('../middlewares/sendgrid'),
    generator = require('generate-password');
let password = generator.generate({
    length: 10,
    numbers: true
});
const COMPANY = require('../models/company')
const USER = require('../models/user')


class CompanyController extends Controller {
    constructor() {
        super(COMPANY);
    }

    upload(req, res, next) {
        // parse a file upload
        let form = new formidable.IncomingForm();

        form.uploadDir = './public/img/'

        if (!fs.existsSync(form.uploadDir)) fs.mkdirSync(form.uploadDir)

        form.on('file', (field, file) => {
                fs.rename(file.path, form.uploadDir + file.name)
            })
            .on('end', () => {
                console.log("uploaded")
                res.sendStatus(200)
            })

        form.parse(req)
    }

    create(req, res, next) {
        this.companyId;
        let contacts = req.body.contacts

        this.model.create(req.body.company, (err, document) => {
            if (err) next(err)
            else {
                this.companyId = document._id
                if (contacts) {
                    Promise.all(contacts.map((contact) => {
                        return new Promise((resolve, reject) => {
                            USER.findOne({
                                email: contact.email
                            }, (err, user) => {
                                if (err) reject(err)
                                if (user) {
                                    user.company.push({
                                        company: this.companyId,
                                        role: contact.fondateur ? 'Fondateur' : 'Other'
                                    })
                                    user.save()
                                    resolve(user)
                                } else if (!user) {
                                    contact.company = [{
                                        company: this.companyId,
                                        role: contact.fondateur ? 'Fondateur' : 'Other'
                                    }]
                                    contact.password = password
                                    USER.create(contact, (err, user) => {
                                        if (err) reject(err)
                                        else {
                                            user.New = true
                                            sg.sendgrid.emailIt(user)
                                            resolve(user)
                                        }
                                    })
                                }

                            })

                        })
                    })).then((users) => {
                        this.model.findById(this.companyId, (err, company) => {
                            company.contacts = company.contacts.concat(users)
                            company.save()
                        })
                    })
                }

            }
        })
    }

    update(req, res, next) {

        let updateCompany = (company) => {
            this.model.update({
                _id: company._id
            }, company, (err, document) => {
                if (err) next(err)
                else res.sendStatus(200)
            })
        }

        if (req.body.newContacts) {
            Promise.all(req.body.newContacts.map((contact) => {
                return new Promise((resolve, reject) => {
                    contact.company = [{
                        company: req.body._id,
                        role: contact.fondateur ? 'Fondateur' : 'Other'
                    }]

                    USER.create(contact, (err, user) => {
                        if (err) reject(err)
                        else {
                            resolve(user)
                        }
                    })
                })
            })).then((users) => {
                req.body.contacts = req.body.contacts.concat(users)
                delete req.body.newContacts
                updateCompany(req.body)
            })
        } else {
            updateCompany(req.body)
        }


    }

    findOne(req, res, next) {
        let search = new RegExp("(" + req.params.recherche + ")", "igm")
        this.model.find({
            $or: [{
                'name': search
            }, {
                'secteur': search
            }, {
                'tags': search
            }]
        }, (err, companies) => {
            if (err) next(err)
            else
                res.json(companies)
        });
    }


    findById(req, res, next) {
        this.model.findById(req.params.id).populate('contacts').exec((err, documents) => {
            res.json(documents)
        })
    }

}
module.exports = CompanyController
