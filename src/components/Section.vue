<template>
  <div>
    <p>{{ scale }}</p>
    <div class="settings">
      Tuning:
      <input type="text" v-model="usr_tuning" />

      Frets:
      <input v-model.number="frets" type="number" size="4" min="1" max="200" />

      Notation:
      <input type="checkbox" id="sharps" v-model="sharps" v-bind:value="true" />
      <label for="sharps">#</label>
    </div>

    <Fretboard
      :tuning="tuning"
      :notes="notes"
      :sharps="sharps"
      :frets="frets"
    />

    <div>
      <label for="scale">Scale:</label>
      <input type="text" v-model="scale.tonic" list="tonics" />
      <datalist id="tonics">
        <option v-for="name in chromatic" :value="name" :key="name.id">
        </option>
      </datalist>
      <v-select :options="all_scales" v-model="scale.type"></v-select>
    </div>
  </div>
</template>

<script>
import Fretboard from "./Fretboard.vue";
import { Note, Scale } from "@tonaljs/tonal";
import vSelect from "vue-select";
import { Midi } from "@tonaljs/tonal";

import "vue-select/dist/vue-select.css";

export default {
  name: "Section",

  components: {
    Fretboard,
    "v-select": vSelect,
  },

  data: function() {
    return {
      usr_tuning: "E A D G",
      sharps: true,
      frets: 18,
      scale: { tonic: "A", type: "minor pentatonic" },
      all_scales: Scale.names(),
    };
  },

  computed: {
    tuning: function() {
      return this.usr_tuning
        .trim()
        .split(" ")
        .map(Note.chroma)
        .reverse();
    },
    notes: function() {
      return this.scale_info.notes.map(Note.chroma);
    },
    scale_info: function() {
      let name = this.scale.tonic + " " + this.scale.type;
      return Scale.get(name);
    },
    chromatic: function() {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(this.toname);
    },
  },

  methods: {
    normalize(notes) {
      return notes.map((x) => x % 12);
    },
    toname(x) {
      return Midi.midiToNoteName(x, {
        sharps: this.sharps,
        pitchClass: true,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
