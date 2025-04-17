"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = `http://localhost:8000/api/pets`;
const AVATAR_BASE_URL = `${BASE_URL}/avatar/`;
const petsApi = {
  //按用户ID获取宠物
  getPetByUserId: (params) => {
    return common_vendor.index.request({
      url: `${BASE_URL}`,
      method: "GET",
      data: params
    });
  },
  // 查询数据
  getPetByPetId: (id) => {
    return common_vendor.index.request({
      url: `${BASE_URL}/${id}`,
      method: "GET"
    });
  },
  // 更新数据
  updatePet: (id, data) => {
    return common_vendor.index.request({
      url: `${BASE_URL}/${id}`,
      method: "PUT",
      data
    });
  },
  // 新增数据
  savePet: (data) => {
    return common_vendor.index.request({
      url: `${BASE_URL}/`,
      method: "POST",
      data
    });
  },
  // 上传宠物头像
  uploadAvatar: (pet_id, filePath) => {
    return new Promise((resolve, reject) => {
      common_vendor.index.uploadFile({
        url: `${BASE_URL}/${pet_id}/avatar`,
        filePath,
        name: "file",
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(JSON.parse(res.data));
          } else {
            reject(new Error("上传失败"));
          }
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  }
};
exports.AVATAR_BASE_URL = AVATAR_BASE_URL;
exports.petsApi = petsApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/pets.js.map
