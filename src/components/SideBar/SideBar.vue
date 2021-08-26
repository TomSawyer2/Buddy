<template>
  <div v-bind:style="{ height: pageHeight + 'px' }">
    <v-navigation-drawer permanent expand-on-hover absolute>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img v-bind:src="avatarSrc"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ this.userName }}
            </v-list-item-title>
            <!-- <v-list-item-subtitle>email_address</v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="{ path: item.route }"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "SideBar",
  data() {
    return {
      pageHeight: 100,
      selectedItem: 0,
      items: [
        { text: "个人中心", icon: "mdi-home", route: "/personalInformation" },
        {
          text: "Buddy广场",
          icon: "mdi-account-multiple",
          route: "/buddySquare",
        },
        { text: "群组广场", icon: "mdi-vector-square", route: "/teamSquare" },
        { text: "退出", icon: "mdi-account-off", route: "/login" },
        // 这里可以拓展
      ],
      avatarSrc: "",
      userName: "",
    };
  },
  mounted() {
    // 自动调节组件高度
    this.pageHeight = document.documentElement.clientHeight;
    console.log(this.pageHeight);
    this.avatarSrc = this.$store.state.avatarSrc;
    this.userName = this.$store.state.userName;
  },
  computed: {
    monitor() {
      return this.$store.state.avatarSrc;
    },
  },
  watch: {
    monitor() {
      this.avatarSrc = this.$store.state.avatarSrc;
    },
  },
});
</script>
