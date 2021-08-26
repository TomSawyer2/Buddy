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
      <v-text-field
        v-model="formData.phoneNumber"
        :rules="rules.phoneNumberRules"
        label="电话"
        required
        class="pt-10"
      ></v-text-field>

      <v-text-field
        v-model="formData.email"
        :rules="rules.emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <div class="d-flex justify-space-between">
        <v-select
          v-model="formData.sex"
          :items="items.sexItems"
          :rules="[(v) => !!v || '请选择您的性别~']"
          label="性别"
          required
          class="pr-2"
        ></v-select>
        <v-select
          v-model="graduated"
          :items="items.isGraduatedItems"
          :rules="[(v) => !!v || '请选择您是否出站~']"
          label="是否出站"
          required
          class="pl-2"
        ></v-select>
      </div>

      <div class="d-flex justify-space-between">
        <v-text-field
          v-model="formData.number"
          :rules="rules.numberRules"
          label="队员编号（若没有则填无）"
          required
          class="pr-2"
        ></v-text-field>
        <v-text-field
          v-model="formData.highSchool"
          :rules="rules.highSchoolRules"
          label="毕业高中"
          required
          class="pl-2"
        ></v-text-field>
      </div>

      <v-text-field
        v-model="formData.hobby"
        :rules="rules.hobbyRules"
        label="兴趣爱好（请用空格分隔）"
        required
      ></v-text-field>

      <v-text-field
        v-model="formData.teamExperience"
        :rules="rules.teamExperienceRules"
        label="队内经历（现在或曾经所在的项目组/队委会小组等等）"
        required
      ></v-text-field>

      <v-text-field
        v-model="formData.resume"
        :rules="rules.resumeRules"
        label="履历（没有则填无）"
        required
      ></v-text-field>

      <v-text-field
        v-model="formData.field"
        :rules="rules.fieldRules"
        label="技术栈"
        required
      ></v-text-field>

      <v-select
        v-model="formData.substation"
        v-if="graduated == '是' ? true : false"
        :items="items.substationItems"
        :rules="[(v) => !!v || '请选择您目前所在的分站~']"
        label="所在分站"
        required
      ></v-select>

      <v-text-field v-model="formData.notes" label="备注(选填）"></v-text-field>

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
} from "../apis";
export default {
  data: () => ({
    valid: true,
    updateFile: {
      file: [],
    },
    formData: {
      avatar: "",
      email: "",
      phoneNumber: "",
      sex: "",
      hobby: "",
      teamExperience: "",
      number: "",
      highSchool: "",
      field: "",
      resume: "",
      isGraduated: false,
      substation: "",
      notes: "",
    },

    rules: {
      emailRules: [
        // (v: string | undefined) => !!v || "请输入电子邮箱地址~",
        (v: string) => /.+@.+\..+/.test(v) || "请输入正确的电子邮箱地址~",
      ],
      phoneNumberRules: [
        // (v: string | undefined) => !!v || "请输入手机号",
        (v: string | undefined) =>
          (v && v.length == 11) || "请输入正确的手机号",
      ],
      // hobbyRules: [(v: string | undefined) => !!v || "请输入您的兴趣爱好~"],
      // teamExperienceRules: [
      //   (v: string | undefined) => !!v || "请输入您的队内经历~",
      // ],
      // numberRules: [(v: string | undefined) => !!v || "请输入您的队员编号~"],
      // highSchoolRules: [
      //   (v: string | undefined) => !!v || "请输入您的毕业高中~",
      // ],
      // fieldRules: [(v: string | undefined) => !!v || "请输入您的技术栈~"],
      // resumeRules: [(v: string | undefined) => !!v || "请输入您的履历~"],
    },
    items: {
      sexItems: ["男", "女"],
      // identityItems: ["在站", "出站", "名誉队员", "导师", "顾问", "临时", "其他"],
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
    },
    graduated: "",
  }),
  mounted() {
    (this as any).formData.phoneNumber = (this as any).$store.state.phoneNumber;
    const { phoneNumber } = (this as any).formData;
    getPersonalInformation({ phoneNumber })
      .then((res: any) => {
        (this as any).formData = res.data.data;
        if (res.data.data.isGraduated) {
          (this as any).graduated = "是";
        } else {
          (this as any).graduated = "否";
        }
      })
      .catch((err) => {
        console.log(err);
        (this as any).$message.error("获取个人信息失败，请重试~");
      });
  },
  methods: {
    async validate() {
      (this as any).$refs.form.validate();
      console.log((this as any).formData);
      if ((this as any).graduated == "是") {
        (this as any).formData.isGraduated = true;
      } else {
        (this as any).formData.isGraduated = false;
        (this as any).formData.substation = "";
      }
      try {
        await updatePersonalInformation((this as any).formData);
        console.log("更新成功！");
        (this as any).$message.success("更新成功！");
        (this as any).$store.state.avatarSrc = (this as any).formData.avatar;
      } catch (error) {
        console.log(error);
        (this as any).$message.error("更新失败，请重试~");
      }
    },
    async changeAvatar() {
      let file = new FormData(); //创建form对象
      file.append("pic", (this as any).updateFile.file); //通过append向form对象添加数据
      console.log(file.get("pic"));
      await postAvatar(file)
        .then((res: any) => {
          console.log(res);
          if (res.data.status == "ok") {
            console.log(res.data.link);
            (this as any).formData.avatar = res.data.link;
          }
        })
        .catch((err: any) => {
          console.log(err);
          (this as any).$message.error("图片上传失败，请重试~");
        });
    },
  },
};
</script>

<style></style>
