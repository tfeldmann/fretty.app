<template>
  <div>
    <b-input
      type="text"
      ref="input"
      v-on:input="computedValue"
      v-model="computedValue"
      v-bind="$attrs"
      :size="size"
      :disabled="disabled"
      :readonly="!editable"
      :loading="loading"
      :rounded="rounded"
      :icon="icon"
      :icon-pack="iconPack"
      :autocomplete="autocomplete"
      :expanded="expanded"
      :use-html5-validation="false"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
    <div class="b-numberinput field" :class="fieldClasses">
      <p
        v-if="controls"
        class="control"
        @mouseup="onStopLongPress(false)"
        @mouseleave="onStopLongPress(false)"
        @touchend="onStopLongPress(false)"
        @touchcancel="onStopLongPress(false)"
      >
        <button
          type="button"
          class="button"
          :class="buttonClasses"
          @mousedown="onStartLongPress($event, false)"
          @touchstart.prevent="onStartLongPress($event, false)"
          @click="onControlClick($event, false)"
        >
          <b-icon icon="minus" both :pack="iconPack" :size="iconSize" />
        </button>
      </p>
      <b-input
        type="text"
        ref="input"
        :value="computedValue"
        v-model="computedValue"
        v-bind="$attrs"
        :size="size"
        :disabled="disabled"
        :readonly="!editable"
        :loading="loading"
        :rounded="rounded"
        :icon="icon"
        :icon-pack="iconPack"
        :autocomplete="autocomplete"
        :expanded="expanded"
        :use-html5-validation="false"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
      <p
        v-if="controls"
        class="control"
        @mouseup="onStopLongPress(true)"
        @mouseleave="onStopLongPress(true)"
        @touchend="onStopLongPress(true)"
        @touchcancel="onStopLongPress(true)"
      >
        <button
          type="button"
          class="button"
          :class="buttonClasses"
          @mousedown="onStartLongPress($event, true)"
          @touchstart.prevent="onStartLongPress($event, true)"
          @click="onControlClick($event, true)"
        >
          <b-icon icon="plus" both :pack="iconPack" :size="iconSize" />
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { Midi, Note } from "@tonaljs/tonal";
import Icon from "buefy/src/components/icon/Icon";
import Input from "buefy/src/components/input/Input";
import FormElementMixin from "buefy/src/utils/FormElementMixin";

export default {
  name: "NoteSelect",
  components: {
    [Icon.name]: Icon,
    [Input.name]: Input
  },
  mixins: [FormElementMixin],
  inheritAttrs: false,
  props: {
    note: Number,
    disabled: Boolean,
    type: {
      type: String,
      default: "is-primary"
    },
    editable: {
      type: Boolean,
      default: true
    },
    controls: {
      type: Boolean,
      default: true
    },
    controlsRounded: {
      type: Boolean,
      default: false
    },
    controlsPosition: String
  },
  data() {
    return {
      newValue: !isNaN(this.note) ? this.note : 0
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.toname(this.newValue); // toname(Math.abs(this.newValue) % 12);
      },
      set(value) {
        console.log(value);
        value = Note.chroma(value);
        let newValue = value;
        if (value != undefined) {
          this.newValue = newValue;
          this.$emit("input", newValue);
          !this.isValid && this.$refs.input.checkHtml5Validity();
        }
      }
    },
    fieldClasses() {
      return [
        { "has-addons": this.controlsPosition === "compact" },
        { "is-grouped": this.controlsPosition !== "compact" },
        { "is-expanded": this.expanded }
      ];
    },
    buttonClasses() {
      return [this.type, this.size, { "is-rounded": this.controlsRounded }];
    }
  },
  watch: {
    /**
     * When v-model is changed:
     *   1. Set internal value.
     */
    value(value) {
      this.newValue = value;
    }
  },
  methods: {
    toname(x) {
      return Midi.midiToNoteName(x, {
        sharps: this.sharps == "sharps",
        pitchClass: true
      });
    },
    decrement() {
      this.newValue = this.newValue == 0 ? 11 : this.newValue - 1;
    },
    increment() {
      this.newValue = this.newValue == 11 ? 0 : this.newValue + 1;
    },
    onControlClick(event, inc) {
      // IE 11 -> filter click event
      if (event.detail !== 0 || event.type === "click") return;
      if (inc) this.increment();
      else this.decrement();
    },
    onStartLongPress(event, inc) {
      if (event.button !== 0 && event.type !== "touchstart") return;
      this._$intervalTime = new Date();
      clearInterval(this._$intervalRef);
      this._$intervalRef = setInterval(() => {
        if (inc) this.increment();
        else this.decrement();
      }, 250);
    },
    onStopLongPress(inc) {
      if (!this._$intervalRef) return;
      const d = new Date();
      if (d - this._$intervalTime < 250) {
        if (inc) this.increment();
        else this.decrement();
      }
      clearInterval(this._$intervalRef);
      this._$intervalRef = null;
    }
  }
};
</script>

<style scoped>
input {
  text-align: center;
}
</style>
