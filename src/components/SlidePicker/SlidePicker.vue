<template>
  <div>
    <v-slider
      v-model="characterChild"
      :tick-labels="ticksLabels"
      :max="4"
      step="1"
      ticks="always"
      tick-size="2"
      @change="sendCharacter"
      :disabled="isDisabled"
    ></v-slider>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "SlidePicker",
  props: ["character", "isDisabled"],
  data() {
    return {
      ticksLabels: ["内向", "", "一般", "", "随和"],
      characterChild: 2,
    };
  },
  mounted() {
    (this as any).characterChild = (this as any).character;
  },
  methods: {
    sendCharacter(characterChild) {
      (this as any).$emit("sendCharacter", (this as any).characterChild);
    },
  },
  watch: {
    character(newV, oldV) {
      (this as any).characterChild = newV;
    },
  },
});
</script>
