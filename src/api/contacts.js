'use strict'
//All the get, contact, put/create Restfull/crud methods.


// Contact Model of Mongoose requiring the member.js file from src/models



// Contact Model of Mongoose requiring the member.js file from src/models

let Contact = require('../models/member');


module.exports = (router) => {
    //mounting router method to get crud restFull api
    router.get('/contacts', function(req, res) {
        Contact.find({}, function(err, contacts) {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }
            res.json(contacts);
        });
    });

    //get contact by id
    router.get('/contacts/:id', function(req, res) {
        Contact.findById(req.params.id, function(err, contact) {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }
            res.json(contact);
        });
    });

    //contact method with router prefix
    router.post('/contacts/', function(req, res) {
        let contact = req.body;

        // contact data to database using the Contact model

        Contact.create(Contact, function(err, contact) {

            if (err) {
                return res.status(500).json({
                    err: err.message
                });
            }
            res.json({
                'contact': contact,

                message: 'Contact Created'

            });
        });
    });

    //TODO: Add PUT route to update existng entries

    // add :id params at end of /contacts route.
    router.put('/contacts/:id', function(req, res) {
        //id variable assigned request.parameters.identification of express modeule
        let id = req.params.id;
        // contact variable is locally assigned the requested body
        let contact = req.body;
        //
        if (contact && contact._id !== id) {
            return res.status(500).json({
                err: 'Ids do not match!'
            })
        }
        //contact model of mongoose finds id and update.
        Contact.findByIdAndUpdate(id, contact, {
            new: true
        }, function(err, contact) {
            if (err) {
                return res.status(500).json({
                    err: err.message
                });
            }
            res.json({
                'contact': contact,
                message: 'Contact Updated'
            });
        });
    });

    //TODO: Add DELETE route to create new entries
    router.delete('/contacts/:id', function(req, res) {
        Contact.findByIdAndRemove(req.params.id, function(err) {
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
