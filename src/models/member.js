'use strict'

//These are the models and schemas of mongoose which shall be served to
//Mongdb by express.

let mongoose = require('mongoose');

//creating the memberschema with mongoose's constructor class method.
let memberSchema = new mongoose.Schema({
    title: String,
    author: String,
    PublishedAt: Date,
    content: String,
    img: String,
    sector: String,
    keys: String
});

// creating and exporting model with the model method of mongoose.
module.exports = mongoose.model('Member', memberSchema);
