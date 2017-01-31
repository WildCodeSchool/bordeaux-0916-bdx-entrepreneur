'use strict'
let UsersController = require('../controllers/UsersController')
let sg = require('../middlewares/sendgrid')

module.exports = (app) => {
    // Create new controller
    let usersCtrl = new UsersController();

    app.get('/users', (req, res, next) => {
        return usersCtrl.find(req, res, next)
    })

    app.get('/users/:id', (req, res, next) => {
        return usersCtrl.findById(req, res, next)
    })

    app.get('/users/:email/reset_password', (req, res, next) => {
        return usersCtrl.resetPassword(req, res, next)
    })

    app.post('/users', (req, res, next) => {
        return usersCtrl.create(req, res, next)
    })

    //send email
    app.post('/message/send', (req, res, next) => {
        return sg.sendgrid.emailAll(req, res, next)
    })

    //  Auth
    app.post('/admin', usersCtrl.connect)

    app.put('/users/:id', (req, res, next) => {
        return usersCtrl.update(req, res, next)
    })

    app.delete('/users/:id', (req, res, next) => {
        return usersCtrl.delete(req, res, next)
    })

}
