<template>
  <div class="mainBox">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      style="width: 50%"
      class="mt-10"
    >
      <div style="display: flex; flex-direction: row; align-items: center">
        <v-avatar size="100"><img v-bind:src="formData.avatar" /></v-avatar>
        <v-file-input
          accept="image/png, image/jpeg, image/bmp, image/jfif"
          placeholder="选择图片"
          prepend-icon="mdi-camera"
          label="更换头像"
          class="ml-5"
          style="width: 20%"
          v-model="updateFile.file"
          @change="changeAvatar()"
        ></v-file-input>
      </div>

      <div style="display: flex; flex-direction: row; align-items: center">
        <v-file-input
          accept="image/png, image/jpeg, image/bmp, image/jfif"
          placeholder="选择图片"
          prepend-icon="mdi-qrcode"
          :label="label.weChatPicLabel"
          class="pt-10"
          style="width: 100%"
          v-model="updateQRCodeFile.file"
          @change="updateQRCode()"
        ></v-file-input>
        <v-btn
          @click="pushToWeChatPic"
          small
          class="mt-3"
          v-if="label.weChatPicLabel == '微信二维码已上传~'"
          >查看二维码</v-btn
        >
      </div>

      <v-text-field
        v-model="formData.phoneNumber"
        :rules="rules.phoneNumberRules"
        label="电话"
        required
      ></v-text-field>

      <v-text-field
        v-model="formData.email"
        :rules="rules.emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-select
        v-model="formData.sex"
        :items="items.sexItems"
        :rules="[(v) => !!v || '请选择您的性别~']"
        label="性别"
        required
      ></v-select>

      <DatePicker
        :label="label.birthdayLabel"
        @save="saveBirthday"
        :date="formData.birthday"
      />

      <MonthPicker
        :label="label.graduateLabel"
        :dateYear="formData.graduateYear"
        :dateMonth="formData.graduateMonth"
        @save="saveGraduateYear"
      />

      <el-cascader
        v-model="formData.cityValue"
        :options="cityData"
        placeholder="请选择您目前工作所在的城市"
        style="position: relative; width: 100%"
        class="cityChoose mb-2"
        clearable
        filterable
      ></el-cascader>

      <el-divider class="mt-15 mb-15"
        ><i class="el-icon-office-building"></i
      ></el-divider>

      <v-select
        v-model="formData.isGraduated"
        :items="items.isGraduatedItems"
        :rules="[(v) => !!v || '请选择您是否出站~']"
        label="是否出站"
        required
      ></v-select>

      <v-select
        v-model="formData.identity"
        :items="items.identityItems"
        :rules="[(v) => !!v || '请选择您目前的身份~']"
        label="身份"
        required
      ></v-select>

      <v-select
        v-model="formData.substation"
        v-if="formData.isGraduated == '是' ? true : false"
        :items="items.substationItems"
        :rules="[(v) => !!v || '请选择您目前所在的分站~']"
        label="所在分站"
        required
      ></v-select>

      <div style="display: flex; flex-direction: row; align-items: center">
        <v-text-field
          v-model="formData.number"
          :rules="rules.numberRules"
          label="队员编号（格式：D800,若没有则填无，若遗忘可通过右侧查询按钮进行搜索）"
          required
          class="mr-2"
          clearable
        ></v-text-field>
        <v-btn class="mb-2" @click="queryNumberDialog = true">查询</v-btn>
      </div>

      <v-dialog
        v-model="queryNumberDialog"
        persistent
        max-width="600px"
        style="z-index: 1001"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5 mt-4 ml-2">查询队员编号</span>
          </v-card-title>
          <v-card-text>
            <v-container class="mt-5">
              <v-row>
                <v-col>
                  <v-text-field
                    label="请填写您的姓名"
                    clearable
                    :value="queryName"
                    v-model="queryName"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <Table
                @changeNumber="changeNumber"
                v-if="queryNumberSuccess"
                :queryData="queryTableData"
              />
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="queryNumberDialog = false"
              class="mb-6"
            >
              关闭
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="queryNumberFunc"
              class="mb-6 mr-5"
            >
              查询
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-combobox
        v-model="formData.teamValue"
        :items="items.teams"
        label="请选择您曾经所在的项目组"
        multiple
        style="position: relative; width: 100%"
        class="cityChoose mb-2"
        clearable
      ></v-combobox>

      <el-cascader
        v-model="formData.resumeValue"
        :options="resumeData"
        placeholder="请选择您曾经参与的项目以及身份"
        style="position: relative; width: 100%"
        class="cityChoose mb-2"
        clearable
        :props="resumeProp"
        v-if="isShowResume"
      ></el-cascader>

      <v-select
        v-model="formData.managementExperienceValue"
        :items="items.managementExperienceItem"
        label="核心层职务"
        required
        multiple
        clearable
      ></v-select>

      <el-divider class="mt-15 mb-15"
        ><i class="el-icon-suitcase-1"></i
      ></el-divider>

      <Combobox
        class="mb-5"
        :items="items.majorItems"
        :label="label.majorLabel"
        :hint="hint.majorHint"
        :model="formData.majorsValue"
        @childrenItems="childrenMajorItems"
      />

      <p
        class="font-weight-light mt-4"
        style="font-size: 15px; margin-bottom: 0px"
        v-if="formData.isGraduated == '是' && isShowShare"
      >
        请选择您乐于分享的方向
      </p>
      <el-cascader
        v-model="formData.shareValue"
        v-if="formData.isGraduated == '是' && isShowShare"
        :options="shareData"
        :disabled="shareDisabled"
        :props="shareProp"
        @change="handleShareChange"
        placeholder=""
        style="position: relative; width: 100%"
        class="cityChoose mb-5"
        clearable
        :key="keyForShare"
      ></el-cascader>

      <v-dialog
        v-model="addDialog"
        persistent
        max-width="600px"
        style="z-index: 1001"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5 mt-4 ml-2">填写新增的大方向</span>
          </v-card-title>
          <v-card-text>
            <v-container class="mt-5">
              <v-row>
                <v-col>
                  <v-text-field
                    label="填写添加的大方向"
                    clearable
                    :value="newShareDirection"
                    v-model="newShareDirection"
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
              @click="addDialog = false"
              class="mb-6"
            >
              关闭
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="addShareDirectionFunc"
              class="mb-6 mr-5"
            >
              保存
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="addAspectDialog"
        persistent
        max-width="600px"
        style="z-index: 1001"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5 mt-4 ml-2">填写新增的小方向</span>
          </v-card-title>
          <v-card-text>
            <v-container class="mt-5">
              <v-row>
                <v-col>
                  <v-text-field
                    label="填写添加的小方向"
                    clearable
                    :value="newShareAspectParam.shareAspect"
                    v-model="newShareAspectParam.shareAspect"
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
              @click="addAspectDialog = false"
              class="mb-6"
            >
              关闭
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="addShareAspectFunc"
              class="mb-6 mr-5"
            >
              保存
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <p
        class="font-weight-light mt-4"
        style="font-size: 15px; margin-bottom: 0px"
      >
        请选择您想要学习的方向
      </p>
      <el-cascader
        v-model="formData.gainValue"
        v-if="isShowGain"
        :options="gainData"
        :props="gainProp"
        @change="handleGainChange"
        placeholder="暂无"
        style="position: relative; width: 100%"
        class="cityChoose mb-5"
        clearable
        :key="keyForGain"
      ></el-cascader>

      <v-dialog
        v-model="addGainDialog"
        persistent
        max-width="600px"
        style="z-index: 1001"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5 mt-4 ml-2">填写新增的大方向</span>
          </v-card-title>
          <v-card-text>
            <v-container class="mt-5">
              <v-row>
                <v-col>
                  <v-text-field
                    label="填写添加的大方向"
                    clearable
                    :value="newGainDirection"
                    v-model="newGainDirection"
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
              @click="addGainDialog = false"
              class="mb-6"
            >
              关闭
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="addGainDirectionFunc"
              class="mb-6 mr-5"
            >
              保存
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="addGainAspectDialog"
        persistent
        max-width="600px"
        style="z-index: 1001"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5 mt-4 ml-2">填写新增的小方向</span>
          </v-card-title>
          <v-card-text>
            <v-container class="mt-5">
              <v-row>
                <v-col>
                  <v-text-field
                    label="填写添加的小方向"
                    clearable
                    :value="newGainAspectParam.gainAspect"
                    v-model="newGainAspectParam.gainAspect"
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
              @click="addGainAspectDialog = false"
              class="mb-6"
            >
              关闭
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="addGainAspectFunc"
              class="mb-6 mr-5"
            >
              保存
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <Combobox
        :items="items.fieldItems"
        :hint="hint.fieldHint"
        :label="label.fieldLabel"
        :model="formData.fieldsValue"
        @childrenItems="childrenFieldItems"
      />

      <el-divider class="mt-15 mb-15"
        ><i class="el-icon-connection"></i
      ></el-divider>

      <v-text-field
        v-model="formData.highSchool"
        :rules="rules.highSchoolRules"
        label="毕业高中"
        required
      ></v-text-field>

      <Combobox
        :items="items.bookItems"
        :hint="hint.bookHint"
        :label="label.bookLabel"
        :model="formData.booksValue"
        @childrenItems="childrenBookItems"
      />

      <v-select
        v-model="formData.character"
        :items="items.characterItems"
        label="性格特征"
        required
      ></v-select>

      <div style="display: flex; flex-direction: row; align-items: center">
        <p class="font-weight-light">
          若您对自己的性格特征没有比较清晰的把握，您可以点击按钮前往测评网站进行简短的自测并在下方选择自己的测试结果~
        </p>
        <v-btn @click="pushToCharacterWeb">前往测评网站</v-btn>
      </div>

      <v-select
        v-model="formData.characterResult"
        :items="items.characterResultItems"
        label="性格测试结果"
        required
      ></v-select>

      <div class="d-flex justify-center mb-6 mt-6">
        <v-btn
          :disabled="!valid"
          color="success"
          @click="validate"
          style="width: 80%"
        >
          提交
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts">
import {
  getPersonalInformation,
  updatePersonalInformation,
  postAvatar,
  postQRCode,
  getFields,
  addFields,
  getMajors,
  addMajors,
  getBooks,
  addBooks,
  getShareAllDirections,
  getShareAllAspects,
  addShareDirection,
  addShareAspect,
  getGainAllDirections,
  getGainAllAspects,
  addGainDirection,
  addGainAspect,
  queryNumber,
} from "../apis";
import {
  setToken,
  getToken,
  removeToken,
  getPhone,
  getAvatarSrc,
  getUserName,
  setAvatarSrc,
} from "../utils/storage";
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
import Table from "@/components/Table/Table.vue";
import MonthPicker from "@/components/MonthPicker/MonthPicker.vue";
import managementExperienceItem from "@/utils/managementExperience";
export default {
  components: { DatePicker, Combobox, MonthPicker, Table },
  data() {
    let that = this as any;
    return {
      valid: true,
      updateFile: {
        file: [],
      },
      updateQRCodeFile: {
        file: [],
      },
      formData: {
        avatar: "",
        books: "",
        booksValue: [],
        email: "",
        phoneNumber: "",
        birthday: "",
        character: "",
        projects: "",
        location: "",
        group: "",
        cityValue: [],
        sex: "",
        number: "",
        highSchool: "",
        fields: "",
        fieldsValue: [],
        majors: "",
        majorsValue: [],
        resumeValue: [],
        identity: "",
        isGraduated: false,
        substation: "",
        weChatPic: "",
        graduateYear: 0,
        graduateMonth: 0,
        managementExperience: "",
        managementExperienceValue: [],
        shareValue: [],
        shares: "",
        gainValue: [],
        gains: "",
        characterResult: "",
        teamValue: [],
      },

      rules: {
        emailRules: [
          (v: string) => /.+@.+\..+/.test(v) || "请输入正确的电子邮箱地址~",
        ],
        phoneNumberRules: [
          (v: string | undefined) =>
            (v && v.length == 11) || "请输入正确的手机号",
        ],
      },
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
          "稳重踏实",
          "外向开朗",
          "善解人意",
          "和蔼可亲",
          "尚不清楚",
        ],
        characterResultItems: [
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
      shareData: [],
      gainData: [],
      graduated: "",
      identityString: "",
      uniqueDirections: [],
      uniqueDirectionsByGain: [],
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
      resumeProp: {
        multiple: true,
      },
      isShowShare: true,
      addDialog: false,
      addAspectDialog: false,
      queryNumberDialog: false,
      newShareDirection: "",
      newShareAspectParam: {
        shareAspect: "",
        shareDirection: "",
      },
      isShowGain: true,
      addGainDialog: false,
      addGainAspectDialog: false,
      newGainDirection: "",
      newGainAspectParam: {
        gainAspect: "",
        gainDirection: "",
      },
      hint: {
        majorHint: "添加熟悉的专业方向（若没有对应选项可以直接输入）",
        fieldHint: "添加技术栈标签（若没有对应选项可以直接输入）",
        bookHint: "添加您想推荐的书籍（若没有对应选项可以直接输入）",
      },
      label: {
        majorLabel: "熟悉的专业方向",
        fieldLabel: "技术栈方向",
        weChatPicLabel: "上传微信二维码",
        graduateLabel: "毕业年-月",
        birthdayLabel: "出生年-月-日",
        bookLabel: "推荐书籍",
      },
      shareDisabled: false,
      keyForShare: 0,
      keyForGain: 100000,
      queryName: "",
      queryNumberSuccess: false,
      isShowResume: false,
    };
  },
  async mounted() {
    (this as any).items.managementExperienceItem = managementExperienceItem;
    (this as any).items.teams = Groups;
    (this as any).cityData = Cities;
    (this as any).resumeData = Resumes;
    (this as any).formData.phoneNumber = getPhone();
    await getPersonalInformation()
      .then((res: any) => {
        (this as any).formData = transformAfterGet(res.data.data);
        (this as any).isShowResume = false;
        setTimeout(() => {
          (this as any).isShowResume = true;
        }, 100);
        if ((this as any).formData.shares != "") {
          let i = 1;
          var shareValueTmp = (this as any).formData.shares.split(";");
          (this as any).formData.shareValue = [shareValueTmp[0].split('-')];
          for (i; i < shareValueTmp.length; i++) {
            (this as any).formData.shareValue = [...(this as any).formData.shareValue, shareValueTmp[i].split("-")];
          }
          let idx = 0;
          for (idx; idx < (this as any).formData.shareValue.length; idx++) {
            (this as any).uniqueDirections.push(
              (this as any).formData.shareValue[idx][0]
            );
          }

          (this as any).uniqueDirections = deWeightArray(
            (this as any).uniqueDirections
          );
        }
        if ((this as any).formData.gains != "") {
          let i = 1;
          var gainValueTmp = (this as any).formData.gains.split(";");
          (this as any).formData.gainValue = [gainValueTmp[0].split('-')];
          for (i; i < gainValueTmp.length; i++) {
            (this as any).formData.gainValue = [...(this as any).formData.gainValue, gainValueTmp[i].split("-")];
          }
          let idx = 0;
          for (idx; idx < (this as any).formData.gainValue.length; idx++) {
            (this as any).uniqueDirectionsByGain.push(
              (this as any).formData.gainValue[idx][0]
            );
          }
          (this as any).uniqueDirectionsByGain = deWeightArray(
            (this as any).uniqueDirectionsByGain
          );
        }
      })
      .catch((err) => {
        console.log(err);
        (this as any).$message.error("获取个人信息失败，请重试~");
      });
    await (this as any).getAllFields();
    await (this as any).getAllMajors();
    await (this as any).getAllBooks();
    await (this as any).getShareAllDirectionsFunc();
    await (this as any).getGainAllDirectionsFunc();
    let i = 0;
    for (i; i <= (this as any).uniqueDirections.length; i++) {
      await getShareAllAspects({
        shareDirection: (this as any).uniqueDirections[i],
      })
        .then((res: any) => {
          let idx = 0;
          for (idx; idx < (this as any).shareData.length; idx++) {
            if (
              (this as any).shareData[idx].value ==
              (this as any).uniqueDirections[i]
            ) {
              var newObj = arrayToObject(res.data.data.shareAspects, true);
              if ((this as any).shareData[idx].children != newObj) {
                (this as any).shareData[idx].children = newObj;
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
          for (idx; idx < (this as any).gainData.length; idx++) {
            if (
              (this as any).gainData[idx].value ==
              (this as any).uniqueDirectionsByGain[j]
            ) {
              var newObj = arrayToObject(res.data.data.gainAspects, true);
              if ((this as any).gainData[idx].children != newObj) {
                (this as any).gainData[idx].children = newObj;
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
  methods: {
    changeNumber(val) {
      (this as any).queryNumberDialog = false;
      // (this as any).queryNumberSuccess = false;
      (this as any).formData.number = val;
    },
    async queryNumberFunc() {
      if ((this as any).queryName) {
        await queryNumber({ userName: (this as any).queryName })
          .then((res: any) => {
            (this as any).queryTableData = res.data.data;
            (this as any).$message.success("查询成功！");
            (this as any).queryNumberSuccess = true;
            (this as any).queryNumberDialog = false;
            setTimeout(() => {
              (this as any).queryNumberDialog = true;
            }, 100);
          })
          .catch((err: any) => {
            console.log(err);
            (this as any).queryNumberDialog = false;
            (this as any).$message.error("查询时发生了一些错误，请重试~");
          });
      } else {
        (this as any).$message.error("请输入查询的内容");
      }
    },
    childrenMajorItems(val) {
      (this as any).formData.majorsValue = val;
    },
    childrenFieldItems(val) {
      (this as any).formData.fieldsValue = val;
    },
    childrenBookItems(val) {
      (this as any).formData.booksValue = val;
    },
    lazyLoadGain(node: any, resolve: any) {
      const { level } = node;
      if (level < 2 && node.label != "添加方向") {
        var getGainAllAspectsParams = { gainDirection: "" };
        getGainAllAspectsParams.gainDirection = node.label;
        var prevNodes: any[] = [];
        getGainAllAspects(getGainAllAspectsParams)
          .then((res: any) => {
            prevNodes = res.data.data.gainAspects;
            if (prevNodes) {
              prevNodes.push("添加方向");
            } else {
              prevNodes = ["添加方向"];
            }
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
      if (level < 2 && node.label != "添加方向") {
        var getShareAllAspectsParams = { shareDirection: "" };
        getShareAllAspectsParams.shareDirection = node.label;
        var prevNodes: any[] = [];
        getShareAllAspects(getShareAllAspectsParams)
          .then((res: any) => {
            prevNodes = res.data.data.shareAspects;
            if (prevNodes) {
              prevNodes.push("添加方向");
            } else {
              prevNodes = ["添加方向"];
            }
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
    async getShareAllDirectionsFunc() {
      await getShareAllDirections()
        .then((res: any) => {
          var directions = res.data.data.shareDirections;
          if (directions != null) {
            directions.push("添加方向");
          } else {
            directions = ["添加方向"];
          }
          (this as any).shareData = arrayToObject(directions, false);
        })
        .catch((err: any) => {
          console.log(err);
        });
    },
    async getGainAllDirectionsFunc() {
      await getGainAllDirections()
        .then((res: any) => {
          var directions = res.data.data.gainDirections;
          if (directions != null) {
            directions.push("添加方向");
          } else {
            directions = ["添加方向"];
          }
          (this as any).gainData = arrayToObject(directions, false);
        })
        .catch((err: any) => {
          console.log(err);
        });
    },
    handleShareChange(value) {
      let i = 0;
      for (i; i < value.length; i++) {
        if (value[i][0] == "添加方向") {
          (this as any).formData.shareValue.pop();
          (this as any).isShowShare = false;
          setTimeout(() => {
            (this as any).isShowShare = true;
          }, 100);
          (this as any).addDialog = true;
        } else if (value[i][1] == "添加方向") {
          (this as any).newShareAspectParam.shareDirection = value[i][0];
          (this as any).formData.shareValue.pop();
          (this as any).isShowShare = false;
          setTimeout(() => {
            (this as any).isShowShare = true;
          }, 100);
          (this as any).addAspectDialog = true;
        }
      }
    },
    async addShareDirectionFunc() {
      await addShareDirection({
        shareDirection: (this as any).newShareDirection,
      })
        .then((res: any) => {
          (this as any).$message.success("已成功添加新方向~");
          (this as any).addDialog = false;
          (this as any).getShareAllDirectionsFunc();
          //强制刷新页面，这里会导致填写的数据重置，但可以考虑直接提交一次
          (this as any).$router.go(0);
          (this as any).isShowShare = false;
          setTimeout(() => {
            (this as any).isShowShare = true;
          }, 100);
        })
        .catch((err: any) => {
          console.log(err);
        });
    },
    async addGainDirectionFunc() {
      await addGainDirection({ gainDirection: (this as any).newGainDirection })
        .then((res: any) => {
          (this as any).$message.success("已成功添加新方向~");
          (this as any).addGainDialog = false;
          (this as any).getGainAllDirectionsFunc();
          //强制刷新页面，这里会导致填写的数据重置，但可以考虑直接提交一次
          (this as any).$router.go(0);
          (this as any).isShowGain = false;
          setTimeout(() => {
            (this as any).isShowGain = true;
          }, 1000);
        })
        .catch((err: any) => {
          console.log(err);
        });
    },
    async addShareAspectFunc() {
      await addShareAspect((this as any).newShareAspectParam)
        .then((res: any) => {
          (this as any).$message.success("已成功添加新方向~");
          (this as any).addAspectDialog = false;
          (this as any).getShareAllDirectionsFunc();
          //强制刷新页面，这里会导致填写的数据重置，但可以考虑直接提交一次
          (this as any).$router.go(0);
          (this as any).isShowShare = false;
          setTimeout(() => {
            (this as any).isShowShare = true;
          }, 100);
        })
        .catch((err: any) => {
          console.log(err);
        });
    },
    async addGainAspectFunc() {
      await addGainAspect((this as any).newGainAspectParam)
        .then((res: any) => {
          (this as any).$message.success("已成功添加新方向~");
          (this as any).addGainAspectDialog = false;
          (this as any).getGainAllDirectionsFunc();
          //强制刷新页面，这里会导致填写的数据重置，但可以考虑直接提交一次
          (this as any).$router.go(0);
          (this as any).isShowGain = false;
          setTimeout(() => {
            (this as any).isShowGain = true;
          }, 100);
        })
        .catch((err: any) => {
          console.log(err);
        });
    },
    handleGainChange(value) {
      let i = 0;
      if (value) {
        for (i; i < value.length; i++) {
          if (value[i][0] == "添加方向") {
            (this as any).formData.gainValue.pop();
            (this as any).isShowGain = false;
            setTimeout(() => {
              (this as any).isShowGain = true;
            }, 100);
            (this as any).addGainDialog = true;
          } else if (value[i][1] == "添加方向") {
            (this as any).newGainAspectParam.gainDirection = value[i][0];
            (this as any).formData.gainValue.pop();
            (this as any).isShowGain = false;
            setTimeout(() => {
              (this as any).isShowGain = true;
            }, 100);
            (this as any).addGainAspectDialog = true;
          }
        }
      }
    },
    saveBirthday(val) {
      (this as any).formData.birthday = val;
    },
    saveGraduateYear(val) {
      (this as any).formData.graduateYear = val.slice(0, 4);
      (this as any).formData.graduateMonth = val.slice(5, 7);
    },
    async validate() {
      (this as any).$refs.form.validate();
      (this as any).formData = transformBeforeUpdate((this as any).formData);
      await (this as any).updateFields();
      await (this as any).updateMajors();
      await (this as any).updateBooks();
      try {
        await updatePersonalInformation((this as any).formData);
        (this as any).$message.success("更新成功！");
        setAvatarSrc((this as any).formData.avatar);
        (this as any).formData = transformAfterGet((this as any).formData);
      } catch (error) {
        (this as any).$message.error("更新失败，请重试~");
      }
      (this as any).getAllFields();
    },
    async changeAvatar() {
      if ((this as any).updateFile.file) {
        if ((this as any).updateFile.file.size / 1024 > 1024) {
          (this as any).$message.error("请上传大小小于1M的图片~");
          (this as any).updateFile.file = [];
        } else {
          let file = new FormData(); //创建form对象
          file.append("pic", (this as any).updateFile.file); //通过append向form对象添加数据
          await postAvatar(file)
            .then((res: any) => {
              if (res.data.status == 0) {
                (this as any).formData.avatar = res.data.data.filePath;
                (this as any).$store.state.avatarSrc = res.data.data.filePath;
                setAvatarSrc(res.data.data.filePath);
              }
            })
            .catch((err: any) => {
              (this as any).$message.error("图片上传失败，请重试~");
            });
        }
      }
    },
    async updateQRCode() {
      if ((this as any).updateQRCodeFile.file) {
        if ((this as any).updateQRCodeFile.file.size / 1024 > 1024) {
          (this as any).$message.error("请上传大小小于1M的图片~");
          (this as any).updateQRCodeFile.file = [];
        } else {
          let file = new FormData(); //创建form对象
          file.append("pic", (this as any).updateQRCodeFile.file); //通过append向form对象添加数据
          await postQRCode(file)
            .then((res: any) => {
              if (res.data.status == "ok") {
                (this as any).formData.weChatPic = res.data.link;
              }
            })
            .catch((err: any) => {
              console.log(err);
              (this as any).$message.error("图片上传失败，请重试~");
            });
        }
      }
    },
    async updateFields() {
      // 取出新添加的标签放入newFields
      var combinedFields = (this as any).items.fieldItems.concat(
        (this as any).formData.fields
      );
      var uniqueFields = Array.from(new Set(combinedFields));
      var fieldItems = (this as any).items.fieldItems;
      var _arr1 = uniqueFields.filter((item1) => !fieldItems.includes(item1));
      var _arr2 = fieldItems.filter((item2) => !uniqueFields.includes(item2));
      const _arr = _arr1.concat(_arr2);
      var newFields = _arr1;

      if (newFields.length >= 1 && newFields[0] != "") {
        newFields.forEach((val: any, idx, array) => {
          var field: any = '{"field": ' + '"' + val + '"' + "}";
          addFields(field)
            .then((res: any) => {
              (this as any).$message.success("添加技术栈成功！");
            })
            .catch((err: any) => {
              console.log(err);
              (this as any).$message.error("添加标签失败，请重试~");
            });
        });
      }
    },
    async updateBooks() {
      var combinedBooks = (this as any).items.bookItems.concat(
        (this as any).formData.books
      );
      var uniqueBooks = Array.from(new Set(combinedBooks));
      var bookItems = (this as any).items.bookItems;
      var _arr1 = uniqueBooks.filter((item1) => !bookItems.includes(item1));
      var _arr2 = bookItems.filter((item2) => !uniqueBooks.includes(item2));
      const _arr = _arr1.concat(_arr2);
      var newBooks = _arr1;

      if (newBooks.length >= 1 && newBooks[0] != "") {
        newBooks.forEach((val: any, idx, array) => {
          var book: any = '{"book": ' + '"' + val + '"' + "}";
          addBooks(book)
            .then((res: any) => {
              console.log(res);
            })
            .catch((err: any) => {
              console.log(err);
              (this as any).$message.error("添加书籍失败，请重试~");
            });
        });
      }
    },
    async getAllBooks() {
      getBooks()
        .then((res: any) => {
          (this as any).items.bookItems = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getAllFields() {
      getFields()
        .then((res: any) => {
          (this as any).items.fieldItems = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async updateMajors() {
      // 取出新添加的标签放入newFields
      var combinedMajors = (this as any).items.majorItems.concat(
        (this as any).formData.majors
      );
      var uniqueMajors = Array.from(new Set(combinedMajors));
      var majorItems = (this as any).items.majorItems;
      var _arr1 = uniqueMajors.filter((item1) => !majorItems.includes(item1));
      var _arr2 = majorItems.filter((item2) => !uniqueMajors.includes(item2));
      const _arr = _arr1.concat(_arr2);
      var newMajors = _arr1;

      if (newMajors.length >= 1 && newMajors[0] != "") {
        newMajors.forEach((val: any, idx, array) => {
          var major: any = '{"major": ' + '"' + val + '"' + "}";
          addMajors(major)
            .then((res: any) => {
              console.log(res);
            })
            .catch((err: any) => {
              console.log(err);
              (this as any).$message.error("添加专业方向失败，请重试~");
            });
        });
      }
    },
    async getAllMajors() {
      getMajors()
        .then((res: any) => {
          if (res.data.data.length == 1 && res.data.data[0] == "") {
            (this as any).$message.success("目前不存在专业方向，请添加~");
          } else {
            (this as any).items.majorItems = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    pushToWeChatPic() {
      if ((this as any).formData.weChatPic) {
        window.open((this as any).formData.weChatPic, "_blank");
      } else {
        (this as any).$message.error("请先上传二维码~");
      }
    },
    pushToCharacterWeb() {
      window.open(
        "https://www.16personalities.com/ch/%E4%BA%BA%E6%A0%BC%E6%B5%8B%E8%AF%95",
        "_blank"
      );
    },
    addResumeFunc(newVal: any) {
      (this as any).formData.resumeValue = [];
    },
  },
  watch: {
    "formData.weChatPic"(newVal, oldVal) {
      if (newVal != "") {
        (this as any).label.weChatPicLabel = "微信二维码已上传~";
      }
    },
    shareData(newVal, oldVal) {
      ++(this as any).keyForShare;
    },
    gainData(newVal, oldVal) {
      ++(this as any).keyForGain;
    },
  },
};
</script>

<style>
.cityChoose .el-input__inner {
  border: 0;
  border-bottom: 1px solid;
  border-radius: 0px;
  padding: 0 0;
}
.cityChoose .el-input .el-icon-arrow-down:before {
  content: "\e790";
  color: #000000;
}
.cityChoose .el-input .el-input__suffix {
  right: 0px;
}
.mainBox {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>
