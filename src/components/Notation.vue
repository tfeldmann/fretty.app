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
  watch: {
    scaleName() {
      this.render();
    },
  },
  mounted() {
    this.render();
  },
  methods: {
    render() {
      if (this.$refs.musicNotation.children.length > 0)
        this.$refs.musicNotation.removeChild(
          this.$refs.musicNotation.children[0]
        );
      const { Renderer, Stave, Accidental, StaveNote, Beam, Formatter } =
        Vex.Flow;
      const renderer = new Renderer(
        this.$refs.musicNotation,
        Renderer.Backends.SVG
      );
      const width =
        this.$refs.musicNotation.parentNode.parentElement.clientWidth;
      renderer.resize(width, 200);
      const context = renderer.getContext();
      // Create a VexFlow stave
      const stave = new Stave(10, 40, width);
      stave.addClef("treble").addTimeSignature("4/4");
      stave.setContext(context).draw();
      const scaleNotes = this.scale.notes;
      const notes = [];
      let pos = 4;
      scaleNotes.forEach((note) => {
        if (note[0].toUpperCase() == "C") pos = pos + 1;

        const vexNote = new StaveNote({
          keys: [`${note}/${pos}`],
          duration: "q",
        });
        if (note[1] != undefined) vexNote.addModifier(new Accidental(note[1]));
        notes.push(vexNote);
      });
      const beams = Beam.generateBeams(notes);
      Formatter.FormatAndDraw(context, stave, notes);
      beams.forEach((b) => {
        b.setContext(context).draw();
      });
    },
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
