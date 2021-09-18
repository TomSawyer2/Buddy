<template>
  <div :style="{ display: display }">
    <SideBar v-if="ismobile == 0" />
    <router-view />
    <BottomBar
      v-if="ismobile == 1"
      style="
        position: fixed;
        width: 100%;
        background: white;
        z-index: 5;
        margin: 0 0px 0px 0px;
      "
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
    
    var styleTitle1 = `
    font-size: 20px;
    font-weight: 600;
    color: rgb(244,167,89);
    `
    var styleTitle2 = `
    font-style: oblique;
    font-size:14px;
    color: rgb(244,167,89);
    font-weight: 400;
    `
    /* 内容代码 */
    var title1 = ' Buddy '
    var title2 = '内测版本1.0.0'
    
    // => 读取配置型(在配置文件里配置这些会变动的网址)
    console.log(`%c${title1} %c${title2}`, styleTitle1, styleTitle2)
    let a = 'background: #606060; color: #fff; border-radius: 3px 0 0 3px;font-size: 15px'
    let b = 'background: #1475B2; color: #fff; border-radius: 0 3px 3px 0;font-size: 15px'
    let c = 'font-size: 15px; color: #000; margin-bottom: 5px;'
    console.log(`%c 都看到这里了，不来聊聊天吗(～￣▽￣)～ \n%c  QQ %c 6272867 \n%c  Github %c TomSawyer2 \n%c  E-mail %c yousaling@hust.edu.cn`, c, a, b, a, b, a, b);
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

<style></style>
