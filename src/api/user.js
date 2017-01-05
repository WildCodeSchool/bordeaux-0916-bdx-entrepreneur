'use strict'

let User = require('../models/user');
let Company = require('../models/company');

module.exports = (router) => {

    router.post('/user', function(req, res) {
      //on créer notre user
        User.create(req.body, function(err, user) {
            if (err) {
                res.sendStatus(500)
            } else {
                //on cherche le company liée au user avec la value indiqué dans le corp (req.body.companyId)
              Company.findById(req.body.company, function(err, company){
                  if (err && !company) {
                      res.sendStatus(500)
                    }else {
                      company.users.push(user._id)
                      company.save() // MANDATORY !!
                      //retourne le user créé
                      res.json(user)
                    }
                })
            }
        })


    })

}
