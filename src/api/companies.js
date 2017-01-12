/*'use strict'
//All the get, contact, put/create Restfull/crud methods.
// Contact Model of Mongoose requiring the company.js file from src/models
let CompanyController = require('../controllers/CompanyController')

let Company = require('../models/company');

module.exports = (router) => {

router.get('/companies', function(req, res) {
        Company.find({}).populate('users').exec(function(err, companies) {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }
            res.json(companies);
        });
      });
      //get company by id
    router.get('/companies/:id', function(req, res) {
        Company.findById(req.params.id).populate('users').exec(function(err, company) {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }
            res.json(company);
        });
    });

    //contact method with router prefix
    router.post('/companies', function(req, res) {

        // contact data to database using the Contact model

        Company.create(req.body, function(err, company) {

            if (err) {
                return res.status(500).json({
                    err: err.message
                });
            }
            res.json(company);
        });
    });



    // add :id params at end of /contacts route.
    router.put('/companies/:id', function(req, res) {
        //id variable assigned request.parameters.identification of express modeule
        let id = req.params.id;
        // contact variable is locally assigned the requested body
        //
        if (req.body._id !== id) {
            return res.status(500).json({
                err: 'Ids do not match!'
            })
        }
        //contact model of mongoose finds id and update.
        Company.findByIdAndUpdate(id, req.body, {
            new: true
        }, function(err, company) {
            if (err) {
                return res.status(500).json({
                    err: err.message
                });
            }
            res.json(company);
        });
    });

    router.delete('/companies/:id', function(req, res) {
        Company.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.status(500).json({
                    err: err.message
                });
            } else {
                res.sendStatus(200);
            }
        })
    })
}*/
let CompanyController = require('../controllers/CompanyController')

module.exports = (app) => {
    // Create new controller
    let ctrl = new CompanyController();

    app.get('/companies', (req, res, next) => {
        return ctrl.find(req, res, next)
    })

    app.get('/companies/:id', (req, res, next) => {
        return ctrl.findById(req, res, next)
    })

    app.post('/companies', (req, res, next) => {
        return ctrl.create(req, res, next)
    })

    app.put('/companies/:id', (req, res, next) => {
        return ctrl.update(req, res, next)
    });

    app.delete('/companies/:id', (req, res, next) => {
        return ctrl.delete(req, res, next)
    })
}
