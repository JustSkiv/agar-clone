<template lang="pug">
  canvas(
    ref="canvas"
    :style="'background: url(' + background + ')'"
    @mousemove="onMouseMove"
  )
</template>

<script>
  export default {
    name: "Canvas",
    props: {
      background: String,
      players: Array,
      orbs: Array,
      locX: Number,
      locY: Number,
    },
    data() {
      return {
        player: {
          xVector: 0,
          yVector: 0,
        },
      }
    },
    methods: {
      start() {
        setInterval(() => {
          this.$emit('tick', {
            xVector: this.player.xVector,
            yVector: this.player.yVector,
          })
        }, 33) // 1000 / 33 = 30 FPS
      },
      draw() {
        this.prepareField()
        this.drawPlayers()
        this.drawOrbs()
        requestAnimationFrame(this.draw)
      },
      prepareField() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0)
        this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)

        const camX = -this.locX + this.$refs.canvas.width / 2
        const camY = -this.locY + this.$refs.canvas.height / 2
        this.ctx.translate(camX, camY)
      },
      drawPlayers() {
        if (this.players) {
          this.players.forEach(p => {
            this.ctx.beginPath();

            this.ctx.fillStyle = p.color

            this.ctx.arc(p.locX, p.locY, 10, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.lineWidth = 3;
            this.ctx.strokeStyle = 'rgb(50,255,50)'
            this.ctx.stroke();
          })
        }
      },
      drawOrbs() {
        if (this.orbs) {
          this.orbs.forEach(orb => {
            this.ctx.beginPath();
            this.ctx.fillStyle = orb.color
            this.ctx.arc(orb.locX, orb.locY, orb.radius, 0, Math.PI * 2);
            this.ctx.fill();
          })
        }
      },
      onMouseMove(e) {
        const mousePosition = {
          x: e.clientX,
          y: e.clientY
        };

        const angleDeg = Math.atan2(
          mousePosition.y - (this.$refs.canvas.height / 2), mousePosition.x - (this.$refs.canvas.width / 2),
        ) * 180 / Math.PI;

        let xVector, yVector;

        if (angleDeg >= 0 && angleDeg < 90) {
          xVector = 1 - (angleDeg / 90);
          yVector = -(angleDeg / 90);
        } else if (angleDeg >= 90 && angleDeg <= 180) {
          xVector = -(angleDeg - 90) / 90;
          yVector = -(1 - ((angleDeg - 90) / 90));
        } else if (angleDeg >= -180 && angleDeg < -90) {
          xVector = (angleDeg + 90) / 90;
          yVector = (1 + ((angleDeg + 90) / 90));
        } else if (angleDeg < 0 && angleDeg >= -90) {
          xVector = (angleDeg + 90) / 90;
          yVector = (1 - ((angleDeg + 90) / 90));
        }

        this.player.xVector = xVector;
        this.player.yVector = yVector;
      },
    },
    mounted() {
      let canvas = this.$refs.canvas
      this.ctx = this.$refs.canvas.getContext('2d');
      canvas.height = window.innerHeight
      canvas.width = window.innerWidth
    }
  }
</script>