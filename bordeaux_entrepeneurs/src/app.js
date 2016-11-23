'use strict';
//require express
let express = require('express');

//require the body parser package
let bodyParser = require('body-parser');
let methodOverride = require('method-override')
// router is now api moddule we required from index.js exports
let router = require('./api/');

//express is now held in the variable app
let app = express();

//mongo is a singleton we dont do anything with the module but it is required.
require('./database');

//requiring seed data
require('./seed');

//use method of express to acess all static files in the public folder
app.use('/', express.static('public'));

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
app.listen(8080, function() {
    console.log("The server is running on port 8080!");
});
