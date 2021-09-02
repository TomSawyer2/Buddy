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

export interface getPersonalInformationInfo {
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
  phoneNumber: string;
  studentPhoneNumber: string;
}

export interface refuseBuddyInfo {
  phoneNumber: string;
  studentPhoneNumber: string;
}

export interface postSendBuddyRequestInfo {
  phoneNumber: string;
  teacherPhoneNumber: string;
  applyReason: string;
}

export interface addFieldsInfo {
  field: string;
}
