<template>
  <div style="display: flex">
    <SideBar />
    <router-view />
  </div>
</template>

<script lang="ts">
import Message from "@/components/Message";
import { getToken } from "@/utils/storage";
import Vue from "vue";
import SideBar from "@/components/SideBar/SideBar.vue";

export default Vue.extend({
  name: "Home",
  components: {
    SideBar,
  },
  mounted() {
    if (getToken().length === 0) {
      this.$router.push({ path: "/login" });
    }
  },
  watch: {
    $route(to, from) {
      if (to.path !== "/login") {
        if (getToken().length === 0) {
          Message.error("未登录！");
          this.$router.push({ path: "/login" });
        }
      }
    },
  },
});
</script>
