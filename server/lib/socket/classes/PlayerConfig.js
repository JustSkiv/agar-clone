class PlayerConfig {
  constructor(cfg) {
    this.xVector = 0;
    this.yVector = 0;
    this.speed = cfg.space;
    this.zoom = cfg.z
  }
}

module.exports = PlayerConfig