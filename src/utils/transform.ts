/**
 * transformAfterGet,transformBeforeUpdate两个函数用于个人信息获取与提交时的映射
 * arrayToObjectDeWeight用于在个人信息页面将获得的数组转化为element-ui的级联选择器需要的object并去重
 * arrayToObject用于在个人信息页面将获得的数组转化为element-ui的级联选择器需要的object（无去重功能）
 * deWeightArray用于去重数组
 */

import { Form } from "element-ui";

/**
 * 两个函数用于个人信息获取与提交时的映射
 */
export function transformAfterGet(data: any) {
  if (data == undefined) {
    data = {};
    return data;
  }
  if (data.isGraduated) {
    data.isGraduated = "是";
  } else {
    data.isGraduated = "否";
  }

  if (data.location !== undefined) {
    if (data.location != "") {
      data.cityValue = data.location.split("-");
    }
  }

  if (data.birthday == "1900-01-01" || data.birthday == "0001-01-01") {
    data.birthday = "";
  }

  data.sharesValue = [];
  if (data.shares !== undefined) {
    if (data.shares != "") {
      data.sharesValue = data.shares.split(";");
    }
  }

  data.gainsValue = [];
  if (data.gains !== undefined) {
    if (data.gains != "") {
      data.gainsValue = data.gains.split(";");
    }
  }

  data.majorsValue = [];
  data.booksValue = [];
  data.teamsValue = [];
  data.fieldsValue = [];
  if (data.fields !== undefined) {
    if (data.fields != "") {
      data.fieldsValue = data.fields.split(";");
    }
  }
  if (data.majors !== undefined) {
    if (data.majors != "") {
      data.majorsValue = data.majors.split(";");
    }
  }

  if (data.books !== undefined) {
    if (data.books != "") {
      data.booksValue = data.books.split(";");
    }
  }

  if (data.teams !== undefined) {
    if (data.teams != "") {
      data.teamsValue = data.teams.split(";");
    }
  }

  data.managementExperienceValue = [];
  if (data.managementExperience !== undefined) {
    data.managementExperienceValue = data.managementExperience.split(";");
  }

  data.characterValue = [];
  if (data.character !== undefined) {
    data.characterValue = data.character.split(";");
  }

  data.projectValue = [];
  data.resumeValue = [];
  if (data.projects !== undefined) {
    if (data.projects != "") {
      data.projectValue = data.projects.split(";");
      const projectsTmp: string[] = data.projects.split(";");
      let idx = 0;
      for (idx; idx < projectsTmp.length; idx++) {
        projectsTmp[idx] =
          projectsTmp[idx].slice(0, 4) + "年" + projectsTmp[idx].slice(4);
        data.resumeValue = [...data.resumeValue, projectsTmp[idx].split("-")];
      }
    }
  }

  if (data.characterResult == -1) {
    data.characterResult = "暂无";
  } else {
    const characterResultItemsLocal: string[] = [
      "暂无",
      "INTJ-A INTJ-T",
      "INTP-A INTP-T",
      "ENTJ-A ENTJ-T",
      "ENTP-A ENTP-T",
      "INFJ-A INFJ-T",
      "INFP-A INFP-T",
      "ENFJ-A ENFJ-T",
      "ENFP-A ENFP-T",
      "ISTJ-A ISTJ-T",
      "ISFJ-A ISFJ-T",
      "ESTJ-A ESTJ-T",
      "ESFJ-A ESFJ-T",
      "ISTP-A ISTP-T",
      "ISFP-A ISFP-T",
      "ESTP-A ESTP-T",
      "ESFP-A ESFP-T",
    ];
    data.characterResult = characterResultItemsLocal[data.characterResult];
  }

  // if (data.character == -1) {
  //   data.character = "暂无";
  // } else {
  //   const characterItems: string[] = [
  //     "暂无",
  //     "稳重踏实",
  //     "外向开朗",
  //     "善解人意",
  //     "和蔼可亲",
  //     "难以描述",
  //   ];
  //   data.character = characterItems[data.character];
  // }

  switch (data.identity) {
    case 0:
      data.identity = "预备队员";
      return data;
    case 1:
      data.identity = "在站正式队员";
      return data;
    case 2:
      data.identity = "出站正式队员";
      return data;
    case 3:
      data.identity = "名誉队员";
      return data;
    case 4:
      data.identity = "导师";
      return data;
    case 5:
      data.identity = "顾问";
      return data;
    case 6:
      data.identity = "临时";
      return data;
    case 7:
      data.identity = "其他";
      return data;
  }
}

export function transformBeforeUpdate(formData: any) {
  console.log(formData);
  if (formData.isGraduated && formData.isGraduated == "是") {
    formData.isGraduated = true;
  } else if (formData.isGraduated && formData.isGraduated == "否") {
    formData.isGraduated = false;
    formData.substation = "";
  }

  if (formData.cityValue !== undefined) {
    if (
      formData.cityValue[1] != "undefined" &&
      formData.cityValue[2] != "undefined"
    ) {
      formData.location =
        formData.cityValue[0] +
        "-" +
        formData.cityValue[1] +
        "-" +
        formData.cityValue[2] +
        "-" +
        formData.cityValue[3];
    } else {
      formData.location = "";
    }
  }

  formData.majors = "";
  formData.majors = formData.majorsValue.join(";");

  formData.fields = "";
  formData.fields = formData.fieldsValue.join(";");

  formData.books = "";
  formData.books = formData.booksValue.join(";");

  formData.teams = "";
  formData.teams = formData.teamsValue.join(";");

  formData.managementExperience = "";
  formData.managementExperience = formData.managementExperienceValue.join(";");

  formData.character = "";
  formData.character = formData.characterValue.join(";");
  if (formData.character.substr(0,1) == ';') {
    formData.character = formData.character.substr(1);
  }

  formData.projects = "";
  if (formData.resumeValue !== undefined) {
    if (formData.resumeValue[1] !== undefined) {
      formData.projects =
        formData.resumeValue[0][0].slice(0, 4) +
        "-" +
        formData.resumeValue[0][1] +
        "-" +
        formData.resumeValue[0][2];
      if (formData.resumeValue.length > 1) {
        let idx = 1;
        for (idx; idx < formData.resumeValue.length; idx++) {
          formData.projects =
            formData.projects +
            ";" +
            formData.resumeValue[idx][0].slice(0, 4) +
            "-" +
            formData.resumeValue[idx][1] +
            "-" +
            formData.resumeValue[idx][2];
        }
      }
    }
  }

  formData.graduateYear = parseInt(formData.graduateYear);
  formData.graduateMonth = parseInt(formData.graduateMonth);

  const characterResultItemsLocal: string[] = [
    "暂无",
    "INTJ-A INTJ-T",
    "INTP-A INTP-T",
    "ENTJ-A ENTJ-T",
    "ENTP-A ENTP-T",
    "INFJ-A INFJ-T",
    "INFP-A INFP-T",
    "ENFJ-A ENFJ-T",
    "ENFP-A ENFP-T",
    "ISTJ-A ISTJ-T",
    "ISFJ-A ISFJ-T",
    "ESTJ-A ESTJ-T",
    "ESFJ-A ESFJ-T",
    "ISTP-A ISTP-T",
    "ISFP-A ISFP-T",
    "ESTP-A ESTP-T",
    "ESFP-A ESFP-T",
  ];
  formData.characterResult = characterResultItemsLocal.indexOf(
    formData.characterResult
  );

  // const characterItems: string[] = [
  //   "暂无",
  //   "稳重踏实",
  //   "外向开朗",
  //   "善解人意",
  //   "和蔼可亲",
  //   "难以描述",
  // ];
  // formData.character = characterItems.indexOf(formData.character);

  let i = 1;
  formData.shares = "";
  if (formData.shareValue === undefined) {
    formData.shareValue = [];
  } else if (formData.shareValue.length != 0) {
    formData.shares =
      formData.shareValue[0][0] + "-" + formData.shareValue[0][1];
    if (formData.shareValue.length > 1) {
      for (i; i < formData.shareValue.length; i++) {
        formData.shares =
          formData.shares +
          ";" +
          formData.shareValue[i][0] +
          "-" +
          formData.shareValue[i][1];
      }
    }
  }

  let j = 1;
  formData.gains = "";
  if (formData.gainValue === undefined) {
    formData.gainValue = [];
  } else if (formData.gainValue.length != 0) {
    formData.gains = formData.gainValue[0][0] + "-" + formData.gainValue[0][1];
    if (formData.gainValue.length > 1) {
      for (j; j < formData.gainValue.length; j++) {
        formData.gains =
          formData.gains +
          ";" +
          formData.gainValue[j][0] +
          "-" +
          formData.gainValue[j][1];
      }
    }
  }

  switch (formData.identity) {
    case "预备队员":
      formData.identity = 0;
      return formData;
    case "在站正式队员":
      formData.identity = 1;
      return formData;
    case "出站正式队员":
      formData.identity = 2;
      return formData;
    case "名誉队员":
      formData.identity = 3;
      return formData;
    case "导师":
      formData.identity = 4;
      return formData;
    case "顾问":
      formData.identity = 5;
      return formData;
    case "临时":
      formData.identity = 6;
      return formData;
    case "其他":
      formData.identity = 7;
      return formData;
  }
}

/**
 * 用于在个人信息页面将获得的数组转化为element-ui的级联选择器需要的object并去重
 */

export function arrayToObjectDeWeight(arr: any, node: any) {
  const tempObj = {};
  for (const key in arr) {
    tempObj[key] = arr[key];
  }
  const nodes = Object.keys(tempObj).map((val) => ({
    label: tempObj[val],
    value: tempObj[val],
    leaf: true,
  }));
  let i = 0;
  let j = 0;
  if (node.children) {
    for (i; i < node.children.length; i++) {
      for (j; j < nodes.length; j++) {
        if (nodes[j].value != "添加方向") {
          if (node.children[i].value == nodes[j].value) {
            nodes.splice(j, 1);
            j--;
            i++;
          }
        }
      }
    }
  }
  return nodes;
}

/**
 * 用于在个人信息页面将获得的数组转化为element-ui的级联选择器需要的object（无去重功能）
 */

export function arrayToObject(arr: any, isLeaf: boolean) {
  const tempObj = {};
  for (const key in arr) {
    tempObj[key] = arr[key];
  }
  if (isLeaf) {
    const nodes = Object.keys(tempObj).map((val) => ({
      label: tempObj[val],
      value: tempObj[val],
      leaf: true,
    }));
    return nodes;
  } else {
    const nodes = Object.keys(tempObj).map((val) => ({
      label: tempObj[val],
      value: tempObj[val],
    }));
    return nodes;
  }
}

/**
 * 用于去重数组
 */

export function deWeightArray(arr: any) {
  const s = new Set(arr);
  const result = Array.from(s);
  return result;
}
