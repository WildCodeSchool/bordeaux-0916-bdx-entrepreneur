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
    logo: String,
    twitter: String,
    facebook: String,
    website: String,
    littleContent: String,
    longContent: {
        type: String,
        required: true
    },
    photoContact1: String,
    facebookContact1: String,
    twitterContact1: String,
    phoneContact1: {
        type: String,
        unique: true,
        validate: [(phoneContact1) => {
            return /0[1-9]([-. ]?[0-9]{2}){4}/.test(phoneContact1)
        }, 'Merci d\'utiliser un numéro de téléphone valide'],
    },
    mailContact1: {
        type: String,
        unique: true,
        validate: [(mailContact1) => {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mailContact1)
        }, 'Veuillez utiliser une adresse mail valide'],
    },
    photoContact2: String,
    facebookContact2: String,
    twitterContact2: String,
    phoneContact2: {
        type: String,
        unique: true,
        validate: [(phoneContact2) => {
            return /0[1-9]([-. ]?[0-9]{2}){4}/.test(phoneContact2)
        }, 'Merci d\'utiliser un numéro de téléphone valide'],
    },

    mailContact2: {
        type: String,
        unique: true,
        validate: [(mailContact2) => {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mailContact2)
        }, 'Veuillez utiliser une adresse mail valide'],
    },
    contact: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]


});

// creating and exporting model with the model method of mongoose.
module.exports = mongoose.model('Member', memberSchema);
