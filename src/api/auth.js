'use strict'
let AuthenticationController = require('../controllers/AuthenticationController')
let UsersController = require('../controllers/UsersController')

module.exports = (app) => {

    let ctrl = new UsersController()
    let authentication = new AuthenticationController()

    app.post('/auth', authentication.local)
};
