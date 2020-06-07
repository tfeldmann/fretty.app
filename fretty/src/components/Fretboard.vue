<template>
  <svg width="800" height="300">
    <template v-for="string in tuning.slice().reverse()">
      <svg x="50" :y="50 + i_str * string_spacing" overflow="auto">
        <line
          x1="0"
          y1="0"
          :x2="fretpos(notes.length - 1)"
          y2="0"
          stroke="#000"
          stroke-width="1"
        />
        <template v-for="(note, i_frt) in notes" :key="note.id">
          <line
            v-if="i_str == 0"
            :x1="fretpos(i_frt)"
            y1="0"
            :x2="fretpos(i_frt)"
            :y2="(display.length - 1) * string_spacing"
            stroke-width="1"
            stroke="#000"
          />
          <transition name="fade">
            <svg
              v-if="note"
              :x="(fretpos(i_frt - 1) + fretpos(i_frt)) / 2"
              y="0"
              overflow="auto"
            >
              <circle
                cx="0"
                cy="0"
                r="10"
                stroke-width="1"
                fill="white"
                stroke="black"
              />
              <text
                font-size="11"
                x="0"
                y="0"
                alignment-baseline="middle"
                fill="black"
                text-anchor="middle"
              >
                {{ note }}
              </text>
            </svg>
          </transition>
        </template>
      </svg>
    </template>
  </svg>
</template>

<script>
import { Midi } from "@tonaljs/tonal";

const string_spacing = 30;

export default {
  name: "Fretboard",
  props: {
    tuning: {
      default: [],
    },
    notes: {
      default: [],
    },
    frets: {
      default: 18,
    },
    sharps: {
      type: Boolean,
      default: true, // TODO: "sharps", "flats" or "interval"
    },
  },
  // computed: {
  //   display() {
  //     let result = [];
  //     var scale_notes = this.scale_info.notes.map(Note.chroma);
  //     for (var base of this.strings) {
  //       var chromatic = Range.numeric([base, base + this.frets]);
  //       var tmp = [];
  //       for (var c of chromatic) {
  //         if (scale_notes.includes(c % 12)) {
  //           tmp.push({id: c, this.toname(c)});
  //         } else {
  //           tmp.push({id: c, null);
  //         }
  //       }
  //       result.push(tmp);
  //     }
  //     return result;
  //   },
  // },
  methods: {
    fretpos(n) {
      // https://www.liutaiomottola.com/formulae/fret.htm
      const s = 1000;
      let d = s - s / Math.pow(2, n / 12);
      return Math.round(d * 1000) / 1000;
    },
    toname(x) {
      return Midi.midiToNoteName(x, {
        sharps: this.prefer_sharps,
        pitchClass: true,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
