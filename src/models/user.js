'use strict'
let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({


    name: {
        type: String
    },
    company: String,
    firstname: String,
    social: [mongoose.Schema.Types.Mixed],
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
        default: false
    },
    contactnumber: {
        type: Number,
        default: false
    },
    contactname2: String,
    contactemail2: {
        type: String,
        default: false,
    },
    contactnumber2: Number,
    fondateur: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// creating and exporting model with the model method of mongoose.
module.exports = mongoose.model('User', userSchema);
