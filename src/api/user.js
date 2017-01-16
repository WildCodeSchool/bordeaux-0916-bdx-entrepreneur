'use strict'
let UsersController = require('../controllers/UsersController')

module.exports = (app) => {
    // Create new controller
    let ctrl = new UsersController();

    app.get('/user', (req, res, next) => {
        return ctrl.find(req, res, next)
    })

    app.get('/user/:id', (req, res, next) => {
        return ctrl.findById(req, res, next)
    })

    app.post('/user', (req, res, next) => {
        return ctrl.create(req, res, next)
    })

    app.put('/user/:id', (req, res, next) => {
        return ctrl.update(req, res, next)
    })

    app.delete('/user/:id', (req, res, next) => {
      return ctrl.delete(req, res, next)
    })

}
