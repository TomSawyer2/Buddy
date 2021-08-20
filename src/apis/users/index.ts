import axios from "../request";
import { LoginInfo } from "@/models";
import { URL } from "@/config";

export async function login(
  params: LoginInfo
): Promise<Record<string, unknown>> {
  return await axios.post(URL.postLogin, params);
}
