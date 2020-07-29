class PlayerData {
  constructor(name, cfg) {
    this.name = name;
    this.locX = Math.floor(cfg.worldWidth * Math.random() + 10);
    this.locY = Math.floor(cfg.worldHeight * Math.random() + 10);
    this.radius = cfg.size;
    this.color = this.getRandomColor();
    this.score = 0;
  }

  getRandomColor() {
    const r = Math.floor(200 * Math.random() + 50);
    const g = Math.floor(200 * Math.random() + 50);
    const b = Math.floor(200 * Math.random() + 50);

    return `rgb(${r},${g},${b})`
  }
}

module.exports = PlayerData