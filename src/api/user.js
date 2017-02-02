'use strict'
let UsersController = require('../controllers/UsersController')
let sg = require('../middlewares/sendgrid')
let auth = require('../middlewares/authorization')

module.exports = (app) => {
    // Create new controller
    let usersCtrl = new UsersController();

    app.get('/users', auth.user.isAuthenticate, (req, res, next) => {
        return usersCtrl.find(req, res, next)
    })

    app.get('/users/:id', auth.user.isAuthenticate, (req, res, next) => {
        return usersCtrl.findById(req, res, next)
    })

    app.get('/activeusers', auth.user.isAuthenticate, (req, res, next) => {
        return usersCtrl.findActive(req, res, next)
    })

    app.get('/users/:email/reset_password', auth.user.isAuthenticate, (req, res, next) => {
        return usersCtrl.resetPassword(req, res, next)
    })

    app.post('/users', auth.user.isAuthenticate, (req, res, next) => {
        return usersCtrl.create(req, res, next)
    })

    //send email
    app.post('/message/send', auth.user.isAuthenticate, (req, res, next) => {
        return usersCtrl.emailAll(req, res, next)
    })

    //  Auth
    app.post('/admin', usersCtrl.connect)

    app.put('/users/:id', auth.user.isAuthenticate, (req, res, next) => {
        return usersCtrl.update(req, res, next)
    })

    app.delete('/users/:id', auth.user.isAuthenticate, (req, res, next) => {
        return usersCtrl.delete(req, res, next)
    })

}
