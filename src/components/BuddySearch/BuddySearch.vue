<template>
  <div style="flex-direction: column; width: 80%">
    <v-expansion-panels class="searchbar panelBar">
      <v-expansion-panel>
        <v-expansion-panel-header>
          <v-text-field
            label="老队员姓名"
            v-model="searchInfo.userName"
            clearable
            style="width: 60%"
            v-on:click.native.stop
          />
          <div class="searchContainer ml-2">
            <div class="studentShow">
              <v-switch v-model="isAllShow" v-on:click.native.stop></v-switch>
              <div class="student-show-text">显示小队员</div>
            </div>
            <div class="search-btn ml-2">
              <v-btn
                :disabled="false"
                color="primary"
                @click="search"
                style="width: 30%"
                v-on:click.native.stop
              >
                <v-icon>mdi-magnify</v-icon>
                搜索
              </v-btn>
            </div>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-select
            dense
            v-model="searchInfo.fields"
            :items="fields"
            small-chips
            label="技术栈"
            multiple
            outline
            clearable
            style="width: 70%"
          ></v-select>
          <v-select
            dense
            v-model="searchInfo.graduateYear"
            :items="graduateYear"
            label="毕业年份"
            outline
            clearable
            style="width: 70%"
          ></v-select>
          <v-select
            dense
            v-model="searchInfo.managementExperience"
            :items="managementExperience"
            label="核心层职务"
            outline
            clearable
            multiple
            style="width: 70%"
          ></v-select>
          <v-select
            dense
            v-model="searchInfo.majors"
            :items="majors"
            label="专业方向"
            outline
            clearable
            multiple
            style="width: 70%"
          ></v-select>
          <v-select
            dense
            v-model="searchInfo.projectYear"
            :items="projectYear"
            label="项目年份"
            outline
            clearable
            style="width: 70%"
          ></v-select>
          <v-select
            dense
            v-model="searchInfo.projectName"
            :items="projectName"
            label="项目名称"
            outline
            clearable
            style="width: 70%"
          ></v-select>
          <v-select
            dense
            v-model="searchInfo.projectIdentity"
            :items="projectIdentity"
            label="项目中的身份"
            outline
            clearable
            style="width: 70%"
          ></v-select>
          <el-cascader
            v-model="searchInfo.gainsValue"
            :options="gains"
            :props="gainProp"
            v-if="isShowGain"
            placeholder="想要学习的方向"
            class="cityChoose"
            style="width: 70%"
            clearable
          ></el-cascader>
          <el-cascader
            v-model="searchInfo.sharesValue"
            :options="shares"
            :props="shareProp"
            v-if="isShowShare"
            class="cityChoose"
            placeholder="乐于分享的方向"
            style="width: 70%"
            clearable
          ></el-cascader>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import {
  getAllFields,
  getMajors,
  getShareAllDirections,
  getShareAllAspects,
  getGainAllDirections,
  getGainAllAspects,
} from "@/apis";
import managementExperienceItem from "@/utils/managementExperience";
import ResumeData from "@/utils/resumeData";
import {
  arrayToObject,
  arrayToObjectDeWeight,
  deWeightArray,
} from "@/utils/transform";
import Vue from "vue";
export default Vue.extend({
  name: "BuddySearch",
  props: [],
  data() {
    let that = this as any;
    return {
      searchInfo: {
        userName: "",
        fields: [],
        graduateYear: null,
        managementExperience: [],
        majors: [],
        projectYear: null,
        projectIdentity: "",
        projectName: "",
        gains: [],
        gainsValue: [],
        shares: [],
        sharesValue: [],
      },
      fields: ["1", "2", "3", "4"],
      graduateYear: [],
      managementExperience: [],
      majors: [],
      projectYear: [],
      projectIdentity: ["核心骨干", "骨干", "模块组长", "项目组长", "组员"],
      projectName: [],
      gains: [],
      shares: [],
      isCardShow: false,
      valid: false,
      isAllShow: false,
      shareProp: {
        multiple: true,
        lazy: true,
        lazyLoad(node, resolve) {
          that.lazyLoadShare(node, resolve);
        },
      },
      gainProp: {
        multiple: true,
        lazy: true,
        lazyLoad(node, resolve) {
          that.lazyLoadGain(node, resolve);
        },
      },
      isShowGain: false,
      isShowShare: false,
      uniqueDirections: [],
      uniqueDirectionsByGain: [],
    };
  },
  methods: {
    async getShareAllDirectionsFunc() {
      await getShareAllDirections()
        .then((res: any) => {
          var directions = res.data.data.shareDirections;
          (this as any).shares = arrayToObject(directions, false);
        })
        .catch((err: any) => {
          console.log(err);
        });
    },
    async getGainAllDirectionsFunc() {
      await getGainAllDirections()
        .then((res: any) => {
          var directions = res.data.data.gainDirections;
          (this as any).gains = arrayToObject(directions, false);
        })
        .catch((err: any) => {
          console.log(err);
        });
    },
    search() {
      let i = 1;
      (this as any).searchInfo.shares = [];
      if ((this as any).searchInfo.sharesValue.length != 0) {
        (this as any).searchInfo.shares = [
          (this as any).searchInfo.sharesValue[0][0] +
            "-" +
            (this as any).searchInfo.sharesValue[0][1],
        ];
        if ((this as any).searchInfo.sharesValue.length > 1) {
          for (i; i < (this as any).searchInfo.sharesValue.length; i++) {
            (this as any).searchInfo.shares = [
              ...(this as any).searchInfo.shares,
              (this as any).searchInfo.sharesValue[i][0] +
                "-" +
                (this as any).searchInfo.sharesValue[i][1],
            ];
          }
        }
      }

      let j = 1;
      (this as any).searchInfo.gains = [];
      if ((this as any).searchInfo.gainsValue.length != 0) {
        (this as any).searchInfo.gains = [
          (this as any).searchInfo.gainsValue[0][0] +
            "-" +
            (this as any).searchInfo.gainsValue[0][1],
        ];
        if ((this as any).searchInfo.gainsValue.length > 1) {
          for (j; j < (this as any).searchInfo.gainsValue.length; j++) {
            (this as any).searchInfo.gains = [
              ...(this as any).searchInfo.gains,
              (this as any).searchInfo.gainsValue[j][0] +
                "-" +
                (this as any).searchInfo.gainsValue[j][1],
            ];
          }
        }
      }
      this.$emit("search", this.searchInfo);
    },
    fillInGraduateYears() {
      let i = new Date().getFullYear();
      for (i; i > 1950; i--) {
        (this as any).graduateYear.push(i);
      }
    },
    fillInProjectYears() {
      let i = new Date().getFullYear();
      for (i; i > 2001; i--) {
        (this as any).projectYear.push(i);
      }
    },
    async getMajorsFunc() {
      await getMajors()
        .then((res: any) => {
          (this as any).majors = res.data.data;
        })
        .catch((err: any) => {
          (this as any).$message.error("获得专业方向错误，请刷新页面~");
        });
    },
    lazyLoadGain(node: any, resolve: any) {
      const { level } = node;
      if (level < 2) {
        var prevNodes: any[] = [];
        getGainAllAspects({ gainDirection: node.label })
          .then((res: any) => {
            prevNodes = res.data.data.gainAspects;
            var nodes = arrayToObjectDeWeight(prevNodes, node);
            resolve(nodes);
          })
          .catch((err: any) => {
            console.log(err);
          });
      } else {
        resolve([]);
      }
    },
    lazyLoadShare(node: any, resolve: any) {
      const { level } = node;
      if (level < 2) {
        var prevNodes: any[] = [];
        getShareAllAspects({ shareDirection: node.label })
          .then((res: any) => {
            prevNodes = res.data.data.shareAspects;
            var nodes = arrayToObjectDeWeight(prevNodes, node);
            resolve(nodes);
          })
          .catch((err: any) => {
            console.log(err);
          });
      } else {
        resolve([]);
      }
    },
  },
  async mounted() {
    try {
      const res = (await getAllFields()).data.data;
      this.fields = res;
    } catch (error) {
      console.log(error);
    }
    (this as any).managementExperience = managementExperienceItem;
    (this as any).projectName = ResumeData;
    (this as any).fillInGraduateYears();
    (this as any).fillInProjectYears();
    (this as any).getMajorsFunc();
    await (this as any).getShareAllDirectionsFunc();
    await (this as any).getGainAllDirectionsFunc();
    let i = 0;
    for (i; i <= (this as any).uniqueDirections.length; i++) {
      await getShareAllAspects({
        shareDirection: (this as any).uniqueDirections[i],
      })
        .then((res: any) => {
          let idx = 0;
          for (idx; idx < (this as any).shares.length; idx++) {
            if (
              (this as any).shares[idx].value ==
              (this as any).uniqueDirections[i]
            ) {
              var newObj = arrayToObject(res.data.data.shareAspects, true);
              if ((this as any).shares[idx].children != newObj) {
                (this as any).shares[idx].children = newObj;
              }
            }
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
    (this as any).isShowShare = false;
    setTimeout(() => {
      (this as any).isShowShare = true;
    }, 100);

    let j = 0;
    for (j; j <= (this as any).uniqueDirectionsByGain.length; j++) {
      await getGainAllAspects({
        gainDirection: (this as any).uniqueDirectionsByGain[j],
      })
        .then((res: any) => {
          let idx = 0;
          for (idx; idx < (this as any).gains.length; idx++) {
            if (
              (this as any).gains[idx].value ==
              (this as any).uniqueDirectionsByGain[j]
            ) {
              var newObj = arrayToObject(res.data.data.gainAspects, true);
              if ((this as any).gains[idx].children != newObj) {
                (this as any).gains[idx].children = newObj;
              }
            }
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
    (this as any).isShowGain = false;
    setTimeout(() => {
      (this as any).isShowGain = true;
    }, 100);
  },
  watch: {
    isAllShow: function (val: boolean) {
      this.$emit("showAllChange", val);
    },
  },
});
</script>

<style scoped>
.searchContainer {
  justify-content: flex-end;
  display: flex;
  flex-direction: row;
}
.searchbar {
  display: flex;
  align-items: stretch;
}
.search-btn {
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.studentShow {
  justify-content: flex-end;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.student-show-text {
  margin-top: -23px;
  color: rgb(107, 105, 105);
  font-size: 0.875rem;
}
.panelBar .v-expansion-panel::before {
  border-radius: 0px;
  box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%),
    0px 0px 0px 0px rgb(0 0 0 / 12%);
}
</style>
