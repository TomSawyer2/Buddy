/**
 * transformAfterGet,transformBeforeUpdate两个函数用于个人信息获取与提交时的映射
 * arrayToObjectDeWeight用于在个人信息页面将获得的数组转化为element-ui的级联选择器需要的object并去重
 * arrayToObject用于在个人信息页面将获得的数组转化为element-ui的级联选择器需要的object（无去重功能）
 * deWeightArray用于去重数组
 */

/**
 * 两个函数用于个人信息获取与提交时的映射
 */
export function transformAfterGet(data: any) {
  if (data.isGraduated) {
    data.isGraduated = "是";
  } else {
    data.isGraduated = "否";
  }

  data.cityValue = data.location.split('-');
  data.resumeValue = data.Group.split('-');


  if (data.birthday == "1900-01-01"|| data.birthday == "0001-01-01") {
    data.birthday = "";
  }

  if (data.majors.length == 1 && data.majors[0] == '') {
    data.majors.splice(0, data.majors.length)
  }

  if (data.fields.length == 1 && data.fields[0] == '') {
    data.fields.splice(0, data.fields.length)
  }

  if (data.character == -1) {
    data.character = 2;
  }

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
  if (formData.isGraduated && formData.isGraduated== "是") {
    formData.isGraduated = true;
  } else if (formData.isGraduated && formData.isGraduated == "否"){
    formData.isGraduated = false;
    formData.substation = "";
  }

  formData.location = formData.cityValue[0] + '-' + formData.cityValue[1] + '-' + formData.cityValue[2] + '-' + formData.cityValue[3];

  formData.Group = formData.resumeValue[0] + '-' + formData.resumeValue[1];

  let i = 0;
  formData.shares = [];

  if (formData.shareValue.length != 0) {
    for (i; i < formData.shareValue.length; i ++ ) {
      formData.shares[i] = formData.shareValue[i][0] + '-' + formData.shareValue[i][1];
    }
  } 

  let j = 0;
  formData.gains = [];
  if (formData.gainValue.length != 0) {
    for (j; j < formData.gainValue.length; j ++ ) {
      formData.gains[j] = formData.gainValue[j][0] + '-' + formData.gainValue[j][1];
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

export function arrayToObjectDeWeight (arr : any, node : any) {
  const tempObj = {};
  for (const key in arr) {
    tempObj[key] = arr[key];
  };
  const nodes = Object.keys(tempObj).map(val => ({
    label: tempObj[val],
    value: tempObj[val],
    leaf: true
  }));
  let i = 0;
  let j = 0;
  if (node.children) {
    for(i; i < node.children.length; i ++) {
      for(j; j < nodes.length; j ++) {
        if (nodes[j].value != "添加方向") {
          if (node.children[i].value == nodes[j].value) {
            nodes.splice(j, 1);
            j --;
            i ++;
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

 export function arrayToObject (arr : any, isLeaf : boolean) {
  const tempObj = {};
  for (const key in arr) {
    tempObj[key] = arr[key];
  };
  if (isLeaf) {
    const nodes = Object.keys(tempObj).map(val => ({
      label: tempObj[val],
      value: tempObj[val],
      leaf: true
    }));
    return nodes;
  } else {
    const nodes = Object.keys(tempObj).map(val => ({
      label: tempObj[val],
      value: tempObj[val]
    }));
    return nodes;
  }
}

/**
 * 用于去重数组
 */

export function deWeightArray(arr : any) {
  const s = new Set(arr);
  const result = Array.from(s);
  return result;
}
