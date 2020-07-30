<template lang="pug">
  #container
    #game-field.col-sm-12
      app-canvas#the-canvas(
        ref='canvas'
        background='/images/starfield.jpg'
        :players="players"
        :orbs="orbs"
        :locX="locX"
        :locY="locY"
        @tick="onTick"
        @performance="onPerformance"
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
        players: [],
        orbs: [],
        locX: 0,
        locY: 0,

        performance: null,
      }
    },
    components: {
      appCanvas: Canvas,
    },
    methods: {
      onPerformance(data) {
        this.performance = data
      },
      init() {
        this.socket = io.connect('http://localhost:8088')

        this.socket.on('initReturn', data => {
          console.log('init socket', data)
          this.orbs = data.orbs;
          this.$refs.canvas.start();
        })

        this.socket.on('generalData', data => {
          this.players = data.players
        })
        this.socket.on('ownData', data => {
          this.locX = data.locX
          this.locY = data.locY
        })

        this.$refs.canvas.draw()

        this.socket.emit('init', {
          name: this.playerName
        })

        this.socket.on('orbSwitch', orbData => {
          // console.log('got orb!', data)
          this.orbs.splice(orbData.index, 1, orbData.newOrb);
        });

        this.started = true;
      },
      onTick(data) {
        this.socket.emit('tick', data)
      }
    },
  }
</script>

<style scoped>

</style>