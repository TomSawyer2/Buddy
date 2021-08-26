<template>
  <div
    v-bind:style="{ height: pageHeight + 'px' }"
    style="
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: center;
      align-items: center;
    "
  >
    <v-form ref="form" v-model="valid" lazy-validation style="width: 40%">
      <v-text-field
        v-model="loginDataByPwd.phoneNumber"
        :rules="rules.phoneNumberRules"
        label="手机号"
        required
        v-if="passwordLogin"
      ></v-text-field>
      <v-text-field
        v-model="loginDataByCaptcha.phoneNumber"
        :rules="rules.phoneNumberRules"
        label="手机号"
        required
        v-if="captchaLogin"
      ></v-text-field>
      <v-text-field
        v-model="loginDataByPwd.password"
        :rules="rules.passwordRules"
        label="密码"
        required
        v-if="passwordLogin"
      ></v-text-field>
      <v-text-field
        v-model="loginDataByCaptcha.validationCode"
        label="验证码"
        :rules="rules.captchaRules"
        required
        v-if="captchaLogin"
      ></v-text-field>
      <a
        href="/register"
        style="display: flex; justify-content: flex-end; text-decoration: none"
        >注册</a
      >

      <div style="display: flex; justify-content: center">
        <v-btn
          :disabled="!valid"
          color="success"
          @click="login"
          v-if="passwordLogin"
          style="width: 30%"
        >
          登录
        </v-btn>
        <v-btn
          :disabled="!valid"
          color="success"
          @click="login"
          class="mr-6"
          v-if="captchaLogin"
          style="width: 30%"
        >
          登录
        </v-btn>
        <v-btn
          :disabled="btnDisabled"
          v-if="captchaLogin"
          color="warning"
          @click="getCaptchaFunc"
          style="width: 30%"
        >
          {{ codeStatus }}
        </v-btn>
      </div>
      <div class="selectBtn">
        <v-btn text @click="changeWayToLogin" class="mt-4">
          {{ selectBtnText }}
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts">
import { postLoginByPassword, postLoginByCaptcha, getCaptcha } from "../apis";
import { setToken, getToken, removeToken } from "../utils/storage";

export default {
  data: () => ({
    valid: true,
    passwordLogin: 1, // 采用密码登录
    captchaLogin: 0, // 采用验证码登录
    loginDataByPwd: {
      phoneNumber: "",
      password: "",
    },
    loginDataByCaptcha: {
      phoneNumber: "",
      validationCode: "",
    },
    rules: {
      phoneNumberRules: [
        (v: string | undefined) => !!v || "请输入手机号",
        (v: string | undefined) =>
          (v && v.length == 11) || "请输入正确的手机号",
      ],
      passwordRules: [(v: string | undefined) => !!v || "请输入内容"],
      captchaRules: [(v: string) => !!v || "请输入内容"],
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
    (this as any).valid = true;
    // 自动调节组件高度
    (this as any).pageHeight = document.documentElement.clientHeight;
    console.log((this as any).pageHeight);
  },
  methods: {
    async login() {
      (this as any).$refs.form.validate();

      //验证码初始化
      (this as any).btnDisabled = false;
      clearInterval((this as any).timer);
      (this as any).timer = null;
      (this as any).codeStatus = "获取验证码";

      //发送登录请求
      if ((this as any).passwordLogin) {
        console.log(
          "通过密码发送登录请求，参数为：" + (this as any).loginDataByPwd
        );
        await postLoginByPassword((this as any).loginDataByPwd)
          .then((res: any) => {
            console.log(res);
            if (res.data.status == 0) {
              // 成功登录
              console.log("成功登录！");
              (this as any).$message.success("登录成功！");
              //状态控制为登录
              (this as any).$store.state.isLogin = true;
              (this as any).$store.state.avatarSrc = res.data.data.avatar;
              (this as any).$store.state.userName = res.data.data.userName;
              (this as any).$store.state.phoneNumber = (this as any).loginDataByPwd.phoneNumber;
              setToken(res.data.data.token);
              console.log(getToken());
              //跳转至主页面
              (this as any).$router.push({ path: "/" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if ((this as any).captchaLogin) {
        console.log(
          "通过验证码发送登录请求，参数为：" + (this as any).loginDataByCaptcha
        );
        await postLoginByCaptcha((this as any).loginDataByCaptcha)
          .then((res: any) => {
            console.log(res.data);
            if (res.data.status == 0) {
              console.log("成功登录！");
              //状态控制为登录
              (this as any).$store.state.isLogin = true;
              (this as any).$store.state.isLogin = true;
              (this as any).$store.state.avatarSrc = res.data.data.avatar;
              (this as any).$store.state.userName = res.data.data.userName;
              (this as any).$store.state.phoneNumber = (this as any).loginDataByCaptcha.phoneNumber;
              setToken(res.data.data.token);
              //跳转至主页面
              (this as any).$router.push({ path: "/" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async getCaptchaFunc() {
      const { phoneNumber } = (this as any).loginDataByCaptcha;
      if (this.checkPhone(phoneNumber)) {
        try {
          await getCaptcha({ phoneNumber });
          console.log("验证码发送成功");
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
    changeWayToLogin() {
      (this as any).passwordLogin = !(this as any).passwordLogin;
      (this as any).captchaLogin = !(this as any).captchaLogin;
      if ((this as any).passwordLogin) {
        (this as any).selectBtnText = "使用验证码登录";
      } else {
        (this as any).selectBtnText = "使用密码登录";
      }
    },
  },
};
</script>

<style>
.selectBtn {
  display: flex;
  justify-content: center;
}
</style>
