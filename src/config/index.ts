export const TIMEOUT = 10000;
export const CONTENT_TYPE = "application/json";

let baseURL= "";
if (process.env.NODE_ENV === 'development') {
  baseURL = "http://39.101.183.162:18082";
  // dev
} else {
  baseURL = "https://celebration.dian.org.cn/api";
  // build
}
export default baseURL;

const URL = {
  // font-end

  // back-end
  // user-related
  acceptBuddy: "/requests/pass",
  refuseBuddy: "/requests/reject",
  getCaptcha: "/login/validation/getValidationCode",
  getMajors: "/majors/all",
  addMajors: "/majors/add",
  getFields: "/fields/all",
  addFields: "/fields/add",
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

  // buddy-related
  getAllUsersByPage: "/index/students",
  getAllOldUsersByPage: "/index/teachers",
  getUserDetailById: "/index/studentDetail",
  getOldUserDetailByPhone: "/index/teacherDetail",
  postSendBuddyRequest: "/requests/send",

  getAllFields: "/fields/all", // 重复了

  // search-related
  searchUsersByNameAndFields: "/search/nameWithFields",
};

const ERROR_CODE = {
  LOGIN_FAIL: 1, // 登录手机或密码错误
  TOKEN_NOT_EXISTED: 2, // token不存在
  TOKEN_EXPIRED: 3, // token过期或无效 // TODO 重新登录
  TOKEN_FAILED: 4, // token与提交申请的用户不一致
  PHONENUMBERNOTREGISTERED: 5, // 手机号未注册
  TOKEN_NOT_EXIST: 6, // token解析出用户不存在
  USER_EXISTED: 7, // 注册用户名已存在
  PHONE_EXISTED: 8, // 注册手机号已存在
  CAPTCHA_NOT_GET: 9, // 注册未生成验证码
  CAPTCHA_ERR_REG: 10, // 注册验证码错误

  TEACHER_NOT_FOUND: 11, // 请求Buddy对象不是老队员

  FIELD_EXISTED: 12, // 新建技术栈已存在
  FIELD_BLANK: 13, // 技术栈为空

  APPLY_REASON_BLANK: 14, // 申请理由为空
  REQUEST_SELF: 15, // 向自己提出buddy申请
  REQUEST_NOT_FOUND: 16, // 没有找到对应请求
  QRCODE_ERR: 17, // 没有上传二维码
  INFO_BLANK: 18, // 没有补全信息
  REQUEST_MAX_NUM: 19, // 小队员请求数量上限
  REQ_MAX_NUM: 20, // 老队员已接收了三个小队员
  CHOOSE_MAX_NUM: 21, // 小队员选择数量达上限
  PASS_MAX_NUM: 22,// 老队员通过数量达上限
  SEARCH_NOT_FOUND: 23, // 无查询结果
  REQ_NOT_MAX_NUM: 24, // 老队员待接收数量达上限
  MAJOR_EMPTY: 25, // 专业方向为空

  INTERNAL_ERR: 26, // 服务器内部错误
  PARAM_ERR: 27, // 参数错误


};

export { URL, ERROR_CODE };
