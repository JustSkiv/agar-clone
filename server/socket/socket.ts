const io = require('../server').io

const Orb = require('./classes/Orb')

let orbs: any[] = []

console.log("asd")

initGame()

io.on('connect', (socket) => {
    console.log("someone connected!")
    socket.emit('init', {
        orbs
    })
})

function initGame() {
    console.log("init game!")

    for (let i = 0; i < 500; i++) {
        orbs.push(new Orb())
    }
}

module.exports = io