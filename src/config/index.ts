export const TIMEOUT = 10000;
export const CONTENT_TYPE = "application/json";

let baseURL = "";
if (process.env.NODE_ENV === "development") {
  // baseURL = "http://39.101.183.162:18081/api";
  baseURL = "https://celebration.dian.org.cn/api";
  // dev
} else {
  baseURL = "https://celebration.dian.org.cn/api";
  // build
}
export default baseURL;

const URL = {
  // font-end

  // back-end
  // admin
  getUserList: "/admin/getUserList",
  updateUserInfo: "/admin/updateUserInfo",
  deleteUser: "/admin/deleteUser",

  // forgetPwd
  forgetPwdGetCaptcha: "/password/forget/getValidationCode",
  forgetPwdSubmit: "/password/forget/passInfo",

  // changePwd
  changePwdGetCaptcha: "/password/change/getValidationCode",
  changePwdSubmit: "/password/change/passInfo",

  // user-related
  acceptBuddy: "/requests/pass",
  refuseBuddy: "/requests/reject",
  getCaptcha: "/login/validation/getValidationCode",
  getMajors: "/majors/all",
  addMajors: "/majors/add",
  getFields: "/fields/all",
  addFields: "/fields/add",
  getBooks: "/books/all",
  addBooks: "/books/add",
  getShareAllDirections: "/share/allDirections",
  getShareAllAspects: "/share/allAspects",
  addShareDirection: "/share/addDirection",
  addShareAspect: "/share/addAspect",
  getGainAllDirections: "/gain/allDirections",
  getGainAllAspects: "/gain/allAspects",
  addGainDirection: "/gain/addDirection",
  addGainAspect: "/gain/addAspect",
  getPersonalInformation: "/personalSpace/info/show",
  getReceivedRequests: "/requests/received",
  getSentRequests: "/requests/sent",
  updatePersonalInformation: "/personalSpace/info/update",
  postLoginByPassword: "/login/password",
  postLoginByCaptcha: "/login/validation/passInfo",
  getRegisterCaptcha: "/register/getValidationCode",
  postRegsiter: "/register/passInfo",
  postAvatar: "/files/avatar",
  queryNumber: "/number/search",
  // buddy-related
  getAllUsersByPage: "/index/students",
  getAllOldUsersByPage: "/index/teachers",
  getUserDetailById: "/index/studentDetail",
  getOldUserDetailByPhone: "/index/teacherDetail",
  postSendBuddyRequest: "/requests/send",

  getAllFields: "/fields/all", // 重复了

  // search-related
  searchUsersByNameAndFields: "/search/buddy",
};

const ERROR_CODE = {
  
  TOKEN_NOT_EXISTED: 1, // token不存在
  TOKEN_EXPIRED: 2, // token过期或无效 // TODO 重新登录
  TOKEN_FAILED: 3, // token与提交申请的用户不一致
  TOKEN_NOT_EXIST: 4, // token解析出用户不存在
  TOKEN_ERR: 5, // token生成失败

  LOGIN_FAIL: 11, // 登录手机或密码错误

  PHONENUMBERNOTREGISTERED: 21, // 手机号未注册
  USER_EXISTED: 22, // 注册用户名已存在
  PHONE_EXISTED: 23, // 注册手机号已存在

  CAPTCHA_NOT_GET: 31, // 注册未生成验证码
  CAPTCHA_ERR_REG: 32, // 注册验证码错误

  TEACHER_NOT_FOUND: 41, // 请求Buddy对象不是老队员
  APPLY_REASON_BLANK: 42, // 申请理由为空
  REQUEST_SELF: 43, // 向自己提出buddy申请
  REQUEST_NOT_FOUND: 44, // 没有找到对应请求
  QRCODE_ERR: 45, // 没有上传二维码
  INFO_BLANK: 46, // 没有补全信息
  REQUEST_MAX_NUM: 47, // 小队员请求数量上限
  REQ_MAX_NUM: 48, // 老队员已接收了三个小队员
  CHOOSE_MAX_NUM: 49, // 小队员选择数量达上限
  PASS_MAX_NUM: 50, // 老队员通过数量达上限
  REQ_NOT_MAX_NUM: 51, // 老队员待接收数量达上限

  SEARCH_NOT_FOUND: 71, // 无查询结果

  FIELD_EXISTED: 101, // 新建技术栈已存在
  FIELD_BLANK: 102, // 技术栈为空
  MAJOR_EMPTY: 103, // 专业方向为空
  
  SHARE_DIREC_EXISTED: 104, // 分享大方向已存在
  SHARE_ASPECT_EXISTED: 105, // 该分享方向下的小方向已存在
  SHARE_DIREC_BLANK: 106, // 分享的大方向为空
  GAIN_DIREC_EXISTED: 107, // 求助大方向已存在
  GAIN_ASPECT_EXISTED: 108, // 该求助方向下的小方向已存在
  GAIN_DIREC_BLANK: 109, // 求助大方向为空

  INTERNAL_ERR: 500, // 服务器内部错误
  PARAM_ERR: 501, // 参数错误

  
  
};

export { URL, ERROR_CODE };
