import axios from "../request";
import {
  getCaptchaInfo,
  LoginInfo,
  updatePersonalInformationInfo,
  // postAvatarInfo,
  RegisterInfo,
  getReceivedRequestsInfo,
  getSentRequestsInfo,
  acceptBuddyInfo,
  refuseBuddyInfo,
  postSendBuddyRequestInfo,
  addFieldsInfo,
  addMajorsInfo,
  IdInfo,
  getShareAllAspectsInfo,
  addShareDirectionInfo,
  addShareAspectInfo,
  getGainAllAspectsInfo,
  addGainDirectionInfo,
  addGainAspectInfo,
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
): Promise<Record<string, unknown>> {
  return await axios.post(URL.getPersonalInformation);
}

export async function updatePersonalInformation(
  params: updatePersonalInformationInfo
): Promise<Record<string, unknown>> {
  return await axios.post(URL.updatePersonalInformation, params);
}

export async function postAvatar(
  params: FormData
): Promise<Record<string, unknown>> {
  return await axios.post("//175.24.30.102:4000/api/postAvatar", params, {
    headers: { "content-type": "multipart/form-data" },
  });
}

export async function postQRCode(
  params: FormData
): Promise<Record<string, unknown>> {
  return await axios.post("//175.24.30.102:4000/api/postQRCode", params, {
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

export function getReceivedRequests(
  params: getReceivedRequestsInfo
): Promise<Record<string, unknown>> {
  return axios.post(URL.getReceivedRequests, params);
}

export function getSentRequests(
  params: getSentRequestsInfo
): Promise<Record<string, unknown>> {
  return axios.post(URL.getSentRequests, params);
}

export function acceptBuddy(
  params: acceptBuddyInfo
): Promise<Record<string, unknown>> {
  return axios.post(URL.acceptBuddy, params);
}

export function refuseBuddy(
  params: refuseBuddyInfo
): Promise<Record<string, unknown>> {
  return axios.post(URL.refuseBuddy, params);
}

export function getFields(): Promise<Record<string, unknown>> {
  return axios.get(URL.getFields);
}

export function addFields(
  params: addFieldsInfo
): Promise<Record<string, unknown>> {
  return axios.post(URL.addFields, params);
}

export function getUserDetailById(params: IdInfo) {
  return axios.post(URL.getUserDetailById, params);
}

export function getMajors(): Promise<Record<string, unknown>> {
  return axios.get(URL.getMajors);
}

export function addMajors(
  params: addMajorsInfo
): Promise<Record<string, unknown>> {
  return axios.post(URL.addMajors, params);
}

export function getShareAllDirections(): Promise<Record<string, unknown>> {
  return axios.post(URL.getShareAllDirections);
}

export function getShareAllAspects(
  params: getShareAllAspectsInfo
): Promise<Record<string, unknown>> {
  return axios.post(URL.getShareAllAspects, params);
}

export function addShareDirection(
  params: addShareDirectionInfo
): Promise<Record<string, unknown>> {
  return axios.post(URL.addShareDirection, params);
}

export function addShareAspect(
  params: addShareAspectInfo
): Promise<Record<string, unknown>> {
  return axios.post(URL.addShareAspect, params);
}


export function getGainAllDirections(): Promise<Record<string, unknown>> {
  return axios.post(URL.getGainAllDirections);
}

export function getGainAllAspects(
  params: getGainAllAspectsInfo
): Promise<Record<string, unknown>> {
  return axios.post(URL.getGainAllAspects, params);
}

export function addGainDirection(
  params: addGainDirectionInfo
): Promise<Record<string, unknown>> {
  return axios.post(URL.addGainDirection, params);
}

export function addGainAspect(
  params: addGainAspectInfo
): Promise<Record<string, unknown>> {
  return axios.post(URL.addGainAspect, params);
}