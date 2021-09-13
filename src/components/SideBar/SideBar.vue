<template>
  <div
    id="side-bar"
    v-bind:style="{
      height: '100%',
      position: 'fixed',
      width: width + 'px',
      zIndex: 1000,
    }"
    @click="openSwitch"
    v-clickoutside="closeBar"
  >
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

<script>
import Vue from "vue";
import { getPhone, getAvatarSrc, getUserName } from "@/utils/storage";
export default Vue.extend({
  name: "SideBar",
  data() {
    return {
      pageHeight: 100,
      selectedItem: 0,
      isOpen: false,
      width: 56,
      items: [
        { text: "个人中心", icon: "mdi-home", route: "/personalInformation" },
        {
          text: "Buddy广场",
          icon: "mdi-account-multiple",
          route: "/buddySquare",
        },
        {
          text: "消息中心",
          icon: "mdi-vector-square",
          route: "/messageCenter",
        },
        {
          text: "设置",
          icon: "mdi-account-cog",
          route: "/settings",
        },
        { text: "退出", icon: "mdi-account-off", route: "/login" },
        // 这里可以拓展
      ],
      itemsForAdmin: [
        { text: "个人中心", icon: "mdi-home", route: "/personalInformation" },
        {
          text: "Buddy广场",
          icon: "mdi-account-multiple",
          route: "/buddySquare",
        },
        {
          text: "消息中心",
          icon: "mdi-vector-square",
          route: "/messageCenter",
        },
        {
          text: "设置",
          icon: "mdi-account-cog",
          route: "/settings",
        },
        {
          text: "管理员界面",
          icon: "mdi-account-key",
          route: "/admin",
        },
        { text: "退出", icon: "mdi-account-off", route: "/login" },
        // 这里可以拓展
      ],
      avatarSrc: "",
      userName: "",
    };
  },
  methods: {
    openSwitch() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        const timerOpen = setInterval(() => {
          if (this.width < 256) {
            this.width += 7;
          } else {
            clearInterval(timerOpen);
          }
        }, 0.005);
      } else {
        const timerClose = setInterval(() => {
          if (this.width > 56) {
            this.width -= 7;
          } else {
            clearInterval(timerClose);
          }
        }, 0.005);
      }
    },
    closeBar() {
      this.isOpen = !this.isOpen;
    },
  },
  mounted() {
    // 自动调节组件高度
    this.pageHeight = document.documentElement.clientHeight;
    if(localStorage.getItem('permission') == '1' || localStorage.getItem('permission') == '2') {
        this.items = this.itemsForAdmin;
    }
    console.log(this.pageHeight);
    this.avatarSrc = getAvatarSrc();
    this.userName = getUserName();
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
  directives: {
    clickoutside: {
      // 初始化指令
      bind(el, binding, vnode) {
        function documentHandler(e) {
          // 这里判断点击的元素是否是本身，是本身，则返回
          if (el.contains(e.target)) {
            return false;
          }
          // 判断指令中是否绑定了函数
          if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            binding.value(e);
          }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener("click", documentHandler);
      },
      update() {
        return;
      },
      unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener("click", el.__vueClickOutside__);
        delete el.__vueClickOutside__;
      },
    },
  },
});
</script>
