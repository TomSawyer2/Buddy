export interface PageInfo {
  pageNo: number;
}

export interface SendRequestInfo {
  phoneNumber: string;
  teacherPhoneNumber: string;
  applyReason: string;
}

export interface PhoneInfo {
  phoneNumber: string;
}

export interface SearchInfo {
  userName: string;
  fields: string[];
}
