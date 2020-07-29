const io = require('../../server').io

const Player = require('./classes/Player')
const PlayerData = require('./classes/PlayerData')
const PlayerConfig = require('./classes/PlayerConfig')
const Orb = require('./classes/Orb')

let orbs = []
let players = []

let cfg = {
  orbs: 10,
  speed: 6,
  size: 6,
  zoom: 1.5,
  worldWidth: 500,
  worldHeight: 500,
}

initGame();

io.on('connect', (socket) => {

  let player

  socket.on('init', data => {
    console.log("someone connected!", data, socket.id)
    socket.join('game')

    let playerConfig = new PlayerConfig(cfg);
    let playerData = new PlayerData(data.name, cfg);
    player = new Player(socket.id, playerConfig, playerData);

    setInterval(() => {
      io.to('game').emit('tock', {
        players,
        locX: player.data.locX,
        locY: player.data.locY,
      })
    }, 33); // 1000 / 33 = 30 FPS

    socket.emit('initReturn', {
      orbs
    })
    players.push(playerData)
  })

  socket.on('tick', data => {
    if (!player) {
      return
    }
    console.log('tick', data)

    const speed = player.config.speed;

    let xV = player.config.xVector = data.xVector;
    let yV = player.config.yVector = data.yVector;

    if ((player.data.locX < 5 && xV < 0) || (player.data.locX > 500) && (xV > 0)) {
      player.data.locY -= speed * yV;
    } else if ((player.data.locY < 5 && yV > 0) || (player.data.locY > 500) && (yV < 0)) {
      player.data.locX += speed * xV;
    } else {
      player.data.locX += speed * xV;
      player.data.locY -= speed * yV;
    }
  })
})

function initGame() {
  console.log("init game!")

  for (let i = 0; i < cfg.orbs; i++) {
    orbs.push(new Orb(cfg))
  }
}

module.exports = io