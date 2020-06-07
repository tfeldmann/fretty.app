<template>
  <div id="app">
    <pre
      >{{ usr_tuning }} {{ tuning }} {{ notes }}
    </pre>
    <input type="text" v-model="usr_tuning" />
    <p>fretty.app</p>
    <Fretboard v-bind:tuning="tuning" v-bind:notes="notes" />
  </div>
</template>

<script>
import Fretboard from "./components/Fretboard.vue";
import { Note } from "@tonaljs/tonal";

export default {
  name: "App",
  components: {
    Fretboard,
  },

  data: function() {
    return {
      usr_tuning: "E A D G",
    };
  },

  computed: {
    tuning: function() {
      return this.usr_tuning
        .trim()
        .split(" ")
        .map(Note.chroma);
    },
    notes: function() {
      return [60, 61, 62, 63, 65, 30];
    },
  },

  methods: {
    normalize(notes) {
      return notes.map((x) => x % 12);
    },
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
