<template>
  <div style="display: flex">
    <SideBar />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SideBar from "../components/SideBar/SideBar.vue";

export default Vue.extend({
  name: "Home",
  components: {
    SideBar,
  },
  mounted() {
    console.log(this.$store.state.isLogin);
    if (!this.$store.state.isLogin) {
      this.$router.push({ path: "/login" });
    }
  },
});
</script>
