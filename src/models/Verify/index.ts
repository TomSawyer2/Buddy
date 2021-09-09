export interface LoginInfo {
  phoneNumber: string;
  password: string;
  captcha: string;
} // 随便写的

export interface RegisterInfo {
  userName: string;
  phoneNumber: string;
  validationCode: string;
  passWord: string;
}

export interface getCaptchaInfo {
  phoneNumber: string;
}

export interface updatePersonalInformationInfo {
  avatar: string;
  email: string;
  phoneNumber: string;
  sex: string;
  number: string;
  highSchool: string;
  field: string;
  resume: string;
  isGraduated: boolean;
  substation: string;
  weChatPic: string;
}

export interface getReceivedRequestsInfo {
  phoneNumber: string;
  pageNo: number;
}

export interface getSentRequestsInfo {
  phoneNumber: string;
  pageNo: number;
}

export interface acceptBuddyInfo {
  id: string;
}

export interface refuseBuddyInfo {
  id: string;
}

export interface postSendBuddyRequestInfo {
  id: string;
  applyReason: string;
}

export interface addFieldsInfo {
  field: string;
}

export interface addMajorsInfo {
  major: string;
}

export interface getShareAllAspectsInfo {
  shareDirection: string;
}

export interface addShareDirectionInfo {
  shareDirection: string;
}

export interface addShareAspectInfo {
  shareDirection: string;
  shareAspect: string;
}

export interface getGainAllAspectsInfo {
  gainDirection: string;
}

export interface addGainDirectionInfo {
  gainDirection: string;
}

export interface addGainAspectInfo {
  gainDirection: string;
  gainAspect: string;
}

export interface queryNumberInfo {
  userName: string;
}

export interface forgetPwdGetCaptchaInfo {
  phoneNumber: string;
}

export interface forgetPwdSubmitInfo {
  phoneNumber: string;
  validationCode: string;
  newPassword: string;
}

export interface changePwdSubmitInfo {
  validationCode: string;
  newPassword: string;
}

export interface addBooksInfo {
  book: string;
}