<template>
  <div class="buddy-container">
    <div class="search-container">
      <BuddySearch @search="onSearch"></BuddySearch>
      <v-divider class="divider"></v-divider>
    </div>

    <div style="margin: 120px 20px 0 20px">
      <BuddyList
        v-for="(item, index) in userList"
        :key="index"
        :item="item"
        :cardWidth="pageWidth - 90"
        @add="onAdd"
        @todetail="toDetail"
      />
      <p v-if="totalNum === userList.length" class="info-bottom">
        我是有底线的(/▽＼)
      </p>
      <p v-else class="info-bottom">小点正在玩命加载中(/▽＼)...</p>
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
        <div
          v-if="isErrorShow && currentApllyInfo.applyReason.length <= 0"
          style="color: red"
        >
          理由不能为空哦～
        </div>
        <div style="display: flex; justify-content: space-evenly">
          <v-btn color="normal" @click="handleCancle"> 取消 </v-btn>
          <v-btn color="primary" @click="handleAdd"> 提交 </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="isDetailShow"
      transition="dialog-bottom-transition"
      style="z-index: 10001"
    >
      <BuddyDetail
        :userInfo="buddyDetail"
        :isLoading="isDetailLoading"
        @add="onAdd"
      />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {
  getAllOldUsersByPage,
  getAllUsersByPage,
  getUserDetailByPhone,
  postSendBuddyRequest,
  searchUsersByNameAndFields,
} from "@/apis";
import BuddyList from "@/components/BuddyList/BuddyList.vue";
import BuddyDetail from "@/components/BuddyDetail/BuddyDetail.vue";
import BuddySearch from "@/components/BuddySearch/BuddySearch.vue";
import Message from "@/components/Message";
import { getPhone } from "@/utils/storage";
export default {
  components: { BuddyList, BuddyDetail, BuddySearch },
  data: () => ({
    pageHeight: document.documentElement.clientHeight,
    pageWidth: document.documentElement.clientWidth,
    userList: [],
    pageNo: 1,
    totalPage: 0,
    totalNum: -1,
    currentApllyInfo: {
      applyReason: "",
      phoneNumber: "",
      teacherPhoneNumber: "",
    },
    buddyDetail: {},
    isLoading: false,
    isDialogShow: false,
    isDetailShow: false,
    isDetailLoading: false,
    isErrorShow: false,
  }),

  methods: {
    onAdd(teacherPhoneNumber: string) {
      (this as any).isDialogShow = true;
      (this as any).currentApllyInfo.teacherPhoneNumber = teacherPhoneNumber;
    },

    handleCancle() {
      (this as any).isDialogShow = false;
      (this as any).isErrorShow = false;
      (this as any).currentApllyInfo.applyReason = "";
    },

    async handleAdd() {
      (this as any).isErrorShow = true;
      if ((this as any).currentApllyInfo.applyReason.length > 0) {
        try {
          let res = await postSendBuddyRequest((this as any).currentApllyInfo);
          Message.success("发送成功！");
          (this as any).handleCancle();
        } catch (error) {
          console.log(error);
        }
      } else {
        Message.error("申请理由不能为空～"); // 由于前端做了验证，所以就没有对后端的返回做提示。
      }
    },

    async onSearch(searchInfo: { userName: string; fields: string[] }) {
      try {
        const res = (await searchUsersByNameAndFields(searchInfo)).data;
        this.userList = res.data ? res.data.SearchResults : [];
        this.totalNum = res.data ? res.data.Num : 0;
        console.log(this.userList);
      } catch (error) {
        console.log(error);
      }
    },

    async getUserList(pageNo: number) {
      const res = (await getAllUsersByPage({ pageNo })).data.data;
      (this as any).userList = (this as any).userList.concat(res.studentsInfo);
      (this as any).totalPage = res.totalPage;
      (this as any).totalNum = res.totalNum;
    },

    async scrollEvent() {
      // 距离底部20px时加载一次
      let bottomOfWindow =
        document.documentElement.offsetHeight -
          document.documentElement.scrollTop -
          window.innerHeight <=
        20;
      const length = this.userList.length;
      if (
        length < (this as any).totalNum &&
        (this as any).pageNo < (this as any).totalPage &&
        (this as any).isLoading == false &&
        bottomOfWindow
      ) {
        (this as any).isLoading = true;
        (this as any).pageNo++;
        (this as any).getUserList((this as any).pageNo);
        (this as any).isLoading = false;
      }
    },

    async toDetail(teacherPhone: string) {
      (this as any).isDetailLoading = true;
      (this as any).isDetailShow = true;
      try {
        let res = (await getUserDetailByPhone({ phoneNumber: teacherPhone }))
          .data.data;
        res.hobby = res.hobby.length > 0 ? res.hobby.split(" ") : [];
        (this as any).buddyDetail = res;
        (this as any).isDetailLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },

  async mounted() {
    window.addEventListener("scroll", (this as any).scrollEvent);
    (this as any).currentApllyInfo.phoneNumber = getPhone();
    try {
      (this as any).getUserList(1);
    } catch (error) {
      console.log(error);
    }
  },

  beforeDestroy() {
    window.removeEventListener("scroll", (this as any).scrollEvent, true);
  },
};
</script>

<style scoped>
.buddy-container {
  margin-left: 56px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.search-container {
  position: fixed;
  width: 100%;
  background: white;
  z-index: 999;
  margin: 0 10px 0 10px;
}
.search-container .divider {
  position: fixed;
  width: 100%;
  margin-left: -10px;
}
.info-bottom {
  text-align: center;
  margin-top: 10px;
}
</style>