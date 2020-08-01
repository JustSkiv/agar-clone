const io = require('../../server').io

const checkOrbCollisions = require('./collisions').checkForOrbCollisions
const checkPlayerCollisions = require('./collisions').checkForPlayerCollisions

const Player = require('./classes/Player')
const PlayerData = require('./classes/PlayerData')
const PlayerConfig = require('./classes/PlayerConfig')
const Orb = require('./classes/Orb')

let orbs = []
let players = []

const worldSize = 500

let cfg = {
  orbs: 100,
  speed: 8,
  size: 6,
  zoom: 1.5,
  worldWidth: worldSize,
  worldHeight: worldSize,
}

initGame();

setInterval(() => {
  if (!players || players.length === 0) {
    return
  }
  io.emit('generalData', {
    players,
  })
}, 33); // 1000 / 33 = 30 FPS

io.on('connect', (socket) => {

  let player

  socket.on('init', data => {
    console.log("someone connected!", data, socket.id)
    socket.join('game')

    io.sockets.emit('updateLeaderBoard', getLeaderBoard());

    let playerConfig = new PlayerConfig(cfg);
    let playerData = new PlayerData(data.name, cfg);
    player = new Player(socket.id, playerConfig, playerData);

    setInterval(() => {
      socket.emit('ownData', {
        locX: player.data.locX,
        locY: player.data.locY,
        score: player.data.score,
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

    const speed = player.config.speed;

    let xV = player.config.xVector = data.xVector;
    let yV = player.config.yVector = data.yVector;

    if ((player.data.locX > 5 && xV < 0) || (player.data.locX < cfg.worldWidth) && (xV > 0)) {
      player.data.locX += speed * xV;
    }
    if ((player.data.locY > 5 && yV > 0) || (player.data.locY < cfg.worldHeight) && (yV < 0)) {
      player.data.locY -= speed * yV;
    }

    // Orb collision
    let capturedOrb = checkOrbCollisions(player.data, player.config, orbs, cfg)
    capturedOrb.then(data => {
      const orbData = {
        index: data,
        newOrb: orbs[data]
      }
      io.sockets.emit('orbSwitch', orbData);
      io.sockets.emit('updateLeaderBoard', getLeaderBoard());
    }).catch(() => {

    })

    // Player collision
    let playerDeath = checkPlayerCollisions(player.data, player.config, players, player.socketId)
    playerDeath.then(data => {
      io.sockets.emit('updateLeaderBoard', getLeaderBoard());
      io.sockets.emit('playerDeath', data)
    }).catch(() => {
      // console.log()
    })
  });

  socket.on('disconnect', data => {
    players.forEach((p, i) => {
      if (p.uid === player.data.uid) {
        players.splice(i, 1);
      }
    })
  });
})

function getLeaderBoard() {
  players.sort((a, b) => {
    return b.score - a.score;
  });
  return players.map((p) => {
    return {
      name: p.name,
      score: p.score
    }
  });
}

function initGame() {
  console.log("init game!")

  for (let i = 0; i < cfg.orbs; i++) {
    orbs.push(new Orb(cfg))
  }
}

module.exports = io