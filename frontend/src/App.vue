<template lang="pug">
  #app
    app-main
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Main from "@/components/Main.vue";
    import DrawCanvas from "@/components/DrawCanvas.vue";

    @Component({
        data() {
            return {
                colors: ['red', 'green', 'blue'],
            }
        },
        components: {
            appMain: Main,
            drawCanvas: DrawCanvas,
        },
    })
    export default class App extends Vue {
    }
</script>

<style lang="scss">
  body {
    background-color: black;
    overflow: hidden;
  }

  h3 {
    margin-top: 10px
  }
</style>
