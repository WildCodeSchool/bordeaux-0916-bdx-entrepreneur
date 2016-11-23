
'use strict'

//These are the models and schemas of mongoose which shall be served to
//Mongdb by express.

let mongoose = require('mongoose');

//creating the blogschema with mongoose's constructor class method.
let blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    PublishedAt: String,
    content: String
});

// creating and exporting model with the model method of mongoose.
module.exports = mongoose.model('Blog', blogSchema);
