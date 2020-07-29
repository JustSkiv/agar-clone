class Orb {
  constructor(cfg) {
    this.color = this.getRandomColor();
    this.locX = Math.floor(cfg.worldWidth * Math.random());
    this.locY = Math.floor(cfg.worldHeight * Math.random());
    this.radius = cfg.size;
  }

  getRandomColor() {
    const r = Math.floor(200 * Math.random() + 50);
    const g = Math.floor(200 * Math.random() + 50);
    const b = Math.floor(200 * Math.random() + 50);

    return `rgb(${r},${g},${b})`
  }
}

module.exports = Orb