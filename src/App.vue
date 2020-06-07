<template>
  <div id="app">
    <p>fretty.app</p>
    <Section />
  </div>
</template>

<script>
import Section from "./components/Section.vue";

export default {
  name: "App",
  components: {
    Section,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
