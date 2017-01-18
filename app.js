'use strict';
let http = require('http');
let express = require('express');
let app = exports.app = express();
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let morgan = require ('morgan');
let router = require('./src/api');
const ENV = require('./config/env')

//use method of express to acess all static files in the public folder
app.use(express.static(__dirname + '/public'));

app.use(morgan('combined'));

//use method of express requiring body-parser json method
app.use(bodyParser.urlencoded({
    'extended': 'true'
}))
app.use(bodyParser.json())
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}))

app.use(methodOverride('X-HTTP-Method-Override'))

// Connexion à mongodb via mongoose
let mongoose = require('mongoose')
    //mongoose.connect('mongodb://localhost:27017/tictactoe');
mongoose.connect(ENV.db)

// Logg les erreurs
app.use((error, request, response, next) => {
    // Middleware to catch all errors
    console.error(error.stack)
    response.status(500).send(error.message)
})


exports.startServer = (port, path, callback) => {
    // Create server
    let server = http.Server(app);

    app.use('/api', router());

    // Listening
    port = process.env.PORT || port
    server.listen(port, callback)


    console.log(`server listening on port ${port}`)

    //Intercept when application killed
    process.on('SIGINT', function() {
        console.log("\nStopping...")
        process.exit()
    });
  }
