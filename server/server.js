const params = {
  port: 8088,
  static: __dirname + '/public',
}

const express = require('express');
const app = express();

app.use(express.static(params.static));
console.log(`static path ${params.static}`)

console.log('require socket.io..')
const socketio = require('socket.io');

console.log('start listening port', params.port)

const server = app.listen(params.port, function () {
  console.log(`server started and listening: http://localhost:${params.port}/`)
})

console.log('init socketio', params.port)

const io = socketio(server);

// const helmet = require('helmet')
// app.use(helmet());

// App organization
module.exports = {
  app,
  io
}