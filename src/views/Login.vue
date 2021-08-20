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
        v-model="verifyCode"
        label="验证码"
        :rules="verifyCodeRules"
        required
        v-if="verifyCodeLogin"
      ></v-text-field>

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
          v-if="verifyCodeLogin"
          style="width: 30%"
        >
          登录
        </v-btn>
        <v-btn
          :disabled="btnDisabled"
          v-if="verifyCodeLogin"
          color="warning"
          @click="getVerifyCode"
          style="width: 30%"
        >
          {{ codeStatus }}
        </v-btn>
      </div>
      <div class="selectBtn">
      <v-btn text @click="changeWayToLogin" class="mt-4">
        {{selectBtnText}}
      </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
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
    verifyCodeRules: [(v) => !!v || "请输入内容"],
    verifyCode: "",
    passwordLogin: 1, // 采用密码登录
    verifyCodeLogin: 0, // 采用验证码登录
    codeStatus: "获取验证码", // 获取验证码按钮的文字
    btnDisabled: false, // 获取验证码按钮是否可用
    countdown: 60, // 倒计时秒数
    count: "", // 倒计时
    timer: null,
    selectBtnText: "使用验证码登录",
    pageHeight: 0,
  }),
  mounted () {
    this.valid = true
    // 自动调节组件高度
    this.pageHeight = document.documentElement.clientHeight;
    console.log(this.pageHeight);
  },
  methods: {
    login() {
      this.$refs.form.validate();
      //清除验证码的计时器
      this.btnDisabled = false;
      clearInterval(this.timer);
      this.timer = null;
      this.codeStatus = "获取验证码";
      this.$store.state.isLogin = true;
      this.$router.push({path: '/'})
      console.log(
        "登录!" +
          "phoneNumber:" +
          this.phoneNumber +
          " password:" +
          this.password
      );
    },
    changePassword() {
      this.$refs.form.resetValidation();
    },
    getVerifyCode() {
      if (this.phoneNumber && this.phoneNumber.length == 11) {
        console.log("等待验证码...");
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
      }
    },
    changeWayToLogin () {
      this.passwordLogin = !this.passwordLogin
      this.verifyCodeLogin = !this.verifyCodeLogin
      if (this.passwordLogin) {
        this.selectBtnText = "使用验证码登录"
      } else {
        this.selectBtnText = "使用密码登录"
      }
    }
  },
};
</script>

<style>
.selectBtn {
  display: flex;
  justify-content: center;
}
</style>