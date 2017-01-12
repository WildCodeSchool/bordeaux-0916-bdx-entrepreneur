'use strict'
let EventsController = require('../controllers/Eventscontroller')

module.exports = (app) => {
    // Create new controller
    let ctrl = new EventsController();

    app.get('/events', (req, res, next) => {
        return ctrl.find(req, res, next)
    })

    app.get('/events/:id', (req, res, next) => {
        return ctrl.findById(req, res, next)
    })

    app.post('/events', (req, res, next) => {
        return ctrl.create(req, res, next)
    })

    app.put('/events/:id', (req, res, next) => {
        return ctrl.update(req, res, next)
    })

    app.delete('/events/:id', (req, res, next) => {
      return ctrl.delete(req, res, next)
    })

}
