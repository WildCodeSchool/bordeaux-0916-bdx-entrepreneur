'use strict'
let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    company: String,
    firstname: String,
    facebook: String,
    twitter: String,
    linkedin: String,
    contact2facebook: String,
    contact2linkedin: String,
    contact2twitter: String,
    number: {
        type: Number
    },
    email: {
        type: String,
        unique: true
    },
    img: String,
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    contact: {
        type: Boolean,
        default: false
    },
    contactname: {
        type: String,
        default: false
    },
    contactemail: {
        type: String,
        default: false,
        validate: [(mail) => {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
        }, 'Veuillez utiliser une adresse mail valide'],
    },
    contactnumber: {
        type: Number,
        default: false,
        validate: [(number) => {
            return /0[1-9]([-. ]?[0-9]{2}){4}/.test(number)
        }, 'Merci d\'utiliser un numéro de téléphone valide'],
    },
    contactname2: {
        type: String,
        validate: [(mail) => {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
        }, 'Veuillez utiliser une adresse mail valide'],
    },
    contactemail2: {
        type: String,
        default: false,
    },
    contactnumber2: {
        type: Number,
        validate: [(number) => {
            return /0[1-9]([-. ]?[0-9]{2}){4}/.test(number)
        }, 'Merci d\'utiliser un numéro de téléphone valide'],
    },
    foundateur: {
        type: Boolean,
        default: false
    },
    foundateuremail: {
        default: false
    },
    foundateurnumber: {
        default: false
    },
    foundateurfacebook: String,
    foundateurlinkedin: String,
    foundateurtwitter: String,
}, {
    timestamps: true
});

// creating and exporting model with the model method of mongoose.
module.exports = mongoose.model('User', userSchema);
