import axios from "axios";
import { baseURL, TIMEOUT, CONTENT_TYPE, ERROR_CODE } from "../config/index";

const Axios = axios.create({
  baseURL: baseURL,
  timeout: TIMEOUT,
  headers: { "Content-Type": CONTENT_TYPE },
});

// 请求拦截
Axios.interceptors.request.use(
  (config: any) => {
    config.headers["Authorization"] = ""; // getToken
    return config;
  },
  (err: any) => {
    Promise.reject(err);
  }
)

// 响应拦截
Axios.interceptors.response.use(
  (res: any) => {
    const errorCode = res.data.status; // 状态码在哪里具体看后端
    // 错误处理
    switch (errorCode) {
      case ERROR_CODE.LOGIN_FAIL:
        // todo
        break;

      default:
        break;
    }
  },
  (err:any) => {
    return Promise.reject(err);
  }
);

export default Axios;
