'use strict'

//These are the models and schemas of mongoose which shall be served to
//Mongdb by express.

let mongoose = require('mongoose');

//creating the eventschema with mongoose's constructor class method.
let eventSchema = new mongoose.Schema({

        name: String,
        img: String,
        date: String
    }, {
        timestamps: true
    }



);

// creating and exporting model with the model method of mongoose.
module.exports = mongoose.model('Event', eventSchema);
