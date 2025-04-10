"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const petInfo = common_vendor.ref({
      id: 1,
      name: "豆豆1",
      type: "猫",
      breed: "英短",
      gender: "男",
      birthDate: "2022-05-15",
      weight: "4.5 kg",
      img: "https://n.sinaimg.cn/sinakd20116/160/w1440h1920/20231215/cf0e-e50a1b5a6503ef01228d42b14f51dcb3.jpg"
    });
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
    return (_ctx, _cache) => {
      return {
        a: "/pages/pet-profile/edit?id=" + petInfo.value.id,
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
