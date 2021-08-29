import { URL } from "@/config";
import { PageInfo, SendRequestInfo } from "@/models";
import axios from "../request";

export function getAllUsersByPage(params:PageInfo) {
  return axios.post(URL.getAllUsersByPage, params);
}

export function getAllOldUsersByPage(params:PageInfo) {
  return axios.post(URL.getAllOldUsersByPage, params);
}

export function postSendBuddyRequest(params:SendRequestInfo) {
  return axios.post(URL.postSendBuddyRequest, params);
}

export function getAllFields() {
  return axios.get(URL.getAllFields);
}