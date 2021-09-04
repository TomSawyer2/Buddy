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
          label="上传微信二维码"
          class="pt-10"
          style="width: 100%"
          v-model="updateQRCodeFile.file"
          @change="updateQRCode()"
        ></v-file-input>
        <v-btn @click="pushToWeChatPic" small class="mt-3">查看二维码</v-btn>
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

      <DatePicker @save="save" :date="formData.birthday" class="pl-2" />

      <v-select
        v-model="formData.graduateYear"
        :items="items.graduateYearItems"
        label="毕业年份"
        required
      ></v-select>

      <el-cascader
        v-model="formData.cityValue"
        :options="cityData"
        @change="handleCityChange"
        placeholder="请选择您所在的城市"
        style="position: relative; width: 100%"
        class="cityChoose mb-2"
        clearable
        filterable
      ></el-cascader>

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

      <v-text-field
        v-model="formData.number"
        :rules="rules.numberRules"
        label="队员编号（格式：D800,若没有则填无）"
        required
      ></v-text-field>

      <el-cascader
        v-model="formData.resumeValue"
        :options="resumeData"
        @change="handleResumeChange"
        placeholder="请选择您的项目组履历"
        style="position: relative; width: 100%"
        class="cityChoose mb-2"
        clearable
        filterable
      ></el-cascader>

      <v-select
        v-model="formData.managementExperience"
        :items="items.managementExperienceItem"
        label="核心层职务(选择您任职时间最长或最有心得的一项）"
        required
      ></v-select>

      <v-combobox
        v-model="formData.majors"
        :items="items.majorItems"
        :search-input.sync="search"
        hide-selected
        hint="最多添加十个专业方向（若没有对应选项可以直接输入）"
        label="添加更多标签"
        multiple
        persistent-hint
        small-chips
        clearable
        deletable-chips
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                没有匹配的选项。 按下 <kbd>enter</kbd> 创建新标签。
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-combobox>

      <el-cascader
        v-model="formData.shareValue"
        v-if="formData.isGraduated == '是' && isShowShare"
        :options="shareData"
        :props="shareProp"
        @change="handleShareChange"
        placeholder="请选择您乐于分享的方向"
        style="position: relative; width: 100%"
        class="cityChoose mb-2"
        clearable
        :key="keyValue"
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

      <el-cascader
        v-model="formData.gainValue"
        v-if="isShowGain"
        :options="gainData"
        :props="gainProp"
        @change="handleGainChange"
        placeholder="请选择您想要有所收获的方向"
        style="position: relative; width: 100%"
        class="cityChoose mb-2"
        clearable
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

      <v-combobox
        v-model="formData.fields"
        :items="items.fieldItems"
        :search-input.sync="search"
        hide-selected
        hint="最多添加十个标签（若没有对应选项可以直接输入）"
        label="添加更多标签"
        multiple
        persistent-hint
        small-chips
        clearable
        deletable-chips
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                没有匹配的选项。 按下 <kbd>enter</kbd> 创建新标签。
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-combobox>

      <v-text-field
        v-model="formData.highSchool"
        :rules="rules.highSchoolRules"
        label="毕业高中"
        required
      ></v-text-field>
      
      <h5>性格自评（您认为自己的性格特征）</h5>
      <SlidePicker
        @sendCharacter="sendCharacter"
        :character="formData.character"
        :isDisabled="false"
      />

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
  getShareAllDirections,
  getShareAllAspects,
  addShareDirection,
  addShareAspect,
  getGainAllDirections,
  getGainAllAspects,
  addGainDirection,
  addGainAspect,
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
import { transformAfterGet, transformBeforeUpdate } from "@/utils/transform";
import DatePicker from "@/components/DatePicker/DatePicker.vue";
import SlidePicker from "@/components/SlidePicker/SlidePicker.vue";
import Cities from "@/utils/city";
import Resumes from "@/utils/resume";
import managementExperienceItem from "@/utils/managementExperience";
export default {
  components: { DatePicker, SlidePicker },
  data: () => ({
    valid: true,
    updateFile: {
      file: [],
    },
    updateQRCodeFile: {
      file: [],
    },
    formData: {
      avatar: "",
      email: "",
      phoneNumber: "",
      birthday: "",
      character: "",

      country: "",
      city: "",
      province: "",
      region: "",

      cityValue: [],
      sex: "",
      number: "",
      highSchool: "",
      fields: [],
      majors: [],
      resumeValue: [],
      identity: "",
      isGraduated: false,
      substation: "",
      weChatPic: "",
      graduateYear: 2020,
      managementExperience: "",
      shareValue: [],
      shares: [],
      gainValue: [],
      gains: [],
      group: "",
      project: "",
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
      graduateYearItems: [],
      managementExperienceItem: [],
    },
    cityData: [],
    resumeData: [],
    shareData: [],
    gainData: [],
    graduated: "",
    identityString: "",
    search: null,
    uniqueDirections: [],
    uniqueDirectionsByGain: [],
    keyValue: 0,
    shareProp: {
      multiple: true,
      lazy: true,
      lazyLoad (node, resolve) {
        const { level } = node;
        if (level < 2 && node.label != "添加方向") {
          var getShareAllAspectsParams = {shareDirection: ""};
          getShareAllAspectsParams.shareDirection = node.label;
          var prevNodes: any[] = [];
          getShareAllAspects(getShareAllAspectsParams)
            .then((res : any) => {
              console.log(res.data.data);
              prevNodes = res.data.data.shareAspects;
              prevNodes.push("添加方向");

              var tempObj = {};
              for (let key in prevNodes) {
                tempObj[key] = prevNodes[key];
              };
              var nodes = Object.keys(tempObj).map(val => ({
                label: tempObj[val],
                value: tempObj[val],
                leaf: true
              }));
              let i = 0;
              let j = 0;
              for(i; i < node.children.length; i ++) {
                for(j; j < nodes.length; j ++) {
                  if (nodes[j].value != "添加方向") {
                    if (node.children[i].value == nodes[j].value) {
                      nodes.splice(j, 1);
                      j --;
                      i ++;
                    }
                  }
                }
              }
              resolve(nodes);
            })
            .catch((err : any) => {
              console.log(err);
            })
        } else {
          resolve([]);
        }
      }
    },
    keyValueByGain: 0,
    gainProp: {
      multiple: true,
      lazy: true,
      lazyLoad (node, resolve) {
        const { level } = node;
        console.log("已有的node:");
        console.log(node);
        console.log(node.label);
        console.log(level);
        if (level < 2 && node.label != "添加方向") {
          var getGainAllAspectsParams = {gainDirection: ""};
          getGainAllAspectsParams.gainDirection = node.label;
          var prevNodes: any[] = [];
          getGainAllAspects(getGainAllAspectsParams)
            .then((res : any) => {
              console.log(res.data.data);
              prevNodes = res.data.data.gainAspects;
              prevNodes.push("添加方向");
              console.log("prevNodes:");
              console.log(prevNodes);

              var tempObj = {};
              for (let key in prevNodes) {
                tempObj[key] = prevNodes[key];
              };
              var nodes = Object.keys(tempObj).map(val => ({
                label: tempObj[val],
                value: tempObj[val],
                leaf: true
              }));
              console.log("目前的nodes:");
              console.log(nodes);
              let i = 0;
              let j = 0;
              for(i; i < node.children.length; i ++) {
                for(j; j < nodes.length; j ++) {
                  if (nodes[j].value != "添加方向") {
                    console.log("此次nodechildren为" + node.children[i].value);
                    console.log("此次nodes为" + nodes[j].value);
                    if (node.children[i].value == nodes[j].value) {
                      console.log("重复项：" + nodes[j].value);
                      nodes.splice(j, 1);
                      j --;
                      i ++;
                    }
                  }
                  
                }
              }
              resolve(nodes);
            })
            .catch((err : any) => {
              console.log(err);
            })
        } else {
          resolve([]);
        }
      }
    },
    isShowShare: true,
    addDialog: false,
    addAspectDialog: false,
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
    addShareDirectionParam: {
      shareDirection: "",
    },
    addGainDirectionParam: {
      gainDirection: "",
    },
  }),
  async mounted() {
    (this as any).items.managementExperienceItem = managementExperienceItem;
    (this as any).cityData = Cities;
    (this as any).resumeData = Resumes;
    (this as any).formData.phoneNumber = getPhone();
    await getPersonalInformation()
      .then((res: any) => {
        (this as any).formData = transformAfterGet(res.data.data);
        if ((this as any).formData.shares.length > 0) {
          let i = 1;
          (this as any).formData.shareValue = [(this as any).formData.shares[0].split("-")];
          for (i; i < (this as any).formData.shares.length ; i ++) {
            (this as any).formData.shareValue.push((this as any).formData.shares[i].split("-"));
          }
          let idx = 0;
          var getShareAllAspectsParams = new Object;
          
          for (idx; idx < (this as any).formData.shareValue.length; idx ++ ) {
            console.log((this as any).formData.shareValue[idx][0]);
            (this as any).uniqueDirections.push((this as any).formData.shareValue[idx][0]);
          }
          let s = new Set((this as any).uniqueDirections);
          (this as any).uniqueDirections = Array.from(s);
          console.log("独特的方向：" + (this as any).uniqueDirections);
        }
        if ((this as any).formData.gains.length > 0) {
          let i = 1;
          (this as any).formData.gainValue = [(this as any).formData.gains[0].split("-")];
          for (i; i < (this as any).formData.gains.length ; i ++) {
            (this as any).formData.gainValue.push((this as any).formData.gains[i].split("-"));
          }
          console.log("目前的gainValue:");
          console.log((this as any).formData.gainValue);
          let idx = 0;
          var getGainAllAspectsParams = new Object;
          
          for (idx; idx < (this as any).formData.gainValue.length; idx ++ ) {
            console.log((this as any).formData.gainValue[idx][0]);
            (this as any).uniqueDirectionsByGain.push((this as any).formData.gainValue[idx][0]);
          }
          let s = new Set((this as any).uniqueDirectionsByGain);
          (this as any).uniqueDirectionsByGain = Array.from(s);
          console.log("独特的方向：" + (this as any).uniqueDirectionsByGain);
        }
      })
      .catch((err) => {
        console.log(err);
        (this as any).$message.error("获取个人信息失败，请重试~");
      });
      
    console.log("gains:");
    console.log((this as any).formData.gains);
    await (this as any).getAllFields();
    await (this as any).getShareAllDirectionsFunc();
    await (this as any).getGainAllDirectionsFunc();
    await (this as any).getAllMajors();
    await (this as any).fillInYears();
    let i = 0;
    for (i; i <= (this as any).uniqueDirections.length; i ++ ) {
      var getShareAllAspectsParams = {shareDirection: ""};
      getShareAllAspectsParams.shareDirection = (this as any).uniqueDirections[i];
      await getShareAllAspects(getShareAllAspectsParams)
        .then((res : any) => {
          let idx = 0;
          for(idx; idx < (this as any).shareData.length; idx ++) {
            if ((this as any).shareData[idx].value == (this as any).uniqueDirections[i]) {
              var tempObj = {};
              for (let key in res.data.data.shareAspects) {
                tempObj[key] = res.data.data.shareAspects[key];
              };
              var newObj = Object.keys(tempObj).map(val => ({
                label: tempObj[val],
                value: tempObj[val],
                leaf: true
              }));
              if ((this as any).shareData[idx].children != newObj) {
                (this as any).shareData[idx].children = newObj;
              }
            }
          }
        })
        .catch((err : any) => {
          console.log(err);
        })
    }
    console.log("变化完的总数据： ");
    console.log((this as any).shareData);
    (this as any).isShowShare = false;
    // 这里搞个定时器重新载入一下组件就可以触发组件拉取数据
    setTimeout(() => {
      (this as any).isShowShare = true;
    }, 500);

    let j = 0;
    for (j; j <= (this as any).uniqueDirectionsByGain.length; j ++ ) {
      console.log("length:");
      console.log((this as any).uniqueDirectionsByGain);
      var getGainAllAspectsParams = {gainDirection: ""};
      getGainAllAspectsParams.gainDirection = (this as any).uniqueDirectionsByGain[j];
      await getGainAllAspects(getGainAllAspectsParams)
        .then((res : any) => {
          console.log("遍历获取aspect:");
          console.log(res.data.data.gainAspects);
          console.log("gainData:");
          console.log((this as any).gainData);
          let idx = 0;
          for(idx; idx < (this as any).gainData.length; idx ++) {
            console.log("第idx个： " );
            console.log((this as any).gainData[idx]);
            console.log("unique为:" + (this as any).uniqueDirectionsByGain);
            if ((this as any).gainData[idx].value == (this as any).uniqueDirectionsByGain[j]) {
              console.log("找到匹配的项目");
              var tempObj = {};
              for (let key in res.data.data.gainAspects) {
                tempObj[key] = res.data.data.gainAspects[key];
              };
              var newObj = Object.keys(tempObj).map(val => ({
                label: tempObj[val],
                value: tempObj[val],
                leaf: true
              }));
              console.log("生成叶子结点：");
              console.log(newObj);
              if ((this as any).gainData[idx].children != newObj) {
                (this as any).gainData[idx].children = newObj;
              }
            }
          }
        })
        .catch((err : any) => {
          console.log(err);
        })
    }
    console.log("变化完的总数据： ");
    console.log((this as any).gainData);
    (this as any).isShowGain = false;
    // 这里搞个定时器重新载入一下组件就可以触发组件拉取数据
    setTimeout(() => {
      (this as any).isShowGain = true;
    }, 500);
  },
  methods: {
    async getShareAllDirectionsFunc() {
      await getShareAllDirections()
        .then((res : any) => {
          console.log(res.data.data.shareDirections);
          var directions = res.data.data.shareDirections;
          console.log("directions: ");
          console.log(directions);
          if (directions.length != 0) {
            directions.push("添加方向");
          } else {
            directions = ["添加方向"];
          }
          (this as any).getShareAllAspectsFunc(directions);
        })
        .catch((err : any) => {
          console.log(err);
        })
    },
    async getGainAllDirectionsFunc() {
      await getGainAllDirections()
        .then((res : any) => {
          console.log(res.data.data.gainDirections);
          var directions = res.data.data.gainDirections;
          if (directions != null) {
            console.log("尝试push");
            directions.push("添加方向");
          } else {
            console.log("尝试直接赋值");
            directions = ["添加方向"];
          }
          (this as any).getGainAllAspectsFunc(directions);
        })
        .catch((err : any) => {
          console.log(err);
        })
    },
    async getShareAllAspectsFunc(arr: any) {
      var tempObj = {};
      for (let key in arr) {
        tempObj[key] = arr[key];
      };
      var newObj = Object.keys(tempObj).map(val => ({
        label: tempObj[val],
        value: tempObj[val]
      }));
      console.log("获得的数据：");
      console.log(newObj);
      (this as any).shareData = newObj;
    },
    async getGainAllAspectsFunc(arr: any) {
      var tempObj = {};
      for (let key in arr) {
        tempObj[key] = arr[key];
      };
      var newObj = Object.keys(tempObj).map(val => ({
        label: tempObj[val],
        value: tempObj[val]
      }));
      console.log("获得的数据by gain：");
      console.log(newObj);
      (this as any).gainData = newObj;
    },
    handleShareChange(value) {
      console.log("新的Value:");
      console.log(value);
      let i = 0;
      for (i; i < value.length; i ++) {
        if (value[i][0] == "添加方向") {
          console.log("添加一个大方向");
          (this as any).formData.shareValue.pop();
          (this as any).isShowShare = false;
          // 这里搞个定时器重新载入一下组件就可以触发组件拉取数据
          setTimeout(() => {
            (this as any).isShowShare = true;
          }, 500);
          (this as any).addDialog = true;
        } else if (value[i][1] == "添加方向") {
          console.log("添加一个小方向");
          (this as any).newShareAspectParam.shareDirection = value[i][0];
          (this as any).formData.shareValue.pop();
          (this as any).isShowShare = false;
          // 这里搞个定时器重新载入一下组件就可以触发组件拉取数据
          setTimeout(() => {
            (this as any).isShowShare = true;
          }, 500);
          (this as any).addAspectDialog = true;
        }
      }
    },
    async addShareDirectionFunc() {
      (this as any).addShareDirectionParam.shareDirection = (this as any).newShareDirection;
      await addShareDirection((this as any).addShareDirectionParam)
        .then((res : any) => {
          console.log(res);
          (this as any).$message.success("已成功添加新方向~");
          (this as any).addDialog = false;
          (this as any).getShareAllDirectionsFunc();
          //强制刷新页面，这里会导致填写的数据重置，但可以考虑直接提交一次
          (this as any).$router.go(0);
          (this as any).isShowShare = false;
          // 这里搞个定时器重新载入一下组件就可以触发组件拉取数据
          setTimeout(() => {
            (this as any).isShowShare = true;
          }, 500);
        })
        .catch((err : any) => {
          console.log(err);
        })
    },
    async addGainDirectionFunc() {
      (this as any).addGainDirectionParam.gainDirection = (this as any).newGainDirection;
      await addGainDirection((this as any).addGainDirectionParam)
        .then((res : any) => {
          console.log(res);
          (this as any).$message.success("已成功添加新方向~");
          (this as any).addGainDialog = false;
          (this as any).getGainAllDirectionsFunc();
          //强制刷新页面，这里会导致填写的数据重置，但可以考虑直接提交一次
          (this as any).$router.go(0);
          (this as any).isShowGain = false;
          // 这里搞个定时器重新载入一下组件就可以触发组件拉取数据
          setTimeout(() => {
            (this as any).isShowGain = true;
          }, 500);
        })
        .catch((err : any) => {
          console.log(err);
        })
    },
    async addShareAspectFunc() {

      await addShareAspect((this as any).newShareAspectParam)
        .then((res : any) => {
          console.log(res);
          (this as any).$message.success("已成功添加新方向~");
          (this as any).addAspectDialog = false;
          (this as any).getShareAllDirectionsFunc();
          //强制刷新页面，这里会导致填写的数据重置，但可以考虑直接提交一次
          (this as any).$router.go(0);
          (this as any).isShowShare = false;
          // 这里搞个定时器重新载入一下组件就可以触发组件拉取数据
          setTimeout(() => {
            (this as any).isShowShare = true;
          }, 500);
        })
        .catch((err : any) => {
          console.log(err);
        })
    },
    async addGainAspectFunc() {

      await addGainAspect((this as any).newGainAspectParam)
        .then((res : any) => {
          console.log(res);
          (this as any).$message.success("已成功添加新方向~");
          (this as any).addGainAspectDialog = false;
          (this as any).getGainAllDirectionsFunc();
          //强制刷新页面，这里会导致填写的数据重置，但可以考虑直接提交一次
          (this as any).$router.go(0);
          (this as any).isShowGain = false;
          // 这里搞个定时器重新载入一下组件就可以触发组件拉取数据
          setTimeout(() => {
            (this as any).isShowGain = true;
          }, 500);
        })
        .catch((err : any) => {
          console.log(err);
        })
    },
    handleGainChange(value) {
      console.log("新的Value:");
      console.log(value);
      let i = 0;
      for (i; i < value.length; i ++) {
        if (value[i][0] == "添加方向") {
          console.log("添加一个大方向");
          (this as any).formData.gainValue.pop();
          (this as any).isShowGain = false;
          // 这里搞个定时器重新载入一下组件就可以触发组件拉取数据
          setTimeout(() => {
            (this as any).isShowGain = true;
          }, 500);
          (this as any).addGainDialog = true;
        } else if (value[i][1] == "添加方向") {
          console.log("添加一个小方向");
          (this as any).newGainAspectParam.gainDirection = value[i][0];
          (this as any).formData.gainValue.pop();
          (this as any).isShowGain = false;
          // 这里搞个定时器重新载入一下组件就可以触发组件拉取数据
          setTimeout(() => {
            (this as any).isShowGain = true;
          }, 500);
          (this as any).addGainAspectDialog = true;
        }
      }
    },
    handleCityChange(value) {
      console.log(value);
    },
    handleResumeChange(value) {
      console.log(value);
    },
    fillInYears() {
      // 用于动态填充年份
      var date = new Date();
      console.log("现在的年份：" + date.getFullYear());
      var i = date.getFullYear();
      for (i; i >= 1950; i--) {
        (this as any).items.graduateYearItems.push(i);
      }
    },
    sendCharacter(val) {
      (this as any).formData.character = val;
      console.log(val);
    },
    save(val) {
      (this as any).formData.birthday = val;
      console.log(val);
    },
    async validate() {
      (this as any).$refs.form.validate();
      console.log((this as any).formData);
      (this as any).formData = transformBeforeUpdate((this as any).formData);
      await (this as any).updateFields();
      await (this as any).updateMajors();
      try {
        await updatePersonalInformation((this as any).formData);
        console.log("更新成功！");
        console.log((this as any).items.fieldItems);
        (this as any).$message.success("更新成功！");
        setAvatarSrc((this as any).formData.avatar);
        (this as any).formData = transformAfterGet((this as any).formData);
      } catch (error) {
        console.log(error);
        (this as any).$message.error("更新失败，请重试~");
      }
      (this as any).getAllFields();
    },
    async changeAvatar() {
      if ((this as any).updateFile.file) {
        console.log("文件大小：" + (this as any).updateFile.file.size);
        if ((this as any).updateFile.file.size / 1024 > 1024) {
          (this as any).$message.error("请上传大小小于1M的图片~");
          console.log("上传文件过大");
          (this as any).updateFile.file = [];
        } else {
          let file = new FormData(); //创建form对象
          file.append("pic", (this as any).updateFile.file); //通过append向form对象添加数据
          console.log(file.get("pic"));
          await postAvatar(file)
            .then((res: any) => {
              console.log(res);
              if (res.data.status == "ok") {
                console.log(res.data.link);
                (this as any).formData.avatar = res.data.link;
                (this as any).$store.state.avatarSrc = res.data.link;
                setAvatarSrc(res.data.link);
              }
            })
            .catch((err: any) => {
              console.log(err);
              (this as any).$message.error("图片上传失败，请重试~");
            });
        }
      }
    },
    async updateQRCode() {
      if ((this as any).updateQRCodeFile.file) {
        console.log("文件大小：" + (this as any).updateQRCodeFile.file.size);
        if ((this as any).updateQRCodeFile.file.size / 1024 > 1024) {
          (this as any).$message.error("请上传大小小于1M的图片~");
          console.log("上传文件过大");
          (this as any).updateQRCodeFile.file = [];
        } else {
          let file = new FormData(); //创建form对象
          file.append("pic", (this as any).updateQRCodeFile.file); //通过append向form对象添加数据
          console.log(file.get("pic"));
          await postQRCode(file)
            .then((res: any) => {
              console.log(res);
              if (res.data.status == "ok") {
                console.log(res.data.link);
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
      console.log("Combined array:" + combinedFields);
      var uniqueFields = Array.from(new Set(combinedFields));
      console.log("Unique array:" + uniqueFields);
      var fieldItems = (this as any).items.fieldItems;
      var _arr1 = uniqueFields.filter((item1) => !fieldItems.includes(item1));
      var _arr2 = fieldItems.filter((item2) => !uniqueFields.includes(item2));
      const _arr = _arr1.concat(_arr2);
      console.log("New fields:" + _arr1);
      var newFields = _arr1;

      if (newFields.length >= 1) {
        newFields.forEach((val: any, idx, array) => {
          console.log(val);
          var field: any = '{"field": ' + '"' + val + '"' + "}";
          addFields(field)
            .then((res: any) => {
              console.log(res);
            })
            .catch((err: any) => {
              console.log(err);
              (this as any).$message.error("添加标签失败，请重试~");
            });
        });
      }
    },
    async getAllFields() {
      getFields()
        .then((res: any) => {
          console.log(res);
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
      console.log("Combined array:" + combinedMajors);
      var uniqueMajors = Array.from(new Set(combinedMajors));
      console.log("Unique array:" + uniqueMajors);
      var majorItems = (this as any).items.majorItems;
      var _arr1 = uniqueMajors.filter((item1) => !majorItems.includes(item1));
      var _arr2 = majorItems.filter((item2) => !uniqueMajors.includes(item2));
      const _arr = _arr1.concat(_arr2);
      console.log("New majors:" + _arr1);
      var newMajors = _arr1;

      if (newMajors.length >= 1) {
        newMajors.forEach((val: any, idx, array) => {
          console.log(val);
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
          console.log(res);
          if (res.data.data.length == 1 && res.data.data[0] == "") {
            console.log("目前不存在专业方向");
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
    addResumeFunc (newVal: any) {
      console.log("修改：" + newVal);
      (this as any).formData.resumeValue = [];
    },
  },
  watch: {
    model(val: any) {
      if (val.length > 10) {
        (this as any).$nextTick(() => (this as any).model.pop());
      }
    },
    shareData(newVal) {
      (this as any).keyValue++ //只要监听到数据源发生变化 ，改变keyValue的值，达到重新渲染的效果
    },
    // gainData(newVal) {
    //   (this as any).keyValueByGain++ //只要监听到数据源发生变化 ，改变keyValue的值，达到重新渲染的效果
    // },
  }
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
</style>
