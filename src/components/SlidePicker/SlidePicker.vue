<template>
  <div>
    <t>性格自评（您认为自己的性格特征）</t>
    <v-slider
        v-model="character"
        :tick-labels="ticksLabels"
        :max="4"
        step="1"
        ticks="always"
        tick-size="6"
        @change="sendCharacter"
    ></v-slider>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "SlidePicker",
  props: ["character"],
  data() {
    return {
        ticksLabels: [
          '内向',
          '',
          '一般',
          '',
          '随和',
        ],
    };
  },
  methods: {
    sendCharacter (character) {
      (this as any).$emit("sendCharacter", (this as any).character);
    },
  },
});
</script>