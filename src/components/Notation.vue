<template>
  <div>
    <b-field grouped group-multiline position="is-centered">
      <b-field label="Notation"></b-field>
    </b-field>
    <hr />
    <div ref="musicNotation"></div>
    <div ref="guitarTab"></div>
  </div>
</template>
<script>
import Vex from "vexflow";
export default {
  name: "Notation-view",
  props: {
    scaleName: {
      type: String,
    },
    scale: {
      type: Object,
    },
  },
  // watch: {
  //   scaleName() {
  //     console.log("test");
  //   },
  // },
  mounted() {
    const { Renderer, Stave, StaveNote, Beam, Formatter } = Vex.Flow;
    const renderer = new Renderer(
      this.$refs.musicNotation,
      Renderer.Backends.SVG
    );
    const width = this.$refs.musicNotation.parentNode.parentElement.clientWidth;
    renderer.resize(width, 200);
    const context = renderer.getContext();
    // Create a VexFlow stave
    const stave = new Stave(10, 40, width);
    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context).draw();

    //const scaleNotes = ["C"];
    const num_beats = 4;
    const scaleNotes = this.scale.notes;
    const notes = [];
    scaleNotes.forEach((note, index) => {
      let pos = num_beats;
      if (index < num_beats / 2) pos = pos - 1;

      const vexNote = new StaveNote({
        keys: [`${note}/${pos}`],
        duration: "q",
      });
      notes.push(vexNote);
    });
    const beams = Beam.generateBeams(notes);
    Formatter.FormatAndDraw(context, stave, notes);
    beams.forEach((b) => {
      b.setContext(context).draw();
    });
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
};
</script>
<style>
.chords-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px;
}
.chord {
  display: flex;
  width: 50%;
}

.chord > div {
  display: flex;
  justify-content: center;
  flex: 1;
  height: 50%;
  box-shadow: px 1px 8px 0px rgba(0, 0, 0, 0.1);
}
</style>
