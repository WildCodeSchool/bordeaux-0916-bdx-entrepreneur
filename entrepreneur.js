/*
This file is the entry point
*/
'use strict'
let port = process.env.PORT || 8000
let server = require('./app.js')

server.startServer(port)
