<template>
  <div v-bind:style="{ height: pageHeight + 'px' }" class="contain">
    <h1 class="font-weight-light mb-4">注册</h1>
    <v-form v-model="valid" :style="{ width: width + '%' }">
      <v-text-field
        label="真实姓名"
        v-model="registerData.userName"
        :rules="rules.requried"
        validate-on-blur
        clearable
      />
      <div class="contain-phone">
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
      <a href="/login" class="link">去登录</a>
      <div class="btn-reg">
        <v-btn
          :disabled="!valid"
          color="primary"
          @click="register"
          style="width: 30%"
        >
          注册
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts">
import { getRegisterCaptcha, postRegister } from "@/apis";
import Message from "@/components/Message";
import { checkPhone } from "@/utils/check";
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
      width: 40,

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
    async register() {
      const registerData = (this as any).registerData;
      try {
        await postRegister(registerData);
        Message.success("注册成功");
        (this as any).$router.push("/login");
      } catch (error) {
        console.log(error);
      }
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

<style scoped>
.contain {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.contain-phone {
  display: flex;
  align-items: baseline;
}
.link {
  display: flex;
  justify-content: flex-end;
  text-decoration: none;
}
.btn-reg {
  display: flex;
  justify-content: center;
}
</style>
