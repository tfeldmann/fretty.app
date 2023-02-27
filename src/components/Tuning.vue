<template>
  <div class="editor">
    <div class="columns is-multiline is-centered">
      <!-- column notes -->
      <div class="column" style="align-items: flex-end">
        <b-field grouped group-multiline position="is-centered">
          <b-field>
            <template slot="label">
              Tuning
              <b-dropdown
                position="is-bottom-right"
                append-to-body
                aria-role="menu"
                trap-focus
              >
                <a slot="trigger" role="button">(browse)</a>

                <b-dropdown-item
                  aria-role="menu-item"
                  :focusable="false"
                  custom
                  paddingless
                >
                  <div class="modal-card" style="width: 300px">
                    <section class="modal-card-body">
                      [Todo] list common tunings
                    </section>
                    <footer class="modal-card-foot">
                      <button class="button is-primary">Select</button>
                    </footer>
                  </div>
                </b-dropdown-item>
              </b-dropdown>
            </template>
            <b-input v-model="usr_tuning"></b-input>
          </b-field>
          <b-field label="Frets">
            <b-numberinput
              controls-position="compact"
              v-model.number="frets"
              min="1"
              max="200"
            >
            </b-numberinput>
          </b-field>
          <b-field label="Notation">
            <b-field>
              <b-radio-button v-model="sharps" native-value="sharps">
                <span>#</span>
              </b-radio-button>

              <b-radio-button v-model="sharps" native-value="flats">
                <span>b</span>
              </b-radio-button>
            </b-field>
          </b-field>
        </b-field>
      </div>

      <!-- column: tuning / frets -->
      <div class="column" style="align-items: flex-end">
        <b-tabs size="is-small" position="is-centered">
          <!-- tab: scale -->
          <b-tab-item label="Scale">
            <b-field grouped group-multiline position="is-centered">
              <b-field label="Tonic:" horizontal>
                <b-input v-model="scale.tonic" size="4"></b-input>
              </b-field>
              <b-autocomplete
                v-model="scale.type"
                :keep-first="true"
                :clearable="true"
                :open-on-focus="true"
                :data="all_scales"
                :clear-on-select="true"
                field=""
                @select="(option) => (selected = option)"
              >
              </b-autocomplete>
            </b-field>
          </b-tab-item>

          <!-- tab: chord -->
          <b-tab-item label="Chord">
            <b-field grouped group-multiline position="is-centered">
              <b-field label="Chord:" horizontal>
                <b-input v-model="scale.tonic" size="4"></b-input>
              </b-field>
            </b-field>
          </b-tab-item>

          <!-- tab: note -->
          <b-tab-item label="Notes">Notes</b-tab-item>
        </b-tabs>
      </div>
    </div>

    <div class="card-image" style="text-align: center">
      <Fretboard
        :tuning="tuning"
        :notes="notes"
        :sharps="sharps"
        :frets="frets"
      />
    </div>
  </div>
</template>

<script>
import Fretboard from "./Fretboard.vue";
import { Note, Scale, Midi } from "@tonaljs/tonal";

export default {
  name: "Editor",

  components: {
    Fretboard,
  },

  data: function () {
    return {
      usr_tuning: "E A D G",
      sharps: "sharps",
      frets: 18,
      scale: { tonic: "A", type: "minor pentatonic" },
      all_scales: Scale.names(),
    };
  },

  computed: {
    tuning: function () {
      return this.usr_tuning.trim().split(" ").map(Note.chroma).reverse();
    },
    notes: function () {
      return this.scale_info.notes.map(Note.chroma);
    },
    scale_info: function () {
      let name = this.scale.tonic + " " + this.scale.type;
      return Scale.get(name);
    },
    chromatic: function () {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(this.toname);
    },
    scale_search() {
      return this.all_scales;
    },
  },

  methods: {
    normalize(notes) {
      return notes.map((x) => x % 12);
    },
    toname(x) {
      return Midi.midiToNoteName(x, {
        sharps: this.sharps == "sharps",
        pitchClass: true,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
