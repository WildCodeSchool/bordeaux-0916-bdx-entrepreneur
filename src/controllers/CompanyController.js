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
        this.cofondateurs = []
        this.fondateurId;

        let create = (membre) => {
            USER.create(membre, (err, user) => {
                console.log(user);
                if (err) next(err)
                else
                    user.fondateur === true ? this.fondateurId = user._id : this.cofondateurs.push(user)
            })
        }

        this.model.create(req.body.company, (err, document) => {
            if (err) next(err)
            else {
                this.companyId = document._id
                if (req.body.fondateur || req.body.cofond || req.body.cofondbis) {
                    if (req.body.fondateur) {
                        req.body.fondateur.company = this.companyId
                        req.body.fondateur.fondateur = true
                        create(req.body.fondateur)
                    }
                    if (req.body.cofond) {
                        req.body.cofond.company = this.companyId
                        create(req.body.cofond)
                    }
                    if (req.body.cofondbis) {
                        req.body.cofondbis.company = this.companyId
                        create(req.body.cofondbis)
                    }

                }

                this.model.findById(this.companyId, (err, company) => {
                    company.fondateur.push(this.fondateurId)
                    company.cofond.push(this.cofondateurs)
                    company.save()
                    this.cofondateurs = null
                    this.fondateurId = null
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
