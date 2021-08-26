import axios from "../request";
import {
  getCaptchaInfo,
  getPersonalInformationInfo,
  LoginInfo,
  updatePersonalInformationInfo,
  // postAvatarInfo,
  RegisterInfo,
} from "@/models";
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

export async function getPersonalInformation(
  params: getPersonalInformationInfo
): Promise<Record<string, unknown>> {
  return await axios.post(URL.getPersonalInformation, params);
}

export async function updatePersonalInformation(
  params: updatePersonalInformationInfo
): Promise<Record<string, unknown>> {
  return await axios.post(URL.updatePersonalInformation, params);
}

export async function postAvatar(
  params: FormData
): Promise<Record<string, unknown>> {
  return await axios.post("http://175.24.30.102:4000/api/post", params, {
    headers: { "content-type": "multipart/form-data" },
  });
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
