import { URL } from "@/config";
import { updateUserInfoInfo, deleteUserInfo } from "@/models";
import axios from "../request";

export function getUserList() {
    return axios.get(URL.getUserList)
}

export function updateUserInfo(params: updateUserInfoInfo) {
    return axios.post(URL.updateUserInfo, params);
}

export function deleteUser(params: deleteUserInfo) {
    return axios.delete(URL.deleteUser, {data: params});
}