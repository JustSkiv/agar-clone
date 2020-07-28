import express = require('express');

const app: express.Application = require('../server').app

app.get('/', function (req, res) {
    res.send("bla!")
})