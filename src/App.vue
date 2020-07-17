<template>
  <section class="section">
    <div class="container">
      <div v-for="editor in editors" v-bind:key="editor">
        <Editor />
        <a href="" class="text-center">{{editor}}</a>
      </div>
      <!--
      <div class="card">
        <div class="card-content">
          <Editor />
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item">Add another</a>
          <a href="#" class="card-footer-item" disabled>Remove</a>
          <a href="#" class="card-footer-item">Share</a>
        </footer>
      </div>
      -->
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
      editors: [1, 2, 3, 5]
    };
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
