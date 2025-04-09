"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref({
      name: "豆豆",
      type: "猫",
      breed: "英短",
      gender: "男",
      birthDate: "2022-05-15",
      weight: "4.5 kg"
    });
    const navigateTo = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => navigateTo("/pages/pet-profile/edit")),
        b: common_vendor.o(($event) => navigateTo("/pages/daily-record/index")),
        c: common_vendor.o(($event) => navigateTo("/pages/emotion/index")),
        d: common_vendor.o(($event) => navigateTo("/pages/weekly-report/index"))
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
