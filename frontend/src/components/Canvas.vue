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
    },
    data() {
      return {
        player: {
          xVector: 0,
          yVector: 0,
          locX: Math.floor(500 * Math.random() + 10),
          locY: Math.floor(500 * Math.random() + 10),
          orbs: [],
        },
      }
    },
    methods: {
      draw() {

        this.ctx.setTransform(1, 0, 0, 1, 0, 0)
        this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)

        const camX = -this.player.locX + this.$refs.canvas.width / 2
        const camY = -this.player.locY + this.$refs.canvas.height / 2
        this.ctx.translate(camX, camY)

        this.ctx.beginPath();

        this.ctx.fillStyle = 'rgb(255,100,100)'

        this.ctx.arc(this.player.locX, this.player.locY, 10, 0, Math.PI * 2);
        // this.ctx.arc(200, 200, 10, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = 'rgb(50,255,50)'
        this.ctx.stroke();

        if (this.orbs) {
          this.orbs.forEach(orb => {
            this.ctx.beginPath();
            this.ctx.fillStyle = orb.color
            this.ctx.arc(orb.locX, orb.locY, orb.radius, 0, Math.PI * 2);
            this.ctx.fill();
          })
        }

        requestAnimationFrame(this.draw)
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
          // console.log("lower right")
          xVector = 1 - (angleDeg / 90);
          yVector = -(angleDeg / 90);
        } else if (angleDeg >= 90 && angleDeg <= 180) {
          // console.log("lower left")
          xVector = -(angleDeg - 90) / 90;
          yVector = -(1 - ((angleDeg - 90) / 90));
        } else if (angleDeg >= -180 && angleDeg < -90) {
          // console.log("upper left")
          xVector = (angleDeg + 90) / 90;
          yVector = (1 + ((angleDeg + 90) / 90));
        } else if (angleDeg < 0 && angleDeg >= -90) {
          // console.log("upper right")
          xVector = (angleDeg + 90) / 90;
          yVector = (1 - ((angleDeg + 90) / 90));
        }

        const speed = 10
        let xV = xVector;
        let yV = yVector;

        if ((this.player.locX < 5 && this.player.xVector < 0) || (this.player.locX > 500) && (xV > 0)) {
          this.player.locY -= speed * yV;
        } else if ((this.player.locY < 5 && yV > 0) || (this.player.locY > 500) && (yV < 0)) {
          this.player.locX += speed * xV;
        } else {
          this.player.locX += speed * xV;
          this.player.locY -= speed * yV;
        }

      },
      setOrbs(data) {
        console.log('got orbs', data.orbs.length)
        this.orbs = data.orbs;
      },
    },
    mounted() {
      console.log('rndX', this.rndX)

      let canvas = this.$refs.canvas
      this.ctx = this.$refs.canvas.getContext('2d');
      canvas.height = window.innerHeight
      canvas.width = window.innerWidth
    }
  }
</script>

<style scoped>

</style>