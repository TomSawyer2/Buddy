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
        v-model="phoneNumber"
        :rules="phoneNumberRules"
        label="手机号"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="密码"
        required
        v-if="passwordLogin"
      ></v-text-field>
      <v-text-field
        v-model="captcha"
        label="验证码"
        :rules="captchaRules"
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
          @click="getCaptcha"
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

<script>
import { postLoginByPassword, postLoginByCaptcha, getCaptcha } from "../apis";
import { setToken, getToken, removeToken } from "../utils/storage";

export default {
  data: () => ({
    valid: true,
    phoneNumber: "",
    phoneNumberRules: [
      (v) => !!v || "请输入手机号",
      (v) => (v && v.length == 11) || "请输入正确的手机号",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "请输入内容",
      // v => /.+@.+\..+/.test(v) || '请输入正确的密码',
    ],
    captchaRules: [(v) => !!v || "请输入内容"],
    captcha: "",
    passwordLogin: 1, // 采用密码登录
    captchaLogin: 0, // 采用验证码登录
    codeStatus: "获取验证码", // 获取验证码按钮的文字
    btnDisabled: false, // 获取验证码按钮是否可用
    countdown: 60, // 倒计时秒数
    count: "", // 倒计时
    timer: null,
    selectBtnText: "使用验证码登录",
    pageHeight: 0,
  }),
  mounted() {
    removeToken();
    this.valid = true;
    // 自动调节组件高度
    this.pageHeight = document.documentElement.clientHeight;
    console.log(this.pageHeight);
  },
  methods: {
    login() {
      this.$refs.form.validate();

      //验证码初始化
      this.btnDisabled = false;
      clearInterval(this.timer);
      this.timer = null;
      this.codeStatus = "获取验证码";

      //发送登录请求
      if (this.passwordLogin) {
        var loginParamsByPassword = new Object();
        loginParamsByPassword.phoneNumber = this.phoneNumber;
        loginParamsByPassword.password = this.password;
        JSON.stringify(loginParamsByPassword);
        console.log("通过密码发送登录请求，参数为：" + loginParamsByPassword);
        postLoginByPassword(loginParamsByPassword)
          .then((res) => {
            console.log(res);
            if (res.data.status == 0) {
              // 成功登录
              console.log("成功登录！");
              this.$message.success("登录成功！");
              //状态控制为登录
              this.$store.state.isLogin = true;
              setToken(res.data.data.token);
              console.log(getToken());
              //跳转至主页面
              this.$router.push({ path: "/" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.captchaLogin) {
        var loginParamsByCaptcha = new Object();
        loginParamsByCaptcha.phoneNumber = this.phoneNumber;
        loginParamsByCaptcha.validationCode = this.captcha;
        JSON.stringify(loginParamsByCaptcha);
        console.log("通过验证码发送登录请求，参数为：" + loginParamsByCaptcha);
        postLoginByCaptcha(loginParamsByCaptcha)
          .then((res) => {
            console.log(res.data);
            if (res.data.status == 0) {
              console.log("成功登录！");
              //状态控制为登录
              this.$store.state.isLogin = true;
              setToken(res.data.data.token);
              //跳转至主页面
              this.$router.push({ path: "/" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    changePassword() {
      this.$refs.form.resetValidation();
    },
    getCaptcha() {
      if (this.phoneNumber && this.phoneNumber.length == 11) {
        var getCaptchaParam =
          '{"phoneNumber": ' + '"' + this.phoneNumber + '"' + "}";
        getCaptcha(getCaptchaParam)
          .then((res) => {
            console.log(res.data);
            if (res.data.status == 0) {
              //验证码成功发送
              console.log("验证码发送成功");
              this.$message.success("验证码发送成功！");
              this.codeStatus = "60s后再次发送";
              this.btnDisabled = true;

              const TIME_COUNT = 60;
              if (!this.timer) {
                this.count = TIME_COUNT;
                this.btnDisabled = true;
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                    this.codeStatus = this.count + "s后再次发送";
                  } else {
                    this.btnDisabled = false;
                    clearInterval(this.timer);
                    this.timer = null;
                    this.codeStatus = "获取验证码";
                  }
                }, 1000);
              }
            } else {
              console.log("验证码发送失败，请重试");
              this.$message.success("验证码发送失败，请重试");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$message.error("请输入正确的手机号~");
      }
    },
    changeWayToLogin() {
      this.passwordLogin = !this.passwordLogin;
      this.captchaLogin = !this.captchaLogin;
      if (this.passwordLogin) {
        this.selectBtnText = "使用验证码登录";
      } else {
        this.selectBtnText = "使用密码登录";
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
