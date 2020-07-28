"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require('../server').app;
app.get('/', function (req, res) {
    res.send("bla!");
});
