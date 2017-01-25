'use strict'
let Controller = require('./Controller'),
    formidable = require('formidable'),
    fs = require('fs'),
    path = require('path');
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
        this.contacts = []
        let contacts = req.body.contacts
        let create = (membre) => {
            if (membre.fondateur) membre.role = 'Fondateur'
            USER.create(membre, (err, user) => {
                if (err) next(err)
                else
                    this.contacts.push(user)
            })
        }

        this.model.create(req.body.company, (err, document) => {
            if (err) next(err)
            else {
                this.companyId = document._id
                if (contacts) {
                    contacts.forEach((contact) => {
                        contact.company = this.companyId
                        create(contact)
                    })

                }

                this.model.findById(this.companyId, (err, company) => {
                    company.contacts = this.contacts
                    company.save()
                })
            }
        })
    }


    findOne(req, res, next) {
        let search = new RegExp("(" + req.params.recherche + ")", "igm")
        this.model.find({
            $or: [{
                'name': search
            }, {
                'secteur': search
            }]
        }, (err, companies) => {
            if (err) next(err)
            else
                res.json(companies)
        });
    }

    findTags(req, res, next) {
        let tags = new RegExp("(" + req.params.tags + ")", "igm")
        this.model.find({
            'tags': tags
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
