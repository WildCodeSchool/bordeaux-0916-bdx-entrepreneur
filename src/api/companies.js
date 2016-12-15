'use strict'
//All the get, contact, put/create Restfull/crud methods.


// Contact Model of Mongoose requiring the company.js file from src/models



// Contact Model of Mongoose requiring the company.js file from src/models

let Company = require('../models/company');


module.exports = (router) => {
    //mounting router method to get crud restFull api
    router.get('/companies', function(req, res) {
      //add req.query for filter request
        Company.find(req.query, function(err, companies) {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }
            res.json(companies);
        });
    });

    //get contact by id
    router.get('/companies/:id', function(req, res) {
        Company.findById(req.params.id, function(err, company) {
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

    //TODO: Add PUT route to update existng entries

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

    //TODO: Add DELETE route to create new entries
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
}
