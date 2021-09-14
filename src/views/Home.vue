<template>
  <div :style="{ display: display }">
    <SideBar v-if="ismobile == 0" />
    <router-view />
    <BottomBar
      v-if="ismobile == 1"
      style="position: fixed;
        width: 100%;
        background: white;
        z-index: 5;
        margin: 0 0px -17px 0px;"
    />
  </div>
</template>

<script lang="ts">
import Message from "@/components/Message";
import { getToken } from "@/utils/storage";
import Vue from "vue";
import SideBar from "@/components/SideBar/SideBar.vue";
import BottomBar from "@/components/BottomBar/BottomBar.vue";

export default Vue.extend({
  name: "Home",
  components: {
    SideBar,
    BottomBar,
  },
  data() {
    return {
      flag: null,
      ismobile: 0,
      display: "",
    };
  },
  mounted() {
    if (getToken().length === 0 && this.$route.path != "/login") {
      this.$router.push({ path: "/login" }).catch((err) => {
        console.log(err);
      });
    } else if (this.$route.path != "/personalInformation") {
      this.$router.push({ path: "/personalInformation" }).catch((err) => {
        console.log(err);
      });
    }
    let flag = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    (this as any).ismobile = flag ? 1 : 0;
    if ((this as any).ismobile == 0) {
      (this as any).display = "flex";
    }
    localStorage.setItem("ismobile", (this as any).ismobile);
  },
  watch: {
    $route(to, from) {
      if (to.path !== "/login") {
        if (getToken().length === 0) {
          Message.error("未登录！");
          this.$router.push({ path: "/login" }).catch((err) => {
            console.log(err);
          });
        }
      }
      if (to.path === "/") {
        if (getToken().length > 0) {
          this.$router.push({ path: "/personalInformation" }).catch((err) => {
            console.log(err);
          });
        }
      }
    },
  },
});
</script>

<style>
</style>