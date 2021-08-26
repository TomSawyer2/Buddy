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
  hobby: string;
  teamExperience: string;
  number: string;
  highSchool: string;
  field: string;
  resume: string;
  isGraduated: boolean;
  substation: string;
  notes: string | undefined;
}
