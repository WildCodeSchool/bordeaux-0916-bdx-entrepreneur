'use strict';

let http = require('http');
//require express
let express = require('express');
let app = express();
//require the body parser package
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
// router is now api moddule we required from index.js exports
let morgan = require ('morgan');
let router = require('./src/api/');

//mongo is a singleton we dont do anything with the module but it is required.

const ENV = require('./config/env')[process.env.NODE_ENV || 'development']

require('./src/database');

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

//uses the use method of express to prefix /api to the router method.
app.use('/api', router());

// listen method to run a localhost on port 8080
let port = process.env.PORT || 8000


exports.startServer = (port, path, callback) => {
    // Create server
    let server = http.Server(app);
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
