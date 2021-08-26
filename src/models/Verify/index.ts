export interface LoginInfo {
  phoneNumber: string;
  password: string;
  captcha: string;
} // 随便写的

export interface RegisterInfo {
  userName: string;
  phoneNumber: string;
  validationCode: string;
  passWord: string;
}

export interface getCaptchaInfo {
  phoneNumber: string;
}
