<template>
  <div style="margin-left: 56px; flex: 1">
    <h1 class="search-container">这里是搜索框</h1>
    <v-divider style="margin-top: 52px; position: fixed"></v-divider>

    <div style="margin-top: 56px; margin-left: 20px">
      <BuddyList
        v-for="(item, index) in userList"
        :key="index"
        :item="item"
        :cardWidth="pageWidth - 90"
        @add="onAdd"
      />
      <p v-if="totalPage === pageNo" class="info-bottom">滑到底啦～</p>
      <p v-else class="info-bottom">加载中...</p>
    </div>
    <v-dialog
      v-model="isDialogShow"
      persistent
      max-width="600px"
      transition="dialog-bottom-transition"
      style="z-index: 10001"
    >
      <v-card style="padding: 25px">
        <v-textarea
          label="请求理由"
          placeholder="你可以在这里写下你想对老队员说的话，若多次提交则仅保留最后一次的申请理由"
          v-model="currentApllyInfo.applyReason"
          required
        ></v-textarea>
        <div style="display: flex; justify-content: space-evenly">
          <v-btn color="normal" @click="handleCancle"> 取消 </v-btn>
          <v-btn color="primary" @click="handleAdd"> 提交 </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { getAllUsersByPage, postSendBuddyRequest } from "@/apis";
import BuddyList from "@/components/BuddyList/BuddyList.vue";
import Message from "@/components/Message";
import { getPhone } from "@/utils/storage";
export default {
  components: { BuddyList },
  data: () => ({
    pageHeight: document.documentElement.clientHeight,
    pageWidth: document.documentElement.clientWidth,
    userList: [],
    pageNo: 1,
    totalPage: 0,
    currentApllyInfo: {
      applyReason: "",
      phoneNumber: "",
      teacherPhoneNumber: "",
      teacherName: "",
    },
    isLoading: false,
    isDialogShow: false,
  }),

  methods: {
    onAdd(teacherPhoneNumber: string, teacherName: string) {
      this.isDialogShow = true;
      this.currentApllyInfo.teacherPhoneNumber = teacherPhoneNumber;
      this.currentApllyInfo.teacherName = teacherName;
    },
    handleCancle() {
      this.isDialogShow = false;
      this.currentApllyInfo.applyReason = "";
    },
    async handleAdd() {
      if (this.currentApllyInfo.applyReason.length > 0) {
        try {
          let res = await postSendBuddyRequest(this.currentApllyInfo);
          Message.success("发送成功！");
          this.handleCancle();
        } catch (error) {
          console.log(error);
        }
      } else {
        Message.error("申请理由不能为空～"); // 由于前端做了验证，所以就没有对后端的返回做提示。
      }
    },
    async getUserList(pageNo: number) {
      const res = (await getAllUsersByPage({ pageNo })).data.data;
      res.studentsInfo.map((user: any) => {
        if (user.phoneNumber !== this.currentApllyInfo.phoneNumber) {
          user.field = user.field.length > 0 ? user.field.split(";") : [];
          this.userList.push(user);
        }
      });
      this.totalPage = res.totalPage;
      console.log(this.userList);
    },
    async scrollEvent() {
      // 距离底部20px时加载一次
      let bottomOfWindow =
        document.documentElement.offsetHeight -
          document.documentElement.scrollTop -
          window.innerHeight <=
        20;
      if (
        this.pageNo < this.totalPage &&
        this.isLoading == false &&
        bottomOfWindow
      ) {
        this.isLoading = true;
        this.pageNo++;
        this.getUserList(this.pageNo);
        this.isLoading = false;
      }
    },
  },
  async mounted() {
    window.addEventListener("scroll", this.scrollEvent);
    this.currentApllyInfo.phoneNumber = getPhone();
    try {
      this.getUserList(1);
    } catch (error) {
      console.log(error);
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollEvent);
  },
};
</script>

<style scoped>
.search-container {
  height: 50px;
  position: fixed;
  width: 100%;
  background: white;
  z-index: 999;
}
.info-bottom {
  text-align: center;
  margin-top: 10px;
}
</style>