<template>
  <div id="app">
    <Fretboard tuning="[60,64,67]" notes="[60,64,67]" frets="15" />
    <br>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Fretboard from "./components/Fretboard.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    Fretboard,
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
