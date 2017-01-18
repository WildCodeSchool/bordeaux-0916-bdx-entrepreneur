let CompanyController = require('../controllers/CompanyController')
let auth = require('../middlewares/authorization')

module.exports = (app) => {
    // Create new controller
    let ctrl = new CompanyController();

    app.get('/companies', (req, res, next) => {
        return ctrl.find(req, res, next)
    })

    app.get('/companies/:id', (req, res, next) => {
        return ctrl.findById(req, res, next)
    })

    app.post('/companies', (req, res, next) => {
        return ctrl.create(req, res, next)
    })

    app.put('/companies/:id', (req, res, next) => {
        return ctrl.update(req, res, next)
    });

    app.delete('/companies/:id', (req, res, next) => {
        return ctrl.delete(req, res, next)
    })
}
