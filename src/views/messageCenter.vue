<template>
  <div class="mainBox" :style="{ marginLeft: margin + 'px' }">
    <ChooseBtn
      @childReceived="childReceived"
      :totalReceivedNum="totalReceivedNum"
      :totalSentNum="totalSentNum"
    />

    <ReceivedReqs
      :received="received"
      :noReceivedRequests="noReceivedRequests"
      :receivedItems="receivedItems"
      :acceptNumber="acceptNumber"
      :buddyDetail="buddyDetail"
      @accept="acceptBuddyFunc"
      @refuse="refuseBuddyFunc"
      @todetail="onToDetail"
    />

    <SentReqs
      :noSentRequests="noSentRequests"
      :received="received"
      :sentItems="sentItems"
      :buddyDetail="buddyDetail"
      @todetail="onToDetail"
      @reason="saveReason"
      @weChatPic="pushToWeChatPic"
    />

    <div
      class="d-flex flex-no-wrap justify-space-between"
      v-if="noReceivedRequests == 1 && received == 1"
    >
      <h2 class="text-center text--secondary">暂无收到的请求</h2>
    </div>
    <div
      class="d-flex flex-no-wrap justify-space-between"
      v-if="noSentRequests == 1 && received == 0"
    >
      <h2 class="text-center text--secondary">暂无发出的请求</h2>
    </div>
  </div>
</template>

<script lang="ts">
import {
  getReceivedRequests,
  getSentRequests,
  acceptBuddy,
  refuseBuddy,
  postSendBuddyRequest,
  getUserDetailById,
} from "../apis";
import { getPhone } from "@/utils/storage";
import ChooseBtn from "@/components/ChooseBtn/ChooseBtn.vue";
import ReceivedReqs from "@/components/ReceivedReqs/ReceivedReqs.vue";
import SentReqs from "@/components/SentReqs/SentReqs.vue";
import { transformAfterGet, transformBeforeUpdate } from "@/utils/transform";
export default {
  components: { ChooseBtn, ReceivedReqs, SentReqs },
  data: () => ({
    getRequestsParams: {
      phoneNumber: "",
      pageNo: 1,
    },
    chooseBuddyParams: {
      id: "",
    },
    updateReasonParams: {
      id: "",
      applyReason: "",
    },
    receivedItems: [],
    sentItems: [],
    noReceivedRequests: 0, // 0代表有请求
    noSentRequests: 0,
    totalReceivedNum: 0,
    totalSentNum: 0,
    acceptNumber: 0,
    buddyDetail: {},
    received: 1,
    margin: 56,
  }),
  mounted() {
    if (localStorage.getItem("ismobile") == "1") {
      (this as any).margin = 0;
    } else {
      (this as any).margin = 56;
    }
    (this as any).getReceivedRequestsFunc();
    (this as any).getSentRequestsFunc();
  },
  methods: {
    childReceived(val) {
      (this as any).received = val;
    },
    async onToDetail(id: string) {
      try {
        let res = (await getUserDetailById({ id: id })).data.data;
        res.fields = res.fields != "" ? res.fields : "暂无";
        (this as any).buddyDetail = transformAfterGet(res);
      } catch (error) {
        console.log(error);
      }
    },
    async getReceivedRequestsFunc() {
      (this as any).getRequestsParams.phoneNumber = getPhone();
      await getReceivedRequests((this as any).getRequestsParams)
        .then((res: any) => {
          const data = res.data.data;
          (this as any).receivedItems = (this as any).receivedItems.concat(
            data.requestInfo
          );

          data.requestInfo.forEach((val: any, idx, array) => {
            transformAfterGet(data.requestInfo[idx]);
          });
          if ((this as any).acceptNumber != data.acceptNum) {
            (this as any).acceptNumber = data.acceptNum;
          }
          //如果数据不止一页则参数+1继续请求数据直到总数与本地数组总数相同
          if ((this as any).receivedItems.length != data.totalNum) {
            (this as any).getRequestsParams.pageNo++;
            getReceivedRequests((this as any).getRequestsParams);
          }
          (this as any).totalReceivedNum = data.totalNum;
          if (data.totalNum == 0) {
            (this as any).noReceivedRequests = 1;
          } else {
            (this as any).noReceivedRequests = 0;
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    },
    async getSentRequestsFunc() {
      (this as any).getRequestsParams.phoneNumber = getPhone();
      await getSentRequests((this as any).getRequestsParams)
        .then((res: any) => {
          const data = res.data.data;
          data.requestInfo.forEach((val: any, idx, array) => {
            transformAfterGet(data.requestInfo[idx]);
          });
          (this as any).sentItems = (this as any).sentItems.concat(
            data.requestInfo
          );
          //如果数据不止一页则参数+1继续请求数据直到总数与本地数组总数相同
          if ((this as any).sentItems.length != data.totalNum) {
            (this as any).getRequestsParams.pageNo++;
            getSentRequests((this as any).getRequestsParams);
          }
          (this as any).totalSentNum = data.totalNum;
          if (data.totalNum == 0) {
            (this as any).noSentRequests = 1;
          } else {
            (this as any).noSentRequests = 0;
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    },
    async acceptBuddyFunc(item: any) {
      item.status = 1;
      (this as any).chooseBuddyParams.id = item.id;
      await acceptBuddy((this as any).chooseBuddyParams)
        .then((res) => {
          (this as any).$message.success(
            "已成功确认" + item.userName + "为您的Buddy~"
          );
          (this as any).acceptNumber++;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async refuseBuddyFunc(item: any) {
      item.status = 2;
      (this as any).chooseBuddyParams.id = item.id;
      await refuseBuddy((this as any).chooseBuddyParams)
        .then((res) => {
          (this as any).$message.error("已拒绝" + item.userName);
        })
        .catch((err) => {
          console.log(err);
          (this as any).$message.error("确认时发生了一些错误，请重试~");
        });
    },
    async saveReason(item: any) {
      // 这个函数是用来修改理由的
      (this as any).updateReasonParams.id = item.id;
      (this as any).updateReasonParams.applyReason = item.applyReason;
      try {
        await postSendBuddyRequest((this as any).updateReasonParams);
        (this as any).updateReasonParams.applyReason = "";
        (this as any).$message.success("修改理由成功！");
      } catch (err) {
        (this as any).$message.error("修改理由失败，请重试~");
      }
    },
    pushToWeChatPic(item: any) {
      window.open(item.weChatPic, "_blank");
      (this as any).isDetailShow = false;
    },
  },
  watch: {
    acceptNumber: function (newVal: any, oldVal: any) {
      if (newVal == 3) {
        (this as any).$message.success("您可接收的小队员已满~");
        (this as any).totalReceivedNum = "已满";
      } else if (newVal == 2) {
        (this as any).$message.error(
          "若您再接收一名小队员，其余审核中的小队员将被自动拒绝"
        );
      } else {
        (this as any).$message.success(
          "您已接收了" +
            (this as any).acceptNumber +
            "位小队员，还可接收" +
            (3 - (this as any).acceptNumber) +
            "位小队员"
        );
      }
    },
  },
};
</script>

<style>
.mainBox {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>
