<template>
  <section class="section">
    <div class="container" v-for="(i, editor) in editors" v-bind:key="editor">
      <!--<note-select />-->
      <Editor v-on:add-fretboard-below="addBelow(i)" v-on:remove-fretboard="remove(i)" />
    </div>
  </section>
</template>

<script>
import Editor from "./components/Editor.vue";
// import NoteSelect from "./components/NoteSelect.vue";

export default {
  name: "App",
  components: {
    Editor
    // NoteSelect
  },
  data() {
    return {
      editors: [1]
    };
  },
  methods: {
    addBelow: function(pos) {
      this.editors.splice(pos, 0, Math.max(...this.editors) + 1);
    },
    remove: function(pos) {
      if (this.editors.length > 0) {
        this.editors.splice(pos, 1);
      }
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
