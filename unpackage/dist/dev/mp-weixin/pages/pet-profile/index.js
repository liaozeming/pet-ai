"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_user = require("../../stores/user.js");
const api_pets = require("../../api/pets.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const userStore = stores_user.useUserStore();
    const userInfo = common_vendor.ref(null);
    const petInfo = common_vendor.ref({
      name: "",
      type: "",
      // 设置默认值
      breed: "",
      gender: "",
      // 设置默认值
      birthDate: "",
      weight: ""
    });
    const getPetByUserId = () => {
      api_pets.petsApi.getPetByUserId({
        user_id: userInfo.value.username
      }).then((res) => {
        common_vendor.index.__f__("log", "at pages/pet-profile/index.vue:120", "res:", res);
        const petData = res.data[0];
        common_vendor.index.__f__("log", "at pages/pet-profile/index.vue:123", "宠物信息:", petData);
        common_vendor.index.__f__("log", "at pages/pet-profile/index.vue:124", "petData === 'undefined'", typeof petData === "undefined");
        if (typeof petData !== "undefined" && petData !== null) {
          common_vendor.index.__f__("log", "at pages/pet-profile/index.vue:126", "img" + api_pets.AVATAR_BASE_URL + petData.avatar_url);
          petInfo.value = {
            id: petData.pet_id,
            name: petData.name,
            type: petData.type,
            breed: petData.breed,
            gender: petData.gender,
            birthDate: petData.birth_date,
            weight: petData.weight + " kg",
            img: api_pets.AVATAR_BASE_URL + petData.avatar_url
          };
        }
      }).catch((err) => {
        common_vendor.index.__f__("error", "at pages/pet-profile/index.vue:140", "请求错误:", err);
        common_vendor.index.showToast({
          title: "查询失败",
          icon: "none"
        });
      });
    };
    const navigateTo = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    const previewImage = () => {
      common_vendor.index.previewImage({
        urls: [petInfo.value.img],
        current: petInfo.value.img
      });
    };
    common_vendor.onMounted(() => {
      userInfo.value = userStore.userInfo;
      common_vendor.index.__f__("log", "at pages/pet-profile/index.vue:166", "用户信息:", userInfo.value.username);
      getPetByUserId();
    });
    return (_ctx, _cache) => {
      return {
        a: "/pages/pet-profile/edit?pet_id=" + petInfo.value.id,
        b: petInfo.value.img,
        c: common_vendor.o(previewImage),
        d: common_vendor.t(petInfo.value.name),
        e: common_vendor.t(petInfo.value.breed),
        f: common_vendor.t(petInfo.value.name),
        g: common_vendor.t(petInfo.value.type),
        h: common_vendor.t(petInfo.value.breed),
        i: common_vendor.t(petInfo.value.gender),
        j: common_vendor.t(petInfo.value.birthDate),
        k: common_vendor.t(petInfo.value.weight),
        l: common_vendor.o(($event) => navigateTo("/pages/daily-record/index")),
        m: common_vendor.o(($event) => navigateTo("/pages/emotion/index")),
        n: common_vendor.o(($event) => navigateTo("/pages/weekly-report/index")),
        o: common_vendor.o(($event) => navigateTo("/pages/my/index"))
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/pet-profile/index.js.map
