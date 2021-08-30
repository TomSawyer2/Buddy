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
    } else {
      this.$router.push({ path: "/personalInformation" });
    }
  },
  methods: {},
  watch: {
    $route(to, from) {
      if (to.path !== "/login") {
        if (getToken().length === 0) {
          Message.error("未登录！");
          this.$router.push({ path: "/login" });
        }
      }
      if (to.path === "/") {
        if (getToken().length > 0) {
          this.$router.push({ path: "/personalInformation" });
        }
      }
    },
  },
});
</script>
