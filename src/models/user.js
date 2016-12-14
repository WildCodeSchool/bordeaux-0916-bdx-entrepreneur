'use strict'

//These are the models and schemas of mongoose which shall be served to
//Mongdb by express.

let mongoose = require('mongoose');

//creating the memberschema with mongoose's constructor class method.
let memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    facebook: String,
    twitter: String,
    number: {
        type: String,
        required: true,
        unique: true,
        validate: [(number) => {
            return /0[1-9]([-. ]?[0-9]{2}){4}/.test(number)
        }, 'Merci d\'utiliser un numéro de téléphone valide'],
    },
    mail: {
        type: String,
        unique: true,
        required: true,
        validate: [(mail) => {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
        }, 'Veuillez utiliser une adresse mail valide'],
    },
    img: String,
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

});

// creating and exporting model with the model method of mongoose.
module.exports = mongoose.model('User', memberSchema);
