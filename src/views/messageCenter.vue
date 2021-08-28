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
      style="position: absolute; right: 0; top: 0; width: auto; height: auto"
    >
      <v-btn-toggle v-model="icon" borderless shaped mandatory>
        <v-btn value="received" @click="changeToReceive">
          <span class="hidden-sm-and-down">收到的请求</span>
          <v-badge
            color="green"
            :content="totalReceivedNum"
            :value="totalReceivedNum"
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
              <v-card color="#FFFFFF" :elevation="hover ? 12 : 2">
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
                    </v-card-text>
                    <v-divider class="ml-4 mt-2"></v-divider>
                    <v-card-text v-if="item.field.length - 1">
                      <v-row>
                        <v-sheet class="ml-4 mx-auto">
                          <div>
                            <v-chip-group active-class="primary--text" column>
                              <v-chip v-for="tag in item.field" :key="tag">
                                {{ tag }}
                              </v-chip>
                            </v-chip-group>
                          </div>
                        </v-sheet>
                      </v-row>
                    </v-card-text>
                    <v-row>
                      <v-col>
                        <v-card-actions>
                          <v-btn class="ml-2" outlined rounded small>
                            接受
                          </v-btn>
                          <v-btn class="" outlined rounded small> 拒绝 </v-btn>
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
                    <v-divider class="ml-4 mt-2"></v-divider>
                    <v-card-text v-if="item.field.length - 1">
                      <v-row>
                        <v-sheet class="ml-4 mx-auto">
                          <div>
                            <v-chip-group active-class="primary--text" column>
                              <v-chip v-for="tag in item.field" :key="tag">
                                {{ tag }}
                              </v-chip>
                            </v-chip-group>
                          </div>
                        </v-sheet>
                      </v-row>
                    </v-card-text>
                    <div class="ml-4 mt-2 mb-2 text--disabled">
                      <h4>已被接受！ 被拒绝力 老队员还未选择</h4>
                    </div>
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
import { getReceivedRequests, getSentRequests } from "../apis";
export default {
  data: () => ({
    icon: "",//不加会报错
    getReceivedRequestsParams: {
      phoneNumber: "",
      pageNo: 1,
    },
    getSentRequestsParams: {
      phoneNumber: "",
      pageNo: 1,
    },
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
    }
  },
};
</script>
