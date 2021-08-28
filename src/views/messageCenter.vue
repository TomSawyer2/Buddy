<template>
  <div
    style="
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: center;
      align-items: center;
    "
  >
    <v-col
      cols="12"
      class="mb-2"
      style="position: fixed; right: 0; top: 0; width: auto; height: auto; z-index: 999;"
    >
      <v-btn-toggle v-model="icon" borderless shaped mandatory>
        <v-btn value="received" @click="changeToReceive">
          <span class="hidden-sm-and-down">收到的请求</span>
          <v-badge
            color="green"
            :content="totalReceivedNum"
            :value="totalReceivedNum"
            style="z-index:1000;"
          >
            <v-icon right> mdi-download </v-icon>
          </v-badge>
        </v-btn>

        <v-btn value="sent" @click="changeToSent">
          <span class="hidden-sm-and-down">发出的请求</span>
          <v-badge
            color="green"
            :content="totalSentNum"
            :value="totalSentNum"
            style="z-index:1000;"
          >
            <v-icon right> mdi-upload </v-icon>
          </v-badge>
        </v-btn>
      </v-btn-toggle>
    </v-col>
    <v-container class="mt-13 mb-3" v-if="noReceivedRequests == 0 && received == 1">
      <v-row dense>
        <div v-if="received">
          <!-- <h3>您目前收到了{{ totalReceivedNum }}份请求：</h3> -->
          <v-col v-for="(item, i) in receivedItems" :key="i" cols="12" class="mt-5">
            <v-hover v-slot="{ hover }" open-delay="100">
              <v-card :elevation="hover ? 12 : 2">
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title
                      class="text-h5"
                      v-text="item.studentName"
                    ></v-card-title>

                    <v-card-subtitle
                      v-text="item.studentPhoneNumber"
                    ></v-card-subtitle>
                    <v-card-text>
                      <v-row>
                        <div class="grey--text ms-3 mr-5">
                          性别：{{ item.sex ? item.sex : "暂无" }}
                        </div>
                        <div class="grey--text ms-3 mr-5">
                          队员编号：{{ item.number ? item.number : "暂无" }}
                        </div>
                        <div class="grey--text ms-3 mr-5">
                          身份：{{ item.identity ? item.identity : "暂无" }}
                        </div>
                        <div class="grey--text ms-3 mr-5">
                          爱好：{{ item.hobby ? item.hobby : "暂无" }}
                        </div>
                        <div class="grey--text ms-3 mr-5">
                          队内经历：{{
                            item.teamExperience ? item.teamExperience : "暂无"
                          }}
                        </div>
                        <div class="grey--text ms-3 mr-5">
                          履历：{{ item.resume ? item.resume : "暂无" }}
                        </div>
                        <div class="grey--text ms-3 mr-5">
                          毕业高中：{{
                            item.highSchool ? item.highSchool : "暂无"
                          }}
                        </div>
                        <div class="grey--text ms-3 mr-5">
                          分站：{{ item.substation ? item.substation : "暂无" }}
                        </div>
                        <div class="grey--text ms-3">
                          备注：{{ item.notes ? item.notes : "暂无" }}
                        </div>
                      </v-row>
                      <v-row>
                        <h3 class="text--secondary ms-3 mr-5 mt-2">
                          理由：{{ item.applyReason ? item.applyReason : "暂无" }}
                        </h3>
                      </v-row>
                    </v-card-text>
                    <v-divider class="ml-4"></v-divider>
                    <v-card-text v-if="item.field.length - 1">
                      <v-row>
                        <v-sheet class="ml-3 mx-auto mt-1 mb-1">
                          <div>
                            <v-chip v-for="tag in item.field" :key="tag" class="mr-1">
                              {{ tag }}
                            </v-chip>
                          </div>
                        </v-sheet>
                      </v-row>
                    </v-card-text>
                    <v-row v-if="item.status == 0">
                      <v-col>
                        <v-card-actions>
                          <v-btn class="ml-2" outlined rounded small color="success" @click="acceptBuddyFunc(item)">
                            接受
                          </v-btn>
                          <v-btn outlined rounded small color="error" @click="refuseBuddyFunc(item)"> 拒绝 </v-btn>
                        </v-card-actions>
                      </v-col>
                    </v-row>
                  </div>
                  <v-avatar class="ma-3" size="125">
                    <v-img
                      v-bind:src="item.avatar"
                    ></v-img>
                  </v-avatar>
                </div>
              </v-card>
            </v-hover>
          </v-col>
        </div>
      </v-row>
    </v-container>
    <v-container class="mt-13 mb-3" v-if="noSentRequests == 0 && received == 0">
      <v-row dense>
        <div v-if="received == 0">
          <v-col v-for="(item, i) in sentItems" :key="i" cols="12" class="mt-5">
            <v-hover v-slot="{ hover }" open-delay="100">
              <v-card color="#FFFFFF" :elevation="hover ? 12 : 2">
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title
                      class="text-h5"
                      v-text="item.teacherName"
                    ></v-card-title>

                    <v-card-subtitle
                      v-text="item.teacherPhoneNumber"
                    ></v-card-subtitle>
                    <v-card-text>
                      <v-row>
                        <div class="grey--text ms-3 mr-5">
                          性别：{{ item.sex ? item.sex : "暂无" }}
                        </div>
                        <div class="grey--text ms-3 mr-5">
                          队员编号：{{ item.number ? item.number : "暂无" }}
                        </div>
                        <div class="grey--text ms-3 mr-5">
                          身份：{{ item.identity ? item.identity : "暂无" }}
                        </div>
                        <div class="grey--text ms-3 mr-5">
                          爱好：{{ item.hobby ? item.hobby : "暂无" }}
                        </div>
                        <div class="grey--text ms-3 mr-5">
                          队内经历：{{
                            item.teamExperience ? item.teamExperience : "暂无"
                          }}
                        </div>
                        <div class="grey--text ms-3 mr-5">
                          履历：{{ item.resume ? item.resume : "暂无" }}
                        </div>
                        <div class="grey--text ms-3 mr-5">
                          毕业高中：{{
                            item.highSchool ? item.highSchool : "暂无"
                          }}
                        </div>
                        <div class="grey--text ms-3 mr-5">
                          分站：{{ item.substation ? item.substation : "暂无" }}
                        </div>
                        <div class="grey--text ms-3">
                          备注：{{ item.notes ? item.notes : "暂无" }}
                        </div>
                      </v-row>
                    </v-card-text>
                    <v-divider class="ml-4"></v-divider>
                    <v-row v-if="item.field.length - 1">
                      <v-sheet class="ml-4 mx-auto my-auto">
                        <v-chip-group active-class="primary--text" column>
                          <v-chip v-for="tag in item.field" :key="tag">
                            {{ tag }}
                          </v-chip>
                        </v-chip-group>
                      </v-sheet>
                    </v-row>
                    <v-row class="ml-4 mt-2 mb-2 text--disabled">
                      <h4>{{ buddyStatus[item.status] }}</h4>
                      <!-- <v-btn style="right:0;width:auto;height:auto;" class="ml-4">修改理由</v-btn> -->
                      <v-btn
                            dark
                            class="ml-4"
                            style="right:0;width:auto;height:auto;"
                            @click.stop="reasonDialog = true"
                      >
                        修改理由
                      </v-btn>
                      <v-dialog
                        v-model="reasonDialog"
                        persistent
                        max-width="600px"
                        style="z-index: 1001;"
                      >
                        <v-card>
                          <v-card-title>
                            <span class="text-h5 mt-4 ml-2">修改申请理由</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container class="mt-5">
                              <v-row>
                                <v-col>
                                  <v-text-field
                                    label="填写申请的理由"
                                    clearable
                                    :value="item.applyReason"
                                    v-model="item.applyReason"
                                  >
                                  </v-text-field>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="reasonDialog = false"
                              class="mb-6"
                            >
                              关闭
                            </v-btn>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="saveReason(item)"
                              class="mb-6 mr-5"
                            >
                              保存
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-row>
                  </div>
                  <v-avatar class="ma-3" size="125">
                    <v-img
                      v-bind:src="item.avatar"
                    ></v-img>
                  </v-avatar>
                </div>
              </v-card>
            </v-hover>
          </v-col>
        </div>
      </v-row>
    </v-container>
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
import { getReceivedRequests, getSentRequests, acceptBuddy, refuseBuddy, postSendBuddyRequest } from "../apis";
export default {
  data: () => ({
    icon: "",//不加会报错
    buddyStatus: [
      "审核中",
      "老队员已接受申请~",
      "老队员拒绝了申请~"
    ],
    getReceivedRequestsParams: {
      phoneNumber: "",
      pageNo: 1,
    },
    getSentRequestsParams: {
      phoneNumber: "",
      pageNo: 1,
    },
    acceptBuddyParams: {
      phoneNumber: "",
      studentPhoneNumber: "",
    },
    refuseBuddyParams: {
      phoneNumber: "",
      studentPhoneNumber: "",
    },
    updateReasonParams: {
      phoneNumber: "",
      teacherName: "",
      teacherPhoneNumber: "",
      applyReason: "",
    },
    reasonDialog: false,
    receivedItems: [],
    sentItems: [],
    noReceivedRequests: 0, // 0代表有请求
    noSentRequests: 0,
    totalReceivedNum: 0,
    totalSentNum: 0,
    received: 1, //收到页面
  }),
  mounted() {
    (this as any).getReceivedRequestsFunc();
    (this as any).getSentRequestsFunc();
  },
  methods: {
    changeToReceive() {
      (this as any).received = 1;
    },
    changeToSent() {
      (this as any).received = 0;
    },
    async getReceivedRequestsFunc () {
      (this as any).getReceivedRequestsParams.phoneNumber = (this as any).$store.state.phoneNumber;
      await getReceivedRequests((this as any).getReceivedRequestsParams)
      .then((res: any) => {
        const data = res.data.data;
        (this as any).receivedItems = (this as any).receivedItems.concat(data.requestInfo);
        console.log((this as any).receivedItems);
        //如果数据不止一页则参数+1继续请求数据直到总数与本地数组总数相同
        console.log("当前本地的数量：" + (this as any).receivedItems.length);
        console.log("当前后台的数量：" + data.totalNum);
        if ((this as any).receivedItems.length != data.totalNum) {
          (this as any).getReceivedRequestsParams.pageNo ++;
          console.log("继续请求，当前请求第" + (this as any).getReceivedRequestsParams.pageNo + "页");
          getReceivedRequests((this as any).getReceivedRequestsParams);
        }
        (this as any).totalReceivedNum = data.totalNum;
        if (data.totalNum == 0) {
          console.log("暂无收到的请求。");
          (this as any).noReceivedRequests = 1;
        } else {
          console.log("有收到的请求。");
          (this as any).noReceivedRequests = 0;
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
    },
    async getSentRequestsFunc () {
      (this as any).getSentRequestsParams.phoneNumber = (this as any).$store.state.phoneNumber;
      await getSentRequests((this as any).getSentRequestsParams)
      .then((res: any) => {
        const data = res.data.data;
        (this as any).sentItems = (this as any).sentItems.concat(data.requestInfo);
        console.log((this as any).sentItems);
        //如果数据不止一页则参数+1继续请求数据直到总数与本地数组总数相同
        console.log("当前本地的数量：" + (this as any).sentItems.length);
        console.log("当前后台的数量：" + data.totalNum);
        if ((this as any).sentItems.length != data.totalNum) {
          (this as any).getSentRequestsParams.pageNo ++;
          console.log("继续请求，当前请求第" + (this as any).getSentRequestsParams.pageNo + "页");
          getSentRequests((this as any).getSentRequestsParams);
        }
        (this as any).totalSentNum = data.totalNum;
        if (data.totalNum == 0) {
          console.log("暂无发送的请求。");
          (this as any).noSentRequests = 1;
        } else {
          console.log("有已发送的请求。");
          (this as any).noSentRequests = 0;
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
    },
    async acceptBuddyFunc (item: any) {
      console.log("同意了以下小队员的申请：")
      console.log(item);
      item.status = 1;
      (this as any).acceptBuddyParams.phoneNumber = (this as any).$store.state.phoneNumber;
      (this as any).acceptBuddyParams.studentPhoneNumber = item.studentPhoneNumber;
      try {
        await acceptBuddy ((this as any).acceptBuddyParams);
        (this as any).$message.success("已成功确认" + item.studentName + "为您的Buddy~");
      } catch (err) {
        console.log(err);
        (this as any).$message.error("确认时发生了一些错误，请重试~");
      }
    },
    async refuseBuddyFunc (item: any) {
      console.log("拒绝了以下小队员的申请：");
      console.log(item);
      item.status = 2;
      (this as any).refuseBuddyParams.phoneNumber = (this as any).$store.state.phoneNumber;
      (this as any).refuseBuddyParams.studentPhoneNumber = item.studentPhoneNumber;
      try {
        await refuseBuddy ((this as any).refuseBuddyParams);
        (this as any).$message.error("已拒绝" + item.studentName);
      } catch (err) {
        console.log(err);
        (this as any).$message.error("确认时发生了一些错误，请重试~");
      }
    },
    async saveReason (item: any) {
      // 这个函数是用来修改理由的
      (this as any).reasonDialog = false;
      console.log(item);
      (this as any).updateReasonParams.phoneNumber = (this as any).$store.state.phoneNumber;
      (this as any).updateReasonParams.teacherName = item.teacherName;
      (this as any).updateReasonParams.teacherPhoneNumber = item.teacherPhoneNumber;
      (this as any).updateReasonParams.applyReason = item.applyReason;
      try {
        await postSendBuddyRequest((this as any).updateReasonParams);
        console.log("修改理由成功");
        (this as any).$message.success("修改理由成功！");
        // (this as any).getSentRequestsFunc ();
      } catch (err) {
        console.log("修改理由失败");
        (this as any).$message.error("修改理由失败，请重试~");
      }
    }
  },
};
</script>
