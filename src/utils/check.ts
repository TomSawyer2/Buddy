/**
 * 各类表单验证
 * @author Chen Yi
 * @file check.ts
 */

/**
 * @description 验证手机号格式
 * @param {string | undefined} value
 * @returns {boolean}
 */
export function checkPhone(value: string | undefined): boolean {
  const regex = /^1[0-9]{10,10}$/;
  if (regex.test(value || "")) {
    return true;
  } else {
    return false;
  }
}

/**
 * @description 判断登录设备
 * @returns {number}
 */
 export function judgeDevice(): number {
  const flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  const isMobile = flag ? 1 : 0;
  if(isMobile == 1) {
    return 1;
  } else {
    return 0;
  }
}