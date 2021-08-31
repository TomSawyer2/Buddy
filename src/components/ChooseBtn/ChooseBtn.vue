<template>
  <v-col
    cols="12"
    class="mb-2"
    style="
      position: fixed;
      right: 0;
      top: 0;
      width: auto;
      height: auto;
      z-index: 999;
    "
  >
    <v-btn-toggle v-model="icon" borderless shaped mandatory>
      <v-btn value="received" @click="changeToReceive" style="z-index: 10000">
        <span class="hidden-sm-and-down">收到的请求</span>
        <v-badge
          color="green"
          :content="totalReceivedNum"
          :value="totalReceivedNum"
        >
          <v-icon right> mdi-download </v-icon>
        </v-badge>
      </v-btn>

      <v-btn value="sent" @click="changeToSent">
        <span class="hidden-sm-and-down">发出的请求</span>
        <v-badge color="green" :content="totalSentNum" :value="totalSentNum">
          <v-icon right> mdi-upload </v-icon>
        </v-badge>
      </v-btn>
    </v-btn-toggle>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "ChooseBtn",
  props: ["totalReceivedNum", "totalSentNum"],
  data() {
    return {
      icon: "",
      received: 1,
    };
  },
  methods: {
    changeToReceive() {
      (this as any).received = 1;
      (this as any).$emit("childReceived", (this as any).received);
    },
    changeToSent() {
      (this as any).received = 0;
      (this as any).$emit("childReceived", (this as any).received);
    },
  },
});
</script>
