'use strict'


// assigning the mongoose variable the mongoosegoos module
let mongoose = require('mongoose');



//connect method of mongoose connect to mongodb: with an if/else function for console messages in nodemon
mongoose.connect('mongodb://localhost/mean-blog', function(err) {
    if (err) {
        console.log('Failed when trying to connect to Mongodb!');
    } else {
        console.log('Successfully connected to Mongo');
    }
});
