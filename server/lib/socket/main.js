const io = require('../../server').io

const Player = require('./classes/Player')
const PlayerData = require('./classes/PlayerData')
const PlayerConfig = require('./classes/PlayerConfig')
const Orb = require('./classes/Orb')

let orbs = []
let cfg = {
  orbs: 500,
  speed: 6,
  size: 6,
  zoom: 1.5,
  worldWidth: 500,
  worldHeight: 500,
}

console.log("asd")

initGame()

io.on('connect', (socket) => {
  console.log("someone connected!", socket.id)


  let playerConfig = new PlayerConfig(cfg);
  let playerData = new PlayerData(null, cfg);
  let player = new Player(socket.id, playerConfig, playerData);

  socket.emit('init', {
    orbs
  })
})

function initGame() {
  console.log("init game!")

  for (let i = 0; i < cfg.orbs; i++) {
    orbs.push(new Orb(cfg))
  }
}

module.exports = io