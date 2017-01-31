'use strict'

let mongoose = require('mongoose')

module.exports = mongoose.model('Company', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: String,
    secteur: String,
    social: {
        type: mongoose.Schema.Types.Mixed
    },
    tags: [],
    active: {
        type: Boolean,
        default: true
    },
    siteweb: String,
    introduction: String,
    presentation: String,
    prestation: String,
    attentes: String,
    notes: String,
    ca: String,
    effectif: String,
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: true

}))
