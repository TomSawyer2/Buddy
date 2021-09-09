<template>
  <div
    v-bind:style="{ height: pageHeight + 'px' }"
    style="
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: center;
      align-items: center;
    "
  >
    <v-simple-table style="width: 80%;">
        <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">姓名</th>
                <th class="text-left">队员编号</th>
                <th class="text-left">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in userData" :key="item.id">
                <td>{{ item.userName }}</td>
                <td>{{ item.id ? item.id : "无" }}</td>
                <td><v-btn small @click="toDetail(item.id)">查看</v-btn></td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
  </div>
</template>

<script lang="ts">
import { getUserList, updateUserInfo, deleteUser } from "../apis";
import {
  setToken,
  getToken,
  removeToken,
  setPhone,
  setAvatarSrc,
  setUserName,
  removePhone,
  removeAvatarSrc,
  removeUserName,
} from "../utils/storage";
export default {
  data: () => ({
    pageHeight: 0,
    userData: [],
  }),
  mounted() {
    // 自动调节组件高度
    (this as any).pageHeight = document.documentElement.clientHeight;
    (this as any).getUserListFunc();
  },
  methods: {
      async getUserListFunc() {
          await getUserList()
            .then((res : any) => {
                console.log(res.data.data);
                (this as any).userData = res.data.data;
                (this as any).$message.success("成功获取用户信息！");
            })
            .catch((err : any) => {
                (this as any).$message.error("获取用户失败，请重试~");
            })
      }
  },
};
</script>
