/*
  Use this script at installation
*/
'use strict'
let mongoose = require('mongoose'),
    userModel = require('./src/models/user'),
    bcrypt = require('bcrypt');

const ENV = require('./config/env')

mongoose.connect(ENV.db, (err) => {
    if (err) {
        console.error(err.stack)
    } else {
      install()
    }
})

function install(){
  userModel.find({}, (err, users) => {
      if (!err) {
          if (users.length === 0) {
              userModel.create({
                  email: "admin@domain.ext",
                  password: bcrypt.hashSync('admin', 10),
                  isAdmin: true
              }, (err, user) => {
                  if (!err) {
                      console.log("User admin created !")
                  } else {
                      console.log(err)
                  }
                  mongoose.disconnect()
              })
          } else {
              console.log("User(s) existing")
              mongoose.disconnect()
          }
      } else {
          console.log(err)
          mongoose.disconnect()
      }
  })
}
