<template>
  <div v-bind:style="{ height: pageHeight + 'px' }" class="mainBox">
    <v-form ref="form" v-model="valid" lazy-validation style="width: 50%">
      <v-text-field
        v-model="forgetPasswordParam.phoneNumber"
        :rules="rules.phoneNumberRules"
        label="手机号"
        required
      ></v-text-field>
      <div style="display: flex; flex-direction: row; align-items: center">
        <v-text-field
          v-model="forgetPasswordParam.validationCode"
          label="验证码"
          :rules="rules.captchaRules"
          required
          class="mr-2"
        ></v-text-field>
        <v-btn
          :disabled="btnDisabled"
          @click="getCaptchaFunc"
          style="width: 20%"
        >
          {{ codeStatus }}
        </v-btn>
      </div>

      <v-text-field
        v-model="forgetPasswordParam.newPassword"
        label="新密码"
        required
        type="password"
        autocomplete="off"
      ></v-text-field>
      <v-text-field
        v-model="confirmPassword"
        label="确认密码"
        required
        type="password"
        autocomplete="off"
      ></v-text-field>

      <div style="display: flex; justify-content: flex-end">
        <a href="/login" class="mr-5" style="text-decoration: none">登录</a>
        <a href="/register" style="text-decoration: none">注册</a>
      </div>

      <div style="display: flex; justify-content: center">
        <v-btn
          :disabled="!valid"
          color="success"
          @click="changePassword"
          style="width: 30%"
        >
          修改密码
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts">
import { forgetPwdGetCaptcha, forgetPwdSubmit } from "../apis";
import {
  setToken,
  getToken,
  removeToken,
  setPhone,
  setAvatarSrc,
  setUserName,
  removePhone,
  removeAvatarSrc,
  removeUserName,
} from "../utils/storage";
export default {
  data: () => ({
    valid: true,
    forgetPasswordParam: {
      phoneNumber: null,
      validationCode: null,
      newPassword: null,
    },
    confirmPassword: null,
    rules: {
      phoneNumberRules: [
        (v: string | undefined) => !!v || "请输入手机号",
        (v: string | undefined) =>
          (v && v.length == 11) || "请输入正确的手机号",
      ],
    },
    btnDisabled: false, // 获取验证码按钮是否可用
    codeStatus: "获取验证码", // 获取验证码按钮的文字
    count: "",
    timer: null,
    selectBtnText: "使用验证码登录",
    pageHeight: 0,
  }),
  mounted() {
    removeToken();
    removePhone();
    removeAvatarSrc();
    removeUserName();
    (this as any).valid = true;
    // 自动调节组件高度
    (this as any).pageHeight = document.documentElement.clientHeight;
  },
  created() {
    (this as any).keyupSubmit();
  },
  methods: {
    keyupSubmit() {
      document.onkeydown = (e) => {
        if (e.keyCode == 13) {
          (this as any).changePassword();
        }
      };
    },
    async changePassword() {
      if (
        (this as any).forgetPasswordParam.newPassword ==
        (this as any).confirmPassword
      ) {
        (this as any).$refs.form.validate();

        //验证码初始化
        (this as any).btnDisabled = false;
        clearInterval((this as any).timer);
        (this as any).timer = null;
        (this as any).codeStatus = "获取验证码";

        //发送登录请求
        await forgetPwdSubmit((this as any).forgetPasswordParam)
          .then((res: any) => {
            if (res.data.status == 0) {
              // 成功登录
              (this as any).$message.success("密码修改成功！");
              //跳转至主页面
              (this as any).$router.push({ path: "/login" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        (this as any).$message.error("请确认两次输入了相同的密码~");
      }
    },
    async getCaptchaFunc() {
      if (
        (this as any).checkPhone((this as any).forgetPasswordParam.phoneNumber)
      ) {
        try {
          await forgetPwdGetCaptcha({
            phoneNumber: (this as any).forgetPasswordParam.phoneNumber,
          });
          (this as any).$message.success("验证码发送成功！");
          (this as any).codeStatus = "60s后再次发送";
          (this as any).btnDisabled = true;
          const TIME_COUNT = 60;
          (this as any).countDown(TIME_COUNT);
        } catch (error) {
          console.log(error);
          (this as any).$message.error("验证码发送失败，请重试~");
        }
      } else {
        (this as any).$message.error("请输入正确的手机号~");
      }
    },
    countDown(TIME_OUT: number) {
      (this as any).count = TIME_OUT;
      (this as any).btnDisabled = true;
      (this as any).timer = setInterval(() => {
        if ((this as any).count > 0 && (this as any).count <= TIME_OUT) {
          (this as any).count--;
          (this as any).codeStatus = (this as any).count + "s后再次发送";
        } else {
          (this as any).btnDisabled = false;
          clearInterval((this as any).timer);
          (this as any).timer = null;
          (this as any).codeStatus = "获取验证码";
        }
      }, 1000);
    },
    checkPhone(value: string | undefined) {
      // 这个函数来自于utils的check.ts，但在这条分支上还没有出现该文件，下次改为从utils引用
      const regex = /^1[0-9]{10,10}$/;
      if (regex.test(value || "")) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
.mainBox {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>
