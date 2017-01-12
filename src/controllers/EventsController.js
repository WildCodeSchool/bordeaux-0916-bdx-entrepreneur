'use strict'
// Require parent class
let Controller = require('./Controller');
// Require model (schema) use with this controller
const EVENT = require('../models/event')

class EventController extends Controller {

    constructor() {
      // Call parent constructor with model param
      super(EVENT);
    }

}

module.exports = EventController
