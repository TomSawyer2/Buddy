<template>
  <div>
    <v-container
      class="mt-13 mb-3"
      v-if="noReceivedRequests == 0 && received == 1"
      v-bind:style="{
        width: pageWidth + 'px',
      }"
    >
      <v-row dense>
        <div v-if="received">
          <v-col v-for="(item, i) in receivedItems" :key="i" cols="12">
            <v-hover v-slot="{ hover }" open-delay="100">
              <v-card
                :elevation="hover ? 12 : 2"
                outlined
                v-if="
                  acceptNumber < 3 || (acceptNumber == 3 && item.status == 1)
                "
              >
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
                          队员编号：{{ item.number ? item.number : "暂无" }}
                        </div>
                        <div class="grey--text ms-3 mr-5">
                          生日：{{ item.birthday ? item.birthday : "暂无" }}
                        </div>
                        <div class="grey--text ms-3 mr-5">
                          身份：{{ item.identity ? item.identity : "暂无" }}
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
                      <v-row>
                        <h3 class="text--secondary ms-3 mr-5 mt-2">
                          理由：{{
                            item.applyReason ? item.applyReason : "暂无"
                          }}
                        </h3>
                      </v-row>
                    </v-card-text>
                    <v-divider
                      class="ml-4"
                      v-if="item.fields.length - 1"
                    ></v-divider>
                    <v-card-text v-if="item.fields.length - 1">
                      <v-row>
                        <v-sheet class="ml-3 mx-auto mt-1 mb-1">
                          <div>
                            <v-chip
                              v-for="tag in item.fields"
                              :key="tag"
                              class="mr-1"
                            >
                              {{ tag }}
                            </v-chip>
                          </div>
                        </v-sheet>
                      </v-row>
                    </v-card-text>
                    <v-row v-if="item.status == 0 && acceptNumber < 3">
                      <v-col>
                        <v-card-actions>
                          <v-btn
                            class="ml-2"
                            outlined
                            rounded
                            small
                            color="success"
                            @click="openSnackBar(item)"
                          >
                            接受
                          </v-btn>
                          <v-snackbar
                            v-model="snackbar"
                            :timeout="timeout"
                            style="z-index: 100002"
                          >
                            您确定接受该请求？（超过5秒自动关闭）
                            <template v-slot:action="{ attrs }">
                              <v-btn
                                color="blue"
                                text
                                v-bind="attrs"
                                @click="acceptBuddyFunc(snackbarItem)"
                              >
                                确定
                              </v-btn>
                            </template>
                          </v-snackbar>
                          <v-btn
                            outlined
                            rounded
                            small
                            color="error"
                            @click="refuseBuddyFunc(item)"
                          >
                            拒绝
                          </v-btn>
                        </v-card-actions>
                      </v-col>
                    </v-row>
                  </div>
                  <v-avatar class="ma-3" size="125">
                    <v-img v-bind:src="item.avatar"></v-img>
                  </v-avatar>
                  <v-icon
                    class="
                      d-flex
                      flex-no-wrap
                      justify-space-between
                      align-center
                    "
                    color="#81C784"
                    v-if="item.status == 1"
                  >
                    mdi-check
                  </v-icon>
                  <v-icon
                    class="
                      d-flex
                      flex-no-wrap
                      justify-space-between
                      align-center
                    "
                    color="#FFFFFF"
                    v-if="item.status == 0"
                  >
                    mdi-check
                  </v-icon>
                  <v-icon
                    class="
                      d-flex
                      flex-no-wrap
                      justify-space-between
                      align-center
                    "
                    color="#C62828"
                    v-if="item.status == 2"
                  >
                    mdi-close
                  </v-icon>
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
  name: "ReceivedReqs",
  props: [
    "received",
    "noReceivedRequests",
    "receivedItems",
    "acceptNumber",
    "buddyDetail",
  ],
  data() {
    return {
      pageWidth: 100,
      isDetailShow: false,
      isDetailLoading: false,
      snackbar: false,
      timeout: 5000,
      snackbarItem: {},
    };
  },
  methods: {
    acceptBuddyFunc(item: any) {
      this.snackbar = false;
      this.$emit("accept", item);
    },
    refuseBuddyFunc(item: any) {
      this.$emit("refuse", item);
    },
    openSnackBar(item: any) {
      (this as any).snackbar = true;
      (this as any).snackbarItem = item;
    },
    async onToDetail(teacherPhoneNumber: string) {
      (this as any).isDetailLoading = true;
      (this as any).isDetailShow = true;
      await this.$emit("todetail", teacherPhoneNumber);
      (this as any).isDetailLoading = false;
    },
  },
  mounted() {
    (this as any).pageWidth = document.documentElement.clientWidth - 60;
    console.log("宽度：" + (this as any).pageWidth);
  },
});
</script>
