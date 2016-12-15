'use strict'

//These are the models and schemas of mongoose which shall be served to
//Mongdb by express.

let mongoose = require('mongoose');

//creating the companyschema with mongoose's constructor class method.
let companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: String,
    twitter: String,
    facebook: String,
    website: String,
    littleContent: String,
    longContent: {
        type: String,
        required: true
    },
    contact: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    founder: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true

});

// creating and exporting model with the model method of mongoose.
module.exports = mongoose.model('Company', companySchema);
