'use strict'
let Controller = require('./Controller');
const COMPANY = require('../models/company')
const USER = require('../models/user')


class CompanyController extends Controller {
    constructor() {
        super(COMPANY);
    }

    create(req, res, next) {
        this.cofondateurs = {}
        this.fondateurId;

        let create = (membre) => {
            USER.create(membre, (err, user) => {
                if (err) next(err)
                user.fondateur === true ? this.fondateurId = user._id : this.cofondateurs[user._id] = user
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
                })
            }
        })
    }


    find(req, res, next) {
        this.model.find(req.query).populate('fondateur').exec((err, documents) => {
            res.json(documents)
        })
    }

}
module.exports = CompanyController
