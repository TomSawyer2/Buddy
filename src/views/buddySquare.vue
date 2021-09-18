<template>
  <div class="buddy-container" :style="{ marginLeft: margin + 'px' }">
    <div class="search-container" :style="{ paddingTop: paddingTop + 'px' }">
      <BuddySearch
        @search="onSearch"
        @showAllChange="showAllChange"
      ></BuddySearch>
      <v-divider class="divider"></v-divider>
    </div>

    <div style="margin: 120px 20px 40px 20px">
      <BuddyList
        v-for="(item, index) in userList"
        :key="index"
        :item="item"
        :cardWidth="pageWidth - 90"
        @add="onAdd"
        @todetail="toDetail"
        :phone="phone"
        :isAllShow="isAllShow"
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
      class="d-flex"
      style="z-index: 10001"
      :width="dialogWidth"
    >
      <BuddyDetail
        :userInfo="buddyDetail"
        :isLoading="isDetailLoading"
        @add="onAdd"
        @close="onClose"
        v-if="ismobile == 0"
        v-bind:messageCenter="0"
      />
      <BuddyDetailMobile
        v-if="ismobile == 1"
        v-bind:messageCenter="0"
        :userInfo="buddyDetail"
        :isLoading="isDetailLoading"
        style="z-index: 10002"
        @add="onAdd"
      />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {
  getAllUsersByPage,
  getUserDetailById,
  getAllOldUsersByPage,
  postSendBuddyRequest,
  searchUsersByNameAndFields,
} from "@/apis";
import { transformAfterGet, transformBeforeUpdate } from "@/utils/transform";
import BuddyList from "@/components/BuddyList/BuddyList.vue";
import BuddyDetail from "@/components/BuddyDetail/BuddyDetail.vue";
import BuddyDetailMobile from "@/components/BuddyDetail/BuddyDetailMobile.vue";
import BuddySearch from "@/components/BuddySearch/BuddySearch.vue";
import Message from "@/components/Message";
import { getPhone } from "@/utils/storage";
export default {
  components: { BuddyList, BuddyDetail, BuddySearch, BuddyDetailMobile },
  data: () => ({
    pageHeight: document.documentElement.clientHeight,
    pageWidth: document.documentElement.clientWidth,
    userList: [],
    pageNo: 1,
    totalPage: 0,
    totalNum: -1,
    currentApllyInfo: {
      applyReason: "",
      id: "",
    },
    buddyDetail: {},
    isLoading: false,
    isDialogShow: false,
    isDetailShow: false,
    isDetailLoading: false,
    isErrorShow: false,
    phone: getPhone(),
    isAllShow: false,
    i: 0,
    margin: 56,
    paddingTop: 18,
    ismobile: 0,
    dialogWidth: null,
  }),

  methods: {
    onClose() {
      (this as any).isDetailShow = false;
    },

    showAllChange(isAllShow: boolean) {
      (this as any).isAllShow = isAllShow;
    },

    onAdd(id: string) {
      (this as any).isDialogShow = true;
      (this as any).currentApllyInfo.id = id;
    },

    handleCancle() {
      (this as any).isDialogShow = false;
      (this as any).isDetailShow = false;
      (this as any).isErrorShow = false;
      (this as any).currentApllyInfo.applyReason = "";
    },

    async handleAdd() {
      (this as any).isErrorShow = true;
      if ((this as any).currentApllyInfo.applyReason.length > 0) {
        try {
          let res = await postSendBuddyRequest((this as any).currentApllyInfo);
          (this as any).handleCancle();
          Message.success("发送成功！");
        } catch (error) {
          (this as any).handleCancle();
          console.log(error);
        }
      } else {
        Message.error("申请理由不能为空～"); // 由于前端做了验证，所以就没有对后端的返回做提示。
      }
    },

    async onSearch(searchInfo: {
      userName: string;
      fields: string[];
      graduateYear: number;
      managementExperience: string[];
      majors: string[];
      projectYear: number;
      projectIdentity: string;
      projectName: string;
      gains: string[];
      shares: string[];
      isEmpty: boolean;
    }) {
      if(searchInfo.isEmpty === false) {
        try {
          const res = (await searchUsersByNameAndFields(searchInfo)).data.data;
          (this as any).userList = res.SearchResults;
          if ((this as any).userList === null) {
            (this as any).userList = [];
          }
          (this as any).totalNum = res.Num;
        } catch (error) {
          (this as any).userList = [];
          (this as any).totalNum = 0;
          console.log(error);
        }
      } else {
        try {
          (this as any).userList = [];
          (this as any).getUserList(1);
        } catch (error) {
          console.log(error);
        }
      }
    },

    async getUserList(pageNo: number) {
      const res = (await getAllUsersByPage({ pageNo })).data.data;
      (this as any).userList = (this as any).userList.concat(res.studentsInfo); // 不直接从userList里面删掉自己，而是条件渲染，防止totalNum对不上
      for (
        (this as any).i;
        (this as any).i < (this as any).userList.length;
        (this as any).i++
      ) {
        (this as any).userList[(this as any).i] = transformAfterGet(
          (this as any).userList[(this as any).i]
        );
      }
      (this as any).totalPage = res.totalPage;
      (this as any).totalNum = res.totalNum;
    },

    async scrollEvent() {
      // 距离底部40px时加载一次
      let bottomOfWindow =
        document.documentElement.offsetHeight -
          document.documentElement.scrollTop -
          window.innerHeight <=
        40;
      const length = (this as any).userList.length;
      if (
        length < (this as any).totalNum &&
        (this as any).pageNo < (this as any).totalPage &&
        (this as any).isLoading == false &&
        bottomOfWindow
      ) {
        (this as any).isLoading = true;
        (this as any).pageNo++;
        setTimeout(() => {
          (this as any).getUserList((this as any).pageNo);
          (this as any).isLoading = false;
        }, 1000);
      }
    },

    async toDetail(id: string) {
      (this as any).isDetailLoading = true;
      (this as any).isDetailShow = true;
      try {
        let res = (await getUserDetailById({ id: id })).data.data;
        (this as any).buddyDetail = transformAfterGet(res);
        (this as any).isDetailLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },

  async mounted() {
    window.addEventListener("scroll", (this as any).scrollEvent);
    if (localStorage.getItem("ismobile") == "1") {
      (this as any).margin = 0;
      (this as any).paddingTop = 0;
      (this as any).ismobile = 1;
      (this as any).dialogWidth = 400;
    } else {
      (this as any).margin = 56;
      (this as any).paddingTop = 18;
      (this as any).ismobile = 0;
    }
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
  flex: 1;
  display: flex;
  flex-direction: column;
}

.search-container {
  position: fixed;
  width: 100%;
  background: white;
  z-index: 5;
  margin: 0 10px 0 0px;
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
