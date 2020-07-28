<template lang="pug">
  canvas(
    ref="canvas"
    @mousedown="start"
    @mouseup="finish"
    @mousemove="draw"
  )
</template>

<script>
  export default {
    name: "Canvas",
    props: ['color'],
    data: () => ({
      ctx: null,
      painting: false,
    }),
    methods: {
      start() {
        this.painting = true;
        this.ctx.beginPath();
      },
      finish(e) {
        this.stroke(e);
        this.painting = false;
      },
      draw(e) {
        if (this.painting) {
          this.stroke(e);
          this.ctx.beginPath();
          this.ctx.moveTo(e.offsetX, e.offsetY);
        }
      },
      stroke(e) {
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
      },
    },
    mounted() {
      this.ctx = this.$refs.canvas.getContext('2d');
      this.ctx.lineWidth = 5;
      this.ctx.lineCap = 'round';
      this.ctx.strokeStyle = this.color;
    },
  }
</script>

<style scoped>
  canvas {
    border: 1px solid black;
  }
</style>