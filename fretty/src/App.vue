<template>
  <div id="app">
  <p>Test</p>
    <SimpleFretboard v-bind:tuning="[60, 61, 62, 63, 64, 65]" v-bind:notes="[1, 5, 10, 20]" />
  </div>
</template>

<script>
import SimpleFretboard from "./components/SimpleFretboard.vue";

export default {
  name: "App",
  components: {
    SimpleFretboard,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
