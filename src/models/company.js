'use strict'

let mongoose = require('mongoose')

module.exports = mongoose.model('Companie', new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    image:String,
    secteur: String,
    logo: String,
    social: [mongoose.Schema.Types.Mixed],
    tags: [],
    active: {
        type: Boolean,
        default: true
    },
    siteweb: String,
    introduction: String,
    presentation: {
        type: String
    },
    prestation: String,
    attentes: String,
    notes: String,
    cofond: [mongoose.Schema.Types.Mixed],
    fondateur: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {
    timestamps: true

}))
