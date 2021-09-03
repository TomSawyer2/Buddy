import { getToken } from "@/utils/storage";
import axios from "axios";
import { baseURL, TIMEOUT, CONTENT_TYPE, ERROR_CODE } from "../config/index";
import Message from "../components/Message";

const Axios = axios.create({
  baseURL: baseURL,
  timeout: TIMEOUT,
  headers: { "Content-Type": CONTENT_TYPE },
  withCredentials: false,
});

// 请求拦截
Axios.interceptors.request.use(
  (config: any) => {
    config.headers["token"] = getToken(); // getToken
    return config;
  },
  (err: any) => {
    Promise.reject(err);
  }
);

// 响应拦截
Axios.interceptors.response.use(
  (res: any) => {
    const errorCode = res.data.status;
    // 错误处理
    switch (errorCode) {
      case ERROR_CODE.JSON_INVALID:
        Message.error("请求格式错误。");
        throw new Error(res.data.msg);

      case ERROR_CODE.LOGIN_FAIL:
        console.log("账号或密码错误，请重试。");
        Message.error("账号或密码错误，请重试。");
        throw new Error(res.data.msg);

      case ERROR_CODE.TOKEN_GENERATE_ERR:
        Message.error("登录失败，请重试。");
        throw new Error(res.data.msg);

      case ERROR_CODE.PHONENUMBERNOTREGISTERED:
        Message.error("手机号未注册，请先注册。");
        throw new Error(res.data.msg);
        break;

      case ERROR_CODE.USER_EXISTED:
        Message.error("用户名已注册！");
        throw new Error(res.data.msg);

      case ERROR_CODE.PHONE_EXISTED:
        Message.error("手机号已注册！");
        throw new Error(res.data.msg);

      case ERROR_CODE.CAPTCHA_NOT_GET:
        Message.error("请先获取验证码。");
        throw new Error(res.data.msg);

      case ERROR_CODE.CAPTCHA_ERR_REG:
        Message.error("验证码错误,请重试。");
        throw new Error(res.data.msg);

      case ERROR_CODE.TEACHER_NOT_FOUND:
        Message.error("不能向小队员提出申请~");
        throw new Error(res.data.msg);

      case ERROR_CODE.FIELD_EXISTED:
        Message.error("你新建的技术栈已存在，请重新选择。");
        throw new Error(res.data.msg);

      case ERROR_CODE.FIELD_BLANK:
        Message.error("技术栈不能为空！");
        throw new Error(res.data.msg);

      case ERROR_CODE.APPLY_REASON_BLANK:
        Message.error("申请理由不能为空~");
        break;

      case ERROR_CODE.REQUEST_SELF:
        Message.error("不能向自己提出申请！");
        break;
      
      case ERROR_CODE.REQUEST_NOT_FOUND:
        Message.error("申请不存在！");
        break;

      case ERROR_CODE.QRCODE_ERR:
        Message.error("请您先前往个人中心页面上传自己的二维码~");
        throw new Error(res.data.msg);

      case ERROR_CODE.INFO_BLANK:
        Message.error("请您先前往个人中心补全信息~");
        throw new Error(res.data.msg);

      case ERROR_CODE.REQUEST_MAX_NUM:
        Message.error("申请通过的数量已经达到上限~");
        throw new Error(res.data.msg);

      case ERROR_CODE.SEARCH_NOT_FOUND:
        Message.success("查询无果~");
        throw new Error(res.data.msg);
        break;

      case ERROR_CODE.REQ_MAX_NUM:
        Message.error("该老队员已经接受了三名小队员的申请，请选择其他老队员~");
        throw new Error(res.data.msg);
        break;

      case ERROR_CODE.INTERNAL_ERR:
        Message.error("服务器内部错误，请联系管理员~");
        throw new Error(res.data.msg);
        break;
      
      case ERROR_CODE.PARAM_ERR:
        Message.error("请求参数错误，请联系管理员~");
        throw new Error(res.data.msg);
        break;

      case ERROR_CODE.TOKEN_NOT_EXISTED:
      case ERROR_CODE.TOKEN_EXPIRED:
      case ERROR_CODE.TOKEN_FAILED:
      case ERROR_CODE.TOKEN_NOT_EXIST:
        Message.error("认证失败，请重新登录。");
        throw new Error(res.data.msg);
      default:
        return res;
    }
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

export default Axios;
