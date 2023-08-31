<template>
  <div>
    <b-field grouped group-multiline position="is-centered">
      <b-field label="Scale Chords"></b-field>
    </b-field>
    <hr />
    <div class="chords-container">
      <div class="chord" v-for="chord in chords" :key="chord">
        <div>
          {{ chord }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Chords-view",
  props: {
    chords: {
      type: Array,
      default: () => [],
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
