class PlayerConfig {
  constructor(cfg) {
    this.xVector = 0;
    this.yVector = 0;
    this.speed = cfg.speed;
    this.zoom = cfg.zoom
  }
}

module.exports = PlayerConfig