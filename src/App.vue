<template>
  <section class="section">
    <div class="container" v-for="(i, editor) in editors" v-bind:key="editor">
      <Editor />
    </div>
  </section>
</template>

<script>
import Editor from "./components/Editor.vue";

export default {
  name: "App",
  components: {
    Editor
  },
  data() {
    return {
      editors: [1]
    };
  }
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
