<template>
  <div>
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
                      v-text="item.userName"
                    ></v-card-title>

                    <v-card-subtitle
                      v-text="item.phoneNumber"
                    ></v-card-subtitle>
                    <v-card-text @click="onToDetail(item.phoneNumber)">
                      <v-row>
                        <div class="grey--text ms-3 mr-5">
                          性别：{{ item.sex ? item.sex : "暂无" }}
                        </div>
                        <div class="grey--text ms-3 mr-5">
                          生日：{{ item.birthday ? item.birthday : "暂无" }}
                        </div>
                        <div class="grey--text ms-3 mr-5">
                          队员编号：{{ item.number ? item.number : "暂无" }}
                        </div>
                        <div class="grey--text ms-3 mr-5">
                          身份：{{ item.identity ? item.identity : "暂无" }}
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
                      </v-row>
                    </v-card-text>
                    <v-divider class="ml-4"></v-divider>
                    <v-card-text v-if="item.fields.length - 1">
                      <v-row>
                        <v-sheet class="ml-3 mx-auto mt-1 mb-1">
                          <v-chip
                            v-for="tag in item.fields"
                            :key="tag"
                            class="mr-1"
                          >
                            {{ tag }}
                          </v-chip>
                        </v-sheet>
                      </v-row>
                    </v-card-text>
                    <v-row class="ml-4 mt-2 mb-2 text--disabled">
                      <h4>{{ buddyStatus[item.status] }}</h4>
                      <!-- <v-btn style="right:0;width:auto;height:auto;" class="ml-4">修改理由</v-btn> -->
                      <div v-if="item.status == 0">
                        <v-btn
                          dark
                          class="ml-4"
                          style="right: 0; width: auto; height: auto"
                          @click="openDialog(item)"
                        >
                          修改理由
                        </v-btn>
                        <v-dialog
                          v-model="reasonDialog"
                          persistent
                          max-width="600px"
                          style="z-index: 1001"
                        >
                          <v-card>
                            <v-card-title>
                              <span class="text-h5 mt-4 ml-2"
                                >修改申请理由</span
                              >
                            </v-card-title>
                            <v-card-text>
                              <v-container class="mt-5">
                                <v-row>
                                  <v-col>
                                    <v-text-field
                                      label="填写申请的理由"
                                      clearable
                                      :value="reasonItem.applyReason"
                                      v-model="reasonItem.applyReason"
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
                      </div>
                      <div v-if="item.status == 1">
                        <v-btn
                          style="right: 0; width: auto; height: auto"
                          class="ml-4"
                          @click="pushToWeChatPic(item)"
                        >
                          查看老队员二维码
                        </v-btn>
                      </div>
                    </v-row>
                  </div>
                  <v-avatar class="ma-3" size="125">
                    <v-img v-bind:src="item.avatar"></v-img>
                  </v-avatar>
                </div>
              </v-card>
            </v-hover>
          </v-col>
          <p class="d-flex flex-no-wrap justify-center text--secondary mt-5">
            我是有底线的(/▽＼)
          </p>
        </div>
      </v-row>
    </v-container>
    <v-dialog
      v-model="isDetailShow"
      transition="dialog-bottom-transition"
      style="z-index: 10001"
    >
      <BuddyDetail
        :userInfo="buddyDetail"
        :isLoading="isDetailLoading"
        v-bind:messageCenter="1"
      />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BuddyDetail from "@/components/BuddyDetail/BuddyDetail.vue";
export default Vue.extend({
  components: { BuddyDetail },
  name: "SentReqs",
  props: [
    "received",
    "noSentRequests",
    "sentItems",
    "acceptNumber",
    "buddyDetail",
  ],
  data() {
    return {
      reasonDialog: false,
      buddyStatus: ["审核中", "老队员已接受申请~", "老队员拒绝了申请~"],
      isDetailShow: false,
      isDetailLoading: false,
      timeout: 5000,
      reasonItem: {},
    };
  },
  methods: {
    async onToDetail(studentPhoneNumber: string) {
      (this as any).isDetailLoading = true;
      (this as any).isDetailShow = true;
      await this.$emit("todetail", studentPhoneNumber);
      (this as any).isDetailLoading = false;
    },
    saveReason(item: any) {
      this.$emit("reason", item);
      (this as any).reasonDialog = false;
    },
    pushToWeChatPic (item : any) {
      this.$emit("weChatPic", item);
    },
    openDialog (item : any) {
      (this as any).reasonDialog = true;
      (this as any).reasonItem = item;
    },
  },
});
</script>
