<template lang="pug">
  #container
    #game-field.col-sm-12
      app-canvas#the-canvas(
        ref='canvas'
        background='/images/starfield.jpg'
      )
      #score-wrapper(v-show="started")
        div
          | Score:
          span.player-score
      #leader-board-wrapper(v-show="started")
        #leader-board
          h3.text-center Leaders
          hr
          ol.leader-board
            li.leaderboard-player
          hr
        #sort-wrapper
          #sort-header.text-center SORT BY
          #sort-score.sort-option.active Score
          #sort-orbs.sort-option Orbs
          #sort-players.sort-option Players
      #game-message-wrapper
        #game-message gameMessage
</template>

<script>
  import io from 'socket.io-client';
  import Canvas from "./Canvas";

  export default {
    name: "GameField",
    props: {
      playerName: String,
    },
    data() {
      return {
        started: false,
        socket: null,
      }
    },
    components: {
      appCanvas: Canvas,
    },
    methods: {
      init() {
        this.socket = io.connect('http://localhost:8088')

        this.socket.on('initReturn', data => {
          console.log('init socket', data)
          this.$refs.canvas.setOrbs(data);
        })

        this.$refs.canvas.draw()

        this.socket.emit('init', {
          name: this.playerName
        })

        this.started = true;
      },
    },
  }
</script>

<style scoped>

</style>