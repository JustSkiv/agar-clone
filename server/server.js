"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var params = {
    port: 8088,
    static: __dirname + '/public',
};
var express = require("express");
var app = express();
app.use(express.static(params.static));
console.log("static path " + params.static);
var socketio = require("socket.io");
var server = app.listen(params.port, function () {
    console.log("server started and listening: http://localhost:" + params.port + "/");
});
var io = socketio(server);
var helmet = require('helmet');
app.use(helmet());
// App organization
module.exports = {
    app: app,
    io: io
};
