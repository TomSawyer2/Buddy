/**
 * 两个函数用于个人信息获取与提交时的映射
 */
export function transformAfterGet(data: any) {
  if (data.isGraduated) {
    data.isGraduated = "是";
  } else {
    data.isGraduated = "否";
  }

  data.cityValue = [data.country, data.province, data.city, data.region];
  data.resumeValue = [data.group, data.project];

  

  if (data.birthday == "0001-01-01") {
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

  console.log(formData.cityValue);
  formData.country = formData.cityValue[0];
  formData.province = formData.cityValue[1];
  formData.city = formData.cityValue[2];
  formData.region = formData.cityValue[3];

  formData.group = formData.resumeValue[0];
  formData.project = formData.resumeValue[1];

  let i = 0;
  formData.shares = [];
  console.log("开始转换shareValue，原始： ");
  console.log(formData.shareValue);

  if (formData.shareValue.length != 0) {
    for (i; i < formData.shareValue.length; i ++ ) {
      formData.shares[i] = formData.shareValue[i][0] + '-' + formData.shareValue[i][1];
    }
  } 
  console.log("最终的shares:");
  console.log(formData.shares);

  let j = 0;
  formData.gains = [];
  console.log("开始转换gainValue，原始： ");
  console.log(formData.gainValue);
  if (formData.gainValue.length != 0) {
    for (j; j < formData.gainValue.length; j ++ ) {
      formData.gains[j] = formData.gainValue[j][0] + '-' + formData.gainValue[j][1];
    }
  }

  console.log("最终的gains:");
  console.log(formData.gains);

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
