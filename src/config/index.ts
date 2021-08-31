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
  getSentRequests: "/requests/sent",
  updatePersonalInformation: "/personalSpace/info/update",
  postLoginByPassword: "/login/password",
  postLoginByCaptcha: "/login/validation/passInfo",
  getRegisterCaptcha: "/register/getValidationCode",
  postRegsiter: "/register/passInfo",

  // buddy-related
  getAllUsersByPage: "/index/students",
  getAllOldUsersByPage: "/index/teachers",
  getUserDetailByPhone: "/index/studentDetail",
  getOldUserDetailByPhone: "/index/teacherDetail",
  postSendBuddyRequest: "/requests/send",

  getAllFields: "/fields/all", // 重复了

  // search-related
  searchUsersByNameAndFields: "/search/nameWithFields",
};

const ERROR_CODE = {
  JSON_INVALID: 1, // 传输格式错误
  LOGIN_FAIL: 2, // 登录手机或密码错误
  TOKEN_GENERATE_ERR: 3, // token生成错误
  TOKEN_NOT_EXISTED: 4, // token不存在
  TOKEN_EXPIRED: 5, // token过期或无效 // TODO 重新登录
  TOKEN_ERR: 6, // token未知错误
  TOKEN_FAILED: 7, // token与提交申请的用户不一致
  PHONENUMBERNOTREGISTERED: 8, // 手机号未注册
  TOKEN_NOT_EXIST: 9, // token解析出用户不存在
  USER_EXISTED: 10, // 注册用户名已存在
  PHONE_EXISTED: 11, // 注册手机号已存在
  CAPTCHA_GENERATE_ERR: 12, // 验证码生成失败
  CAPTCHA_NOT_GET: 13, // 注册未生成验证码
  CAPTCHA_ERR_REG: 14, // 注册验证码错误

  UPDATE_INFO_ERR: 15, // 更新个人信息失败
  TEACHER_NOT_FOUND: 16, // 请求Buddy对象不是老队员

  FIELD_EXISTED: 17, // 新建技术栈已存在
  FIELD_BLANK: 18, // 技术栈为空

  APPLY_REASON_BLANK: 19, // 申请理由为空
  REQUEST_SELF: 20, // 向自己提出buddy申请
  REQUEST_NOT_FOUND: 21, // 没有找到对应请求
  QRCODE_ERR: 22, // 没有上传二维码
  INFO_BLANK: 23, // 没有补全信息
  REQUEST_MAX_NUM: 24, // 小队员请求数量上限
  REQ_MAX_NUM: 25,// 老队员已接收了三个小队员

  SEARCH_NOT_FOUND: 28, // 无查询结果
};

export { URL, ERROR_CODE };
