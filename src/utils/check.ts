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
