'use strict'
let port = process.env.PORT || 8000
let server = require('./app.js')

console.log(`server listening on port ${port}`)

server.startServer(port)
