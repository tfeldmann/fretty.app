<template>
  <div>
    <div class="editor">
      <div class="columns is-multiline is-centered">
        <div class="column">
          <b-field grouped group-multiline position="is-centered">
            <!-- Tuning -->
            <b-field label="Tuning">
              <b-autocomplete
                v-model="usr_tuning"
                :data="tuning_search"
                @select="(option) => (selected = option.name)"
                group-field="instrument"
                group-options="tunings"
                open-on-focus
                clearable
                field="tuning"
                icon="guitar"
                style="min-width: 350px"
                @input="saveSettings"
              >
                <template slot-scope="props">
                  <div style="display: flex">
                    <div style="flex: 1 1 0px">{{ props.option.name }}</div>
                    <div style="flex: 1 1 0px">{{ props.option.tuning }}</div>
                  </div>
                </template>
              </b-autocomplete>
            </b-field>

            <!-- Tonic + Scale -->
            <b-field label="Tonic:">
              <b-input
                v-model="scale.tonic"
                icon="music"
                style="max-width: 100px"
              ></b-input>
            </b-field>
            <b-field label="Scale:">
              <b-autocomplete
                v-model="scale.type"
                :data="scale_search"
                open-on-focus
                clearable
                append-to-body
                @select="(option) => (selected = option)"
              ></b-autocomplete>
            </b-field>

            <!-- Settings -->
            <b-field>
              <template slot="label">
                <span style="color: transparent; user-select: none">More</span>
              </template>

              <b-dropdown append-to-body aria-role="menu" trap-focus>
                <b-button class="button" slot="trigger" icon-left="cog"
                  >Settings</b-button
                >

                <b-dropdown-item
                  aria-role="menu-item"
                  :focusable="false"
                  custom
                  paddingless
                >
                  <form action>
                    <div class="modal-card" style="width: 300px">
                      <section class="modal-card-body">
                        <b-field label="Frets">
                          <b-numberinput
                            controls-position="compact"
                            v-model.number="frets"
                            min="1"
                            max="200"
                          ></b-numberinput>
                        </b-field>
                        <b-field label="Notation">
                          <b-field>
                            <b-radio-button
                              v-model="notation"
                              native-value="sharps"
                            >
                              <span>#</span>
                            </b-radio-button>

                            <b-radio-button
                              v-model="notation"
                              native-value="flats"
                            >
                              <span>b</span>
                            </b-radio-button>
                            <b-radio-button
                              v-model="notation"
                              native-value="Intervals"
                            >
                              <span>Intervals</span>
                            </b-radio-button>
                          </b-field>
                        </b-field>
                        <b-field label="Show Chords">
                          <b-field>
                            <b-radio-button
                              v-model="ShowChords"
                              native-value="true"
                            >
                              <span>True</span>
                            </b-radio-button>

                            <b-radio-button
                              v-model="ShowChords"
                              native-value="false"
                            >
                              <span>False</span>
                            </b-radio-button>
                          </b-field>
                        </b-field>
                        <b-field label="Music Sheet">
                          <b-field>
                            <b-radio-button
                              v-model="ShowMusicSheet"
                              native-value="true"
                            >
                              <span>True</span>
                            </b-radio-button>

                            <b-radio-button
                              v-model="ShowMusicSheet"
                              native-value="false"
                            >
                              <span>False</span>
                            </b-radio-button>
                          </b-field>
                        </b-field>
                        <!-- <b-checkbox>Show piano</b-checkbox>-->
                      </section>
                      <footer class="modal-card-foot">
                        <b-button
                          @click="$emit('remove-fretboard')"
                          icon-left="trash"
                          >remove fretboard</b-button
                        >
                      </footer>
                    </div>
                  </form>
                </b-dropdown-item>
              </b-dropdown>
            </b-field>
            <!-- /Settings -->
          </b-field>
        </div>
      </div>

      <div class="card-image" style="text-align: center; overflow-x: auto">
        <Fretboard
          :tuning="tuning"
          :notes="notes"
          :notation="notation"
          :frets="frets"
          :root="root"
          :scale="scale_info"
        />
      </div>
      <Chords v-if="this.ShowChords == 'true'" :chords="scaleChords" />
      <Notation
        v-if="this.ShowMusicSheet == 'true'"
        :scale="scale_info"
        :scale-name="scale_info.name"
      />
    </div>
  </div>
</template>

<script>
import Fretboard from "./Fretboard.vue";
import Chords from "./Chords.vue";
import Notation from "./Notation.vue";
// import NoteSelect from "./NoteSelect.vue";
import { Note, Scale, Midi, ScaleType, Mode } from "@tonaljs/tonal";
import { Tunings } from "../tunings.js";

var ALL_SCALES = [];
for (var scale of ScaleType.all()) {
  ALL_SCALES.push(scale.name);
  ALL_SCALES.push(...scale.aliases);
}

export default {
  name: "Editor",

  components: {
    Fretboard,
    Chords,
    Notation,
    // NoteSelect,
  },

  data: function () {
    return {
      usr_tuning: localStorage.getItem("tuning") || "E A D G B E",
      notation: "sharps",
      frets: 18,
      scale: { tonic: "A", type: "minor" },
      ShowMusicSheet: "false",
      ShowChords: "true",
    };
  },

  computed: {
    tuning: function () {
      if (!this.usr_tuning) return [];
      return this.usr_tuning.trim().split(" ").map(Note.chroma).reverse();
    },
    root: function () {
      return Note.chroma(this.scale.tonic);
    },
    notes: function () {
      return this.scale_info.notes.map(Note.chroma);
    },
    scale_info: function () {
      let name = this.scale.tonic + " " + this.scale.type;
      return Scale.get(name);
    },
    scaleChords: function () {
      return Mode.triads(this.scale_info.type, this.scale_info.tonic);
    },
    scale_search: function () {
      return ALL_SCALES.filter((option) => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.scale.type.toLowerCase()) >= 0
        );
      });
    },
    tuning_search() {
      const newData = [];
      Tunings.forEach((element) => {
        const items = element.tunings.filter(
          (item) =>
            item.tuning.toLowerCase().indexOf(this.usr_tuning.toLowerCase()) >=
            0
        );
        if (items.length) {
          newData.push({ instrument: element.instrument, tunings: items });
        }
      });
      return newData;
    },
  },

  methods: {
    saveSettings() {
      localStorage.setItem("tuning", this.usr_tuning);
    },
    normalize(notes) {
      return notes.map((x) => x % 12);
    },
    toname(x) {
      return Midi.midiToNoteName(x, {
        sharps: this.notation != "flat",
        pitchClass: true,
      });
    },
    scale_input(x) {
      if (x == "") {
        return;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
