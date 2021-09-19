<template>
  <v-card class="mx-auto" max-width="344">
    <v-img :src="userInfo.avatar" height="250px"></v-img>

    <v-card-title>
      {{ userInfo.userName }}
    </v-card-title>

    <v-card-subtitle>
      {{ userInfo.email ? userInfo.email : "" }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        v-if="messageCenter == 0"
        text
        @click="onAdd(userInfo.id)"
      >
        添加为Buddy
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <h3 class="font-weight-light font_title">电话</h3>
                <span class="ml-2">
                  {{ userInfo.phoneNumber ? userInfo.phoneNumber : "暂无" }}
                </span>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <h3 class="font-weight-light font_title">性别</h3>
                <span class="ml-2">
                  {{ userInfo.sex ? userInfo.sex : "暂无" }}
                </span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <h3 class="font-weight-light font_title">队员编号</h3>
                <span class="ml-2">
                  {{ userInfo.number ? userInfo.number : "暂无" }}
                </span>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <h3 class="font-weight-light font_title">出生日期</h3>
                <span class="ml-2">
                  {{ userInfo.birthday ? userInfo.birthday : "暂无" }}
                </span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <h3 class="font-weight-light font_title">毕业年月</h3>
                <span class="ml-2">
                  {{ userInfo.graduateTime ? userInfo.graduateTime : "暂无" }}
                </span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <h3 class="font-weight-light font_title">工作所在城市</h3>
                <span class="ml-2">
                  {{ userInfo.location ? userInfo.location : "暂无" }}
                </span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <h3 class="font-weight-light font_title">身份</h3>
                <span class="ml-2">
                  {{ userInfo.identity ? userInfo.identity : "暂无" }}
                </span>
              </v-col>
            </v-row>
            <v-row v-if="userInfo.isGraduated == '是' ? true : false">
              <v-col cols="12" sm="12" md="12">
                <h3 class="font-weight-light font_title">在站</h3>
                <span class="ml-2">
                  {{ userInfo.substation ? userInfo.substation : "暂无" }}
                </span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <h3 class="font-weight-light font_title">项目组</h3>
                <v-chip-group v-if="userInfo.teams != ''" column>
                  <v-chip
                    v-for="(team, index) in userInfo.teamsValue"
                    :key="index"
                    small
                    >{{ team }}</v-chip
                  >
                </v-chip-group>
                <v-chip v-else small>暂无</v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <h3 class="font-weight-light font_title">具体项目</h3>
                <v-chip-group v-if="userInfo.projects != ''" column>
                  <v-chip
                    v-for="(project, index) in userInfo.projectsArray"
                    :key="index"
                    small
                    >{{ project }}</v-chip
                  >
                </v-chip-group>
                <v-chip v-else small>暂无</v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <h3 class="font-weight-light font_title">核心层职务</h3>
                <v-chip-group v-if="userInfo.managementExperience != ''" column>
                  <v-chip
                    v-for="(
                      managementExperience, index
                    ) in userInfo.managementExperienceValue"
                    :key="index"
                    small
                    >{{ managementExperience }}</v-chip
                  >
                </v-chip-group>
                <v-chip v-else small>暂无</v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <h3 class="font-weight-light font_title">熟悉的专业方向</h3>
                <v-chip-group v-if="userInfo.majors != ''" column>
                  <v-chip
                    v-for="(major, index) in userInfo.majorsValue"
                    :key="index"
                    small
                    >{{ major }}</v-chip
                  >
                </v-chip-group>
                <v-chip v-else small>暂无</v-chip>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="12">
                <h3 class="font-weight-light font_title">技术栈</h3>
                <v-chip-group v-if="userInfo.fields != ''" column>
                  <v-chip
                    v-for="(field, index) in userInfo.fieldsValue"
                    :key="index"
                    small
                    >{{ field }}</v-chip
                  >
                </v-chip-group>
                <v-chip v-else small>暂无</v-chip>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="12">
                <h3 class="font-weight-light font_title">想要分享的方向</h3>
                <v-chip-group v-if="userInfo.shares != ''" column>
                  <v-chip
                    v-for="(share, index) in userInfo.sharesValue"
                    :key="index"
                    small
                    >{{ share }}</v-chip
                  >
                </v-chip-group>
                <v-chip v-else small>暂无</v-chip>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="12">
                <h3 class="font-weight-light font_title">想要学习的方向</h3>
                <v-chip-group v-if="userInfo.gains != ''" column>
                  <v-chip
                    v-for="(gain, index) in userInfo.gainsValue"
                    :key="index"
                    small
                    >{{ gain }}</v-chip
                  >
                </v-chip-group>
                <v-chip v-else small>暂无</v-chip>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="12">
                <h3 class="font-weight-light font_title">推荐的书籍</h3>
                <v-chip-group v-if="userInfo.books != ''" column>
                  <v-chip
                    v-for="(book, index) in userInfo.booksValue"
                    :key="index"
                    small
                    >{{ book }}</v-chip
                  >
                </v-chip-group>
                <v-chip v-else small>暂无</v-chip>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="12" md="12">
                <h3 class="font-weight-light font_title">毕业高中</h3>
                <span class="ml-2">
                  {{ userInfo.highSchool ? userInfo.highSchool : "暂无" }}
                </span>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                <h3 class="font-weight-light font_title">性格特征</h3>
                <span class="ml-2">
                  {{ userInfo.character ? userInfo.character : "暂无" }}
                </span>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <h3 class="font-weight-light font_title">性格测试结果</h3>
                <span class="ml-2">
                  {{
                    userInfo.characterResult ? userInfo.characterResult : "暂无"
                  }}
                </span>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "BuddyDetail",
  components: {},
  props: ["userInfo", "isLoading", "messageCenter"],
  data() {
    return {
      show: false,
      graduateTime: "",
    };
  },
  methods: {
    onAdd(id: string) {
      this.$emit("add", id);
    },
  },
  mounted() {
    if (
      (this as any).userInfo.graduateYear &&
      (this as any).userInfo.graduateMonth
    ) {
      (this as any).graduateTime =
        (this as any).userInfo.graduateYear +
        "年" +
        (this as any).userInfo.graduateMonth +
        "月";
    }
  },
});
</script>

<style>
.font_title {
  color: #000000;
}
</style>
