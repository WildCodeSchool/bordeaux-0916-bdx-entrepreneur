'use strict'

let User = require('../models/user');
let Member = require('../models/member');

module.exports = (router) => {

    router.post('/user', function(req, res) {
      //on créer notre user
        User.create(req.body, function(err, user) {
            if (err) {
                res.sendStatus(500)
            } else {
                //on cherche le member liée au user avec la value indiqué dans le corp (req.body.memberId)
              Member.findById(req.body.memberId, function(err, member){
                  if (err) {
                      res.sendStatus(500)
                    }else {
                      member.users.push(user._id)
                      member.save() // MANDATORY !!
                      //retourne le user créé
                      res.json(user)
                    }
                })
            }
        })


    })

}
