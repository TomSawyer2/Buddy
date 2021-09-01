export function transformAfterGet(data: any) {
    if (data.isGraduated) {
      data.isGraduated = "是";
    } else {
      data.isGraduated = "否";
    }

    if (data.birthday == "0001-01-01") {
      data.birthday = "";
    }

    if (data.character == -1) {
      data.character = 2;
    }

    switch (data.identity) {
      case 0:
        data.identity = "在站";
        return data;
      case 1:
        data.identity = "出站";
        return data;
      case 2:
        data.identity = "名誉队员";
        return data;
      case 3:
        data.identity = "导师";
        return data;
      case 4:
        data.identity = "顾问";
        return data;
      case 5:
        data.identity = "临时";
        return data;
      case 6:
        data.identity = "其他";
        return data;
    }
}

export function transformBeforeUpdate(formData : any) {
    if (formData.isGraduated == "是") {
      formData.isGraduated = true;
    } else {
      formData.isGraduated = false;
      formData.substation = "";
    }
    switch (formData.identity) {
      case "在站":
        formData.identity = 0;
        return formData;
      case "出站":
        formData.identity = 1;
        return formData;
      case "名誉队员":
        formData.identity = 2;
        return formData;
      case "导师":
        formData.identity = 3;
        return formData;
      case "顾问":
        formData.identity = 4;
        return formData;
      case "临时":
        formData.identity = 5;
        return formData;
      case "其他":
        formData.identity = 6;
        return formData;
    }
}