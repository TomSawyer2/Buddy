<template>
  <v-bottom-navigation :value="value" color="primary" absolute>
    <v-btn @click="pushToPersonalInformation">
      <span>个人中心</span>

      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn @click="pushToBuddySquare">
      <span>Buddy广场</span>

      <v-icon>mdi-account-multiple</v-icon>
    </v-btn>

    <v-btn @click="pushToMessageCenter">
      <span>消息中心</span>

      <v-icon>mdi-vector-square</v-icon>
    </v-btn>

    <v-btn @click="pushToAdmin">
      <span>管理员界面</span>

      <v-icon>mdi-account-key</v-icon>
    </v-btn>

    <v-btn @click="pushToSettings">
      <span>设置</span>

      <v-icon>mdi-account-cog</v-icon>
    </v-btn>

    <v-btn @click="pushOut">
      <span>退出</span>

      <v-icon>mdi-account-off</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import Vue from "vue";
import { getPhone, getAvatarSrc, getUserName } from "@/utils/storage";
export default Vue.extend({
  name: "BottomBar",
  data() {
    return {
      value: 0,
    };
  },
  methods: {
    pushToPersonalInformation() {
      this.$router.push({ path: "/personalInformation" }).catch((err) => {
        console.log(err);
      });
    },
    pushToBuddySquare() {
      this.$router.push({ path: "/buddySquare" }).catch((err) => {
        console.log(err);
      });
    },
    pushToMessageCenter() {
      this.$router.push({ path: "/messageCenter" }).catch((err) => {
        console.log(err);
      });
    },
    pushToAdmin() {
      this.$router.push({ path: "/admin" }).catch((err) => {
        console.log(err);
      });
    },
    pushToSettings() {
      this.$router.push({ path: "/settings" }).catch((err) => {
        console.log(err);
      });
    },
    pushOut() {
      this.$router.push({ path: "/login" }).catch((err) => {
        console.log(err);
      });
    },
  },
});
</script>
