class Player {
  constructor(socketId, playerConfig, playerData) {
    this.socketId = socketId;
    this.config = playerConfig;
    this.data = playerData;
  }
}

module.exports = Player