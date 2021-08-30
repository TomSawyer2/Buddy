export function setToken(content: string) {
  if (!localStorage) {
    throw new Error("您的浏览器不支持localStorage,请尝试更新浏览器");
  }
  localStorage.setItem("token", content);
}

export function getToken() {
  if (!localStorage) {
    return "";
  }
  const token = localStorage.getItem("token") || "";
  return token;
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function setPhone(content: string) {
  if (!localStorage) {
    throw new Error("您的浏览器不支持localStorage,请尝试更新浏览器");
  }
  localStorage.setItem("phone", content);
}

export function getPhone() {
  if (!localStorage) {
    return "";
  }
  const phone = localStorage.getItem("phone") || "";
  return phone;
}

export function removePhone() {
  localStorage.removeItem("phone");
}

export function setAvatarSrc(content: string) {
  if (!localStorage) {
    throw new Error("您的浏览器不支持localStorage,请尝试更新浏览器");
  }
  localStorage.setItem("avatarSrc", content);
}

export function getAvatarSrc() {
  if (!localStorage) {
    return "";
  }
  const phone = localStorage.getItem("avatarSrc") || "";
  return phone;
}

export function removeAvatarSrc() {
  localStorage.removeItem("avatarSrc");
}

export function setUserName(content: string) {
  if (!localStorage) {
    throw new Error("您的浏览器不支持localStorage,请尝试更新浏览器");
  }
  localStorage.setItem("userName", content);
}

export function getUserName() {
  if (!localStorage) {
    return "";
  }
  const phone = localStorage.getItem("userName") || "";
  return phone;
}

export function removeUserName() {
  localStorage.removeItem("userName");
}
