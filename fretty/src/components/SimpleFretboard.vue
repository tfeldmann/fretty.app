<template>
  <div>
    <pre style="text-align: left">
strings: {{ strings }}
fret_lines: {{ fret_lines }}
</pre
    >
    <svg class="fretboard" width="800" height="300">
      <g transform="translate(50, 50)">
        <g v-for="string in strings" :key="string.nr">
          <!-- string lines -->
          <line
            x1="0"
            :y1="string.y"
            :x2="width"
            :y2="string.y"
            stroke="#000"
            stroke-width="1"
          />
        </g>

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
          :key="fret.nr"
          :x1="fret.x"
          :y1="fret_lines.y1"
          :x2="fret.x"
          :y2="fret_lines.y2"
          stroke="#000"
          :stroke-width="fret.width"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import { Midi } from "@tonaljs/tonal";

export default {
  name: "SimpleFretboard",
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
    };
  },
  computed: {
    width: function() {
      return this.fretpos(this.frets - 1);
    },
    height: function() {
      return (this.tuning.length - 1) * this.string_spacing;
    },
    strings: function() {
      let result = [];
      this.tuning
        .slice()
        .reverse()
        .forEach((tuning, i) => {
          result.push({
            nr: i,
            y: i * this.string_spacing,
            tuning: this.toname(tuning),
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
        y1: 0,
        y2: this.height,
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fretboard {
  border: 1px solid red;
}
</style>
