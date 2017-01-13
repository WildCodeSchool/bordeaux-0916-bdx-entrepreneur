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
    sector: String,
    logo: String,
    linkedin: String,
    twitter: String,
    facebook: String,
    pinterest: String,
    instagram: String,
    youtube: String,


    tag:[String],


    website: String,
    littleContent: String,
    longContent: {
        type: String,
        required: true
    },
    search:String,
    purpose:String,
    note:String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
},
{
  timestamps: true
}
);

// creating and exporting model with the model method of mongoose.
module.exports = mongoose.model('Company', companySchema);
