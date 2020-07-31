<template lang="pug">
  b-modal#loginModal.modal.fade(
    ref='loginModal'
    role='dialog'
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
  )
    template(v-slot:modal-title)
      h2.modal-title.text-center Agar Clone
    button.btn.play-button.btn-github(type='submit' v-if="false" ) Login with github
    form.name-form
      .text-center.error-message
      input#name-input.text-input.text-center.form-control(
        type='text'
        v-model="guest"
        placeholder = 'Enter your name here'
        required
        autocomplete="off"
      )
      button.btn.play-button.play-guest(@click='onGuestClick') Play!
    template(v-slot:modal-footer)
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
    name: "LoginModal",
    data() {
      return {
        guest: "",
      }
    },
    methods: {
      show() {
        this.$refs['loginModal'].show();
      },
      hide() {
        this.$refs['loginModal'].hide();
      },
      onGuestClick(e) {
        e.preventDefault();
        if (this.guest) {
          this.$emit('guest', this.guest)
        }
      }
    },
  }
</script>

<style>
  .play-button {
    font-size: 20px;
    display: block;
    margin: 5px auto 5px;
    width: 90%;
    background-color: #177bf3;
    color: #FFFFFF;
  }

  .btn-github {
    background-image: url("/images/GitHub-Mark-Light-32px.png") !important;
    color: #fff;
    background-color: #444;
    border-color: rgba(0, 0, 0, 0.2);
    background-repeat: no-repeat;
    background-position: 5px;
  }

  .btn-github:hover {
    color: rgba(200, 200, 200, 0.5);
  }
</style>