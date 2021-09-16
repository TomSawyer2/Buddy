<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
// import SideBar from "./components/SideBar/SideBar.vue";

export default Vue.extend({
  name: "App",
  components: {
    // HelloWorld,
    // SideBar,
  },
  data: () => ({
    //
  }),
});
</script>

<style>
/* 隐藏横向滚动条 */
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
