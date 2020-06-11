<template>
  <div class="editor">
    <div class="columns is-multiline is-centered">
      <!-- column notes -->
      <div class="column">
        <b-field grouped group-multiline position="is-centered">
          <b-field>
            <template slot="label">
              Tuning
              <b-dropdown position="is-bottom-right" append-to-body aria-role="menu" trap-focus>
                <a slot="trigger" role="button">(browse)</a>

                <b-dropdown-item aria-role="menu-item" :focusable="false" custom paddingless>
                  <div class="modal-card" style="width:300px;">
                    <section class="modal-card-body">
                      <!--<b-field>
                        <p class="control">
                          <b-dropdown>
                            <button class="button" slot="trigger">
                              <span>Filters</span>
                              <b-icon icon="menu-down"></b-icon>
                            </button>

                            <b-dropdown-item value="open_issues">Open Issues and Pull Requests</b-dropdown-item>
                            <b-dropdown-item value="your_issues">Your Issues</b-dropdown-item>
                            <b-dropdown-item value="pull_requests">Your Pull Requests</b-dropdown-item>
                            <b-dropdown-item value="everything">Everything</b-dropdown-item>
                          </b-dropdown>
                        </p>
                        <b-input icon="magnify" type="search" placeholder="Search..."></b-input>
                      </b-field>-->
                      <b-table :data="tunings" :columns="tuning_columns"></b-table>
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
            <b-numberinput controls-position="compact" v-model.number="frets" min="1" max="200"></b-numberinput>
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

          <!-- Field Scale -->
          <b-field label="Tonic:">
            <b-input v-model="scale.tonic"></b-input>
          </b-field>
          <b-field label="Scale:">
            <b-autocomplete
              v-model="scale.type"
              :data="scale_search"
              keep-first
              open-on-focus
              clearable
              append-to-body
              @select="(option) => (selected = option)"
            ></b-autocomplete>
          </b-field>
        </b-field>
      </div>
    </div>

    <div class="card-image" style="text-align:center; overflow-x: auto;">
      <Fretboard :tuning="tuning" :notes="notes" :sharps="sharps" :frets="frets" />
    </div>
  </div>
</template>

<script>
import Fretboard from "./Fretboard.vue";
// import NoteSelect from "./NoteSelect.vue";
import { Note, Scale, Midi } from "@tonaljs/tonal";
import { Tunings } from "../tunings.js";

const ALL_SCALES = Object.freeze(Scale.names());

export default {
  name: "Editor",

  components: {
    Fretboard
    // NoteSelect,
  },

  data: function() {
    return {
      usr_tuning: "E A D G",
      sharps: "sharps",
      frets: 18,
      scale: { tonic: "A", type: "minor pentatonic" },
      tunings: Tunings,
      tuning_columns: [
        {
          field: "instrument",
          label: "Instrument"
        },
        {
          field: "name",
          label: "Name"
        },
        {
          field: "tuning",
          label: "Tuning",
          centered: true
        }
      ]
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
    scale_search() {
      return ALL_SCALES.filter(option => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.scale.type.toLowerCase()) >= 0
        );
      });
    }
  },

  methods: {
    normalize(notes) {
      return notes.map(x => x % 12);
    },
    toname(x) {
      return Midi.midiToNoteName(x, {
        sharps: this.sharps == "sharps",
        pitchClass: true
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
