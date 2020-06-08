<template>
  <svg class="fretboard" width="100%" height="300">
    <text font-size="11" x="10" y="20" fill="black">
      TODO: Tuning: E A D G
    </text>

    <g transform="translate(50, 50)">
      <!--
      <text
        font-size="11"
        :x="width"
        :y="height + 20"
        fill="gray"
        alignment-baseline="hanging"
        text-anchor="end"
      >
        created with fretty.app
      </text>-->

      <!-- string lines -->
      <line
        v-for="string in strings"
        :key="'string_' + string.nr"
        x1="0"
        :y1="string.y"
        :x2="width"
        :y2="string.y"
        stroke="#000"
        stroke-width="1"
      />

      <!-- nut -->
      <line
        x1="0"
        y1="0"
        x2="0"
        :y2="height"
        stroke="#000"
        stroke-width="5"
        stroke-linecap="round"
      />

      <!-- frets -->
      <line
        v-for="fret in fret_lines.lines"
        :key="'fret_' + fret.nr"
        :x1="fret.x"
        :y1="fret_lines.y1"
        :x2="fret.x"
        :y2="fret_lines.y2"
        stroke="#000"
        :stroke-width="fret.width"
      />

      <!-- notes -->
      <g v-for="string in strings" :key="'ng_' + string.nr">
        <transition-group name="list" tag="g">
          <g v-for="note in string.notes" :key="note.key">
            <!-- circle -->
            <circle
              :cx="note.x"
              :cy="string.y"
              r="10"
              stroke-width="1"
              fill="white"
              stroke="black"
            />

            <!-- name -->
            <text
              font-size="11"
              :x="note.x"
              :y="string.y"
              alignment-baseline="middle"
              fill="black"
              text-anchor="middle"
            >
              {{ note.name }}
            </text>
          </g>
        </transition-group>
      </g>
    </g>
  </svg>
</template>

<script>
import { Midi } from "@tonaljs/tonal";

export default {
  name: "Fretboard",

  props: {
    tuning: {
      type: Array,
      default: () => [],
    },
    notes: {
      type: Array,
      default: () => [],
    },
    frets: {
      type: Number,
      default: 18,
    },
    sharps: {
      type: Boolean,
      default: true, // TODO: "sharps", "flats" or "interval"
    },
  },

  data: function() {
    return {
      string_spacing: 30,
      notes_: this.notes,
      frets_: this.frets,
      sharps_: this.sharps,
    };
  },

  computed: {
    tuning_: function() {
      return this.tuning;
    },
    width: function() {
      return this.fretpos(this.frets - 1);
    },
    height: function() {
      return (this.tuning_.length - 1) * this.string_spacing;
    },
    strings: function() {
      let result = [];
      this.tuning.forEach((tuning, string) => {
        // find notes
        let normalized_notes = this.normalize(this.notes);
        let notes = [];
        for (let fret = 0; fret < this.frets; fret++) {
          let note = (tuning + fret) % 12;
          if (normalized_notes.includes(note)) {
            notes.push({
              fret: fret,
              name: this.toname(note),
              x: (this.fretpos(fret - 1) + this.fretpos(fret)) / 2,
              key: "n" + string + "_" + fret,
            });
          }
        }

        result.push({
          nr: string,
          y: string * this.string_spacing,
          tuning: this.toname(tuning),
          notes: notes,
        });
      });
      return result;
    },
    fret_lines: function() {
      let lines = [];
      for (let i = 1; i < this.frets; i++) {
        lines.push({
          nr: i,
          x: this.fretpos(i),
        });
      }
      return {
        y1: this.height == 0 ? -this.string_spacing / 4 : 0,
        y2: this.height == 0 ? this.string_spacing / 4 : this.height,
        lines: lines,
      };
    },
  },

  methods: {
    fretpos(n) {
      // https://www.liutaiomottola.com/formulae/fret.htm
      const s = 1000;
      let d = s - s / Math.pow(2, n / 12);
      return Math.round(d * 1000) / 1000;
    },
    toname(x) {
      return Midi.midiToNoteName(x, {
        sharps: this.sharps,
        pitchClass: true,
      });
    },
    normalize(notes) {
      return notes.map((x) => x % 12);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fretboard {
  border: 1px solid silver;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
</style>
