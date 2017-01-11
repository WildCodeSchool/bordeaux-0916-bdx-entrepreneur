'use strict'

let User = require('../models/user');
let Company = require('../models/company');

module.exports = (router) => {
    router.get('/users', function(req, res) {
        User.find({}, function(err, users) {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }
            res.json(users);
        });
    });

    //get post by id
    router.get('/users/:id', function(req, res) {
        User.findById(req.params.id, function(err, user) {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }
            res.json(user);
        });
    });

    router.post('/user', function(req, res) {
        //on créer notre user
        User.create(req.body, function(err, user) {
            if (err) {
                res.sendStatus(500)
            } else {
                //on cherche le company liée au user avec la value indiqué dans le corp (req.body.companyId)
                Company.findById(req.body.company, function(err, company) {
                    if (err && !company) {
                        res.sendStatus(500)
                    } else {
                        company.users.push(user._id)
                        company.save() // MANDATORY !!
                            //retourne le user créé
                        res.json(user)
                    }
                })
            }
        })


    })
    router.put('/users/:id', function(req, res) {
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
        User.findByIdAndUpdate(id, req.body, {
            new: true
        }, function(err, user) {
            if (err) {
                return res.status(500).json({
                    err: err.message
                });
            }
            res.json(user);
        });
    });

}
