<template lang="pug">
  b-modal#spawnModal.modal.fade(ref='spawnModal', role='dialog')
    template(v-slot:modal-title='')
      h2.modal-title.text-center Agar Clone
    h3.text-center Hello,
      span.player-name {{playerName}}!
    .play-btn-wrapper
      button#join-team-btn.btn.play-button(type='button') Join a Team!
      button#play-solo-btn.btn.play-button.start-game(type='button' @click="onSoloClick") Play Solo!
    .stats-btn-wrapper
      button.btn.stats-btn.player-stats-btn(type='button') See your stats
      button.btn.stats-btn.all-stats-btn(type='button') See all stats
    template(v-slot:modal-footer='')
      #instructions
        label#how-to-play How to play:
        ul
          li Move your mouse on the screen to move your character.
          li Absorb orbs by running over them in order to grow your character.
          li The larger you get the slower you are.
          li Objective: Absorb other players to get even larger but not lose speed.
          li The larger player absorbs the smaller player.
</template>

<script>
  export default {
    name: "SpawnModal",
    props: {
      playerName: String,
    },
    methods: {
      show() {
        this.$refs['spawnModal'].show();
      },
      hide() {
        this.$refs['spawnModal'].hide();
      },
      onSoloClick() {
        this.$emit('solo')
      }
    },
  }
</script>

<style scoped>

</style>