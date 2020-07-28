"use strict";
var io = require('../server').io;
var Orb = require('./classes/Orb');
var orbs = [];
console.log("asd");
initGame();
io.on('connect', function (socket) {
    console.log("someone connected!");
    socket.emit('init', {
        orbs: orbs
    });
});
function initGame() {
    console.log("init game!");
    for (var i = 0; i < 500; i++) {
        orbs.push(new Orb());
    }
}
module.exports = io;
