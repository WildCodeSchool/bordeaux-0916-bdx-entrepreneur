'use strict'


// assigning the mongoose variable the mongoosegoos module
let mongoose = require('mongoose');
const ENV = require('../config/env')[process.env.NODE_ENV || 'development']


//connect method of mongoose connect to mongodb: with an if/else function for console messages in nodemon
mongoose.connect(ENV.db || 'mongodb://localhost/bdx_entrepreneur', function(err) {
    if (err) {
        console.log('Failed when trying to connect to Mongodb!');
    } else {
        console.log('Successfully connected to Mongo');
    }
});
