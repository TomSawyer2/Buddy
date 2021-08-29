export const baseURL = "http://39.101.183.162:18082";
export const TIMEOUT = 5000;
export const CONTENT_TYPE = "application/json";

const URL = {
  // font-end

  // back-end
  // user-related
  acceptBuddy: "/requests/pass",
  refuseBuddy: "/requests/reject",
  getCaptcha: "/login/validation/getValidationCode",
  getFields: "/fields/all",
  addFields: "/fields/add",
  getPersonalInformation: "/personalSpace/info/show",
  getReceivedRequests: "/requests/received",
  postSendBuddyRequest: "/requests/send",
  getSentRequests: "/requests/sent",
  updatePersonalInformation: "/personalSpace/info/update",
  postLoginByPassword: "/login/password",
  postLoginByCaptcha: "/login/validation/passInfo",
  getRegisterCaptcha: "/register/getValidationCode",
  postRegsiter: "/register/passInfo",

  // xxx-related
};

const ERROR_CODE = {
  LOGIN_FAIL: 2,
  TOKEN_FAILED: 7,//token有问题
  PHONENUMBERNOTREGISTERED: 8, //手机号未注册
  CAPTCHA_ERR: 19,
  CAPTCHA_ERR_REG: 14,
  USER_EXISTED: 12,
  PHONE_EXISTED: 11,
};

export { URL, ERROR_CODE };
