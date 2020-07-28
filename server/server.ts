const params = {
    port: 8088,
    static: __dirname + '/public',
}

import express = require('express');

const app: express.Application = express();

app.use(express.static(params.static));
console.log(`static path ${params.static}`)

import socketio = require('socket.io');

const server = app.listen(params.port, function () {
    console.log(`server started and listening: http://localhost:${params.port}/`)
})

const io = socketio(server);

const helmet = require('helmet')
app.use(helmet())

// App organization
module.exports = {
    app,
    io
}