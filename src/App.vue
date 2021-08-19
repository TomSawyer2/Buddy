<template>
  <v-app>
    <v-main>
      <v-card style="display: flex;">
        <SideBar />
        <router-view />
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import SideBar from "./components/SideBar.vue";

export default Vue.extend({
  name: "App",
  components: {
    // HelloWorld,
    SideBar,
  },
  data: () => ({
    //
  }),
});
</script>
