<template>
  <v-card>
    <v-card-text class="pt-4">
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="userData.userName"
              label="姓名"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="userData.phoneNumber"
              label="电话"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="userData.email"
              label="电子邮箱"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="userData.number"
              label="队员编号"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-select
              v-model="userData.sex"
              :items="items.sexItems"
              label="性别"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <DatePicker
              :label="label.birthdayLabel"
              @save="saveBirthday"
              :dateOrigin="userData.birthday"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <MonthPicker
              :label="label.graduateLabel"
              :dateYear="userData.graduateYear"
              :dateMonth="userData.graduateMonth"
              @save="saveGraduateYear"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <el-cascader
              v-model="userData.cityValue"
              :options="cityData"
              placeholder="请选择您目前工作所在的城市"
              style="width: 100%; z-index: 1000000"
              class="cityChoose mb-2"
              clearable
              filterable
            ></el-cascader>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-select
              v-model="userData.isGraduated"
              :items="items.isGraduatedItems"
              label="是否出站"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-select
              v-model="userData.identity"
              :items="items.identityItems"
              label="身份"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-select
              v-model="userData.substation"
              v-if="userData.isGraduated == '是' ? true : false"
              :items="items.substationItems"
              label="所在分站"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-combobox
              v-model="userData.teamsValue"
              :items="items.teams"
              label="项目组"
              multiple
              style="position: relative; width: 100%"
              class="cityChoose mb-2"
              clearable
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <el-cascader
              v-model="userData.resumeValue"
              :options="resumeData"
              placeholder="项目以及身份"
              style="position: relative; width: 100%"
              class="cityChoose mb-2"
              clearable
              :props="resumeProp"
              v-if="isShowResume"
            ></el-cascader>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-select
              v-model="userData.managementExperienceValue"
              :items="items.managementExperienceItem"
              label="核心层职务"
              required
              multiple
              clearable
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-select
              v-model="userData.majorsValue"
              :items="items.majorItems"
              label="熟悉的专业方向"
              required
              multiple
              clearable
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-select
              v-model="userData.fieldsValue"
              :items="items.fieldItems"
              label="技术栈"
              required
              multiple
              clearable
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-select
              v-model="userData.booksValue"
              :items="items.bookItems"
              label="推荐的书籍"
              required
              multiple
              clearable
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              v-model="userData.highSchool"
              label="毕业高中"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-select
              v-model="userData.character"
              :items="items.characterItems"
              label="性格特征"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-select
              v-model="userData.characterResult"
              :items="items.characterResultItems"
              label="性格测试结果"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close"> 取消 </v-btn>
      <v-btn color="blue darken-1" text @click="updateInfo"> 更新 </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {
  transformAfterGet,
  transformBeforeUpdate,
  arrayToObject,
  arrayToObjectDeWeight,
  deWeightArray,
} from "@/utils/transform";
import DatePicker from "@/components/DatePicker/DatePicker.vue";
import Combobox from "@/components/Combobox/Combobox.vue";
import Cities from "@/utils/city";
import Resumes from "@/utils/resume";
import Groups from "@/utils/group";
import MonthPicker from "@/components/MonthPicker/MonthPicker.vue";
import managementExperienceItem from "@/utils/managementExperience";
export default {
  components: { DatePicker, MonthPicker },
  props: ["editedItem", "majorItems", "bookItems", "fieldItems"],
  data() {
    return {
      userData: {},
      items: {
        sexItems: ["男", "女"],
        isGraduatedItems: ["是", "否"],
        substationItems: [
          "华中站",
          "杭州站",
          "上海站",
          "西南站",
          "广州站",
          "深圳站",
          "长沙站",
          "北京站",
          "海外站",
        ],
        identityItems: [
          "预备队员",
          "在站正式队员",
          "出站正式队员",
          "名誉队员",
          "导师",
          "顾问",
          "临时",
          "其他",
        ],
        fieldItems: [],
        majorItems: [],
        teams: [],
        managementExperienceItem: [],
        characterItems: [
          "暂无",
          "稳重踏实",
          "外向开朗",
          "善解人意",
          "和蔼可亲",
          "尚不清楚",
        ],
        characterResultItems: [
          "暂无",
          "INTJ-A INTJ-T",
          "INTP-A INTP-T",
          "ENTJ-A ENTJ-T",
          "ENTP-A ENTP-T",
          "INFJ-A INFJ-T",
          "INFP-A INFP-T",
          "ENFJ-A ENFJ-T",
          "ENFP-A ENFP-T",
          "ISTJ-A ISTJ-T",
          "ISFJ-A ISFJ-T",
          "ESTJ-A ESTJ-T",
          "ESFJ-A ESFJ-T",
          "ISTP-A ISTP-T",
          "ISFP-A ISFP-T",
          "ESTP-A ESTP-T",
          "ESFP-A ESFP-T",
        ],
        bookItems: [],
      },
      cityData: [],
      resumeData: [],
      label: {
        majorLabel: "熟悉的专业方向",
        fieldLabel: "技术栈方向",
        weChatPicLabel: "上传微信二维码",
        graduateLabel: "毕业年-月",
        birthdayLabel: "出生年-月-日",
        bookLabel: "推荐书籍",
      },
      resumeProp: {
        multiple: true,
      },
      isShowResume: true,
    };
  },
  async mounted() {
    (this as any).items.managementExperienceItem = managementExperienceItem;
    (this as any).items.teams = Groups;
    (this as any).cityData = Cities;
    (this as any).resumeData = Resumes;
    await (this as any).$emit("getMajorsChild");
    (this as any).items.majorItems = (this as any).majorItems;
    await (this as any).$emit("getBooksChild");
    (this as any).items.bookItems = (this as any).bookItems;
    await (this as any).$emit("getFieldsChild");
    (this as any).items.fieldItems = (this as any).fieldItems;
    (this as any).userData = await transformAfterGet((this as any).editedItem);
  },
  watch: {
    editedItem(newV, oldV) {
      if (newV !== undefined && newV != oldV) {
        (this as any).userData = transformAfterGet(newV);
      }
    },
    majorItems(newV, oldV) {
      (this as any).items.majorItems = newV;
    },
    bookItems(newV, oldV) {
      (this as any).items.bookItems = newV;
    },
    fieldItems(newV, oldV) {
      (this as any).items.fieldItems = newV;
    },
  },
  methods: {
    close() {
      (this as any).$emit("closeChild");
    },
    updateInfo() {
      (this as any).$emit(
        "updateInfoChild",
        transformBeforeUpdate((this as any).userData)
      );
    },
    saveBirthday(val) {
      (this as any).userData.birthday = val;
    },
    saveGraduateYear(val) {
      (this as any).userData.graduateYear = val.slice(0, 4);
      (this as any).userData.graduateMonth = val.slice(5, 7);
    },
    childrenMajorItems(val) {
      (this as any).formData.majorsValue = val;
    },
    childrenBookItems(val) {
      (this as any).formData.booksValue = val;
    },
    childrenFieldItems(val) {
      (this as any).formData.fieldsValue = val;
    },
  },
};
</script>
