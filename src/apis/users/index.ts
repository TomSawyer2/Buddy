import axios from "../request";
import { getCaptchaInfo, LoginInfo } from "@/models";
import { URL } from "@/config";

export async function getCaptcha(
  params: getCaptchaInfo
): Promise<Record<string, unknown>> {
  return await axios.post(URL.getCaptcha, params);
}

export async function postLoginByPassword(
  params: LoginInfo
): Promise<Record<string, unknown>> {
  return await axios.post(URL.postLoginByPassword, params);
}

export async function postLoginByCaptcha(
  params: LoginInfo
): Promise<Record<string, unknown>> {
  return await axios.post(URL.postLoginByCaptcha, params);
}
