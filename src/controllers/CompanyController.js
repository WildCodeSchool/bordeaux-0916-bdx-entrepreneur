'use strict'
// Require parent class
let Controller = require('./Controller');
// Require model (schema) use with this controller
const COMPANY = require('../models/company')

class CompanyController extends Controller {

    constructor() {
      // Call parent constructor with model param
      super(COMPANY);
    }
    find(req, res, next) {
      // Get all documents and filter with queries string (req.query : ex. http://domain.ext/api/?query=string)
      this.model
      .find(req.query)
      .populate('users')
      .exec((err, documents) => {
          res.json(documents)
      })
  }

}

module.exports = CompanyController
