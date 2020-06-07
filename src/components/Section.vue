<template>
  <div>
    <p>Test</p>
    <p>{{ usr_tuning }} {{ tuning }} {{ notes }}</p>
    <div class="settings">
      Tuning:
      <input type="text" v-model="usr_tuning" />

      Frets:
      <input v-model.number="frets" type="number" size="4" min="1" max="200" />

      Notation:
      <input type="checkbox" id="sharps" v-model="sharps" v-bind:value="true" />
      <label for="sharps">#</label>
    </div>

    <input type="text" v-model="usr_tuning" />
    <Fretboard
      :tuning="tuning"
      :notes="notes"
      :sharps="sharps"
      :frets="frets"
    />
  </div>
</template>

<script>
import Fretboard from "./Fretboard.vue";
import { Note } from "@tonaljs/tonal";

export default {
  name: "Section",

  components: {
    Fretboard,
  },

  data: function() {
    return {
      usr_tuning: "E A D G",
      sharps: true,
      frets: 18,
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
