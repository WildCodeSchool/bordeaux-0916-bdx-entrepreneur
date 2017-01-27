'use strict'
let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({


    name: String,
    firstname: String,
    company: [{
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },
        role: {
            type: String,
            enum: ['Fondateur', 'Other'],
            default: 'Other'
        }
    }],
    address: {
        type: mongoose.Schema.Types.Mixed
    },
    social: {
        type: mongoose.Schema.Types.Mixed
    },
    number: String,
    email: {
        type: String,
        lowercase: true,
        unique: true
    },
    image: String,
    password: String,
    remarques: String,
    active: {
        type: Boolean,
        default: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
}, {
    timestamps: true
});

// creating and exporting model with the model method of mongoose.
module.exports = mongoose.model('User', userSchema);
