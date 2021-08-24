<template>
  <div
    v-bind:style="{ height: pageHeight + 'px' }"
    style="
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;
    "
  >
    <!-- <v-card> -->
    <h1>用户注册</h1>
    <v-form v-model="valid" ref="registerForm" lazy-validation>
      <v-text-field
        label="真实姓名"
        v-model="registerData.userName"
        :rules="rules.requried"
        validate-on-blur
        clearable
      />
      <div style="display: flex; align-items: baseline">
        <v-text-field
          label="手机号"
          v-model="registerData.phoneNumber"
          :rules="rules.phoneRules"
          validate-on-blur
          clearable
        />
        <v-btn
          :disabled="btnDisabled"
          color="warning"
          @click="getCaptcha"
          style="width: 30%"
        >
          {{ codeStatus }}
        </v-btn>
      </div>
      <v-text-field
        label="验证码"
        v-model="registerData.validationCode"
        :rules="rules.captchaRules"
        validate-on-blur
        clearable
      />
      <v-text-field
        label="密码"
        v-model="registerData.passWord"
        clearable
        validate-on-blur
        hint="至少6位"
        :rules="rules.pwdRules"
        :type="showPwd ? 'text' : 'password'"
        :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPwd = !showPwd"
      />
      <v-text-field
        label="确认密码"
        v-model="confirmPwd"
        clearable
        :rules="[passwordConfirm]"
        :type="showConfirmPwd ? 'text' : 'password'"
        :append-icon="showConfirmPwd ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showConfirmPwd = !showConfirmPwd"
        validate-on-blur
      />
      <div style="justify-content: center; display: flex">
        <v-btn
          :disabled="valid"
          color="primary"
          @click="register"
          style="width: 30%"
        >
          注册
        </v-btn>
      </div>
    </v-form>
    <!-- </v-card> -->
  </div>
</template>

<script lang="ts">
import { getRegisterCaptcha } from "@/apis";
import Message from "@/components/Message";
import { checkPhone } from "@/utils/check";
import Vue from "vue";
export default {
  name: "Register",
  data() {
    return {
      registerData: {
        userName: "",
        phoneNumber: "",
        validationCode: "",
        passWord: "",
      },
      confirmPwd: "",
      showPwd: false,
      showConfirmPwd: false,
      codeStatus: "获取验证码",
      timer: null,
      count: 59, // 倒计时
      rules: {
        phoneRules: [
          (v: string | undefined): string | boolean =>
            checkPhone(v) || "请输入正确的手机号",
        ],
        pwdRules: [
          (v: string | undefined): string | boolean =>
            (v || "").length >= 6 || "密码至少6位",
        ],
        requried: [
          (v: string | undefined): string | boolean => !!v || "不能为空",
        ],
        captchaRules: [
          (v: string | undefined): string | boolean =>
            (v || "").length === 4 || "请输入正确格式的验证码", // 现在收到的是4位，还不一定
        ],
      },
      valid: false,
      btnDisabled: false,
      pageHeight: 0,
    };
  },
  methods: {
    async getCaptcha() {
      const { phoneNumber } = (this as any).registerData;
      if (checkPhone(phoneNumber)) {
        try {
          await getRegisterCaptcha({ phoneNumber });
          Message.success("验证码发送成功！");
          (this as any).codeStatus = "已发送(60s)";
          (this as any).btnDisabled = true;
          const TIME_COUNT = 60;
          (this as any).countDown(TIME_COUNT);
        } catch (error) {
          console.log(error);
          Message.error("验证码发送失败，请重试(´・ω・`)");
        }
      } else {
        Message.error("请输入正确的电话号码再尝试(´・ω・`)");
      }
    },
    register() {
      (this as any).$refs.registerForm.validate();
    },
    countDown(TIME_OUT: number) {
      let timer = setInterval(() => {
        if ((this as any).count > 0 && (this as any).count <= TIME_OUT) {
          (this as any).count--;
          (this as any).codeStatus = `已发送(${(this as any).count}s)`;
        } else {
          clearInterval(timer);
          (this as any).btnDisabled = false;
          (this as any).codeStatus = "获取验证码";
        }
      }, 1000);
    },
    checkConfirm() {
      return (this as any).registerData.passWord === (this as any).confirmPwd;
    },
  },
  mounted() {
    (this as any).pageHeight = document.documentElement.clientHeight;
  },
  computed: {
    passwordConfirm: function (): boolean | string {
      return (
        (this as any).registerData.passWord === (this as any).confirmPwd ||
        "密码需一致"
      );
    },
  },
};
</script>

<style></style>
