import axios from "../request";

import { getCaptchaInfo, LoginInfo, RegisterInfo } from "@/models";

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

export async function getRegisterCaptcha(
  params: getCaptchaInfo
): Promise<Record<string, unknown>> {
  return await axios.post(URL.getRegisterCaptcha, params);
}

export function postRegister(
  params: RegisterInfo
): Promise<Record<string, unknown>> {
  return axios.post(URL.postRegsiter, params);
}
