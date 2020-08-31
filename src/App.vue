<template>
  <section class="section">
    <div class="container" v-for="(i, editor) in editors" v-bind:key="editor">
      <!--<note-select />-->
      <Editor v-on:add-fretboard-below="addBelow(i+1)" />
    </div>
  </section>
</template>

<script>
import Editor from "./components/Editor.vue";
// import NoteSelect from "./components/NoteSelect.vue";

export default {
  name: "App",
  components: {
    Editor,
    // NoteSelect
  },
  data() {
    return {
      editors: [null]
    };
  },
  methods: {
    addBelow: function(position) {
      console.log(position);
      this.editors.splice(position, 0, null);
    }
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
