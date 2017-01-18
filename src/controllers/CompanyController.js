'use strict'
let Controller = require('./Controller');
const COMPANY = require('../models/company')

class CompanyController extends Controller {

    constructor() {
        // Call parent constructor with model param
        super(COMPANY);
    }
    find(req, res, next) {
        this.model.find(req.query).populate('users').exec((err, documents) => {
            res.json(documents)
        })
    }

}

module.exports = CompanyController
