"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const currentTab = common_vendor.ref("overview");
    const categoryTabs = [
      { label: "总览", value: "overview" },
      { label: "饮食", value: "diet" },
      { label: "活动", value: "activity" },
      { label: "情绪", value: "emotion" }
    ];
    const switchTab = (tab) => {
      currentTab.value = tab;
    };
    const downloadReport = () => {
      common_vendor.index.showToast({
        title: "报告下载中...",
        icon: "loading",
        duration: 2e3
      });
      setTimeout(() => {
        common_vendor.index.showToast({
          title: "下载成功",
          icon: "success",
          duration: 2e3
        });
      }, 2e3);
    };
    const shareReport = () => {
      common_vendor.index.showShareMenu({
        withShareTicket: true,
        menus: ["shareAppMessage", "shareTimeline"]
      });
    };
    const navigateTo = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    common_vendor.onLoad(() => {
      common_vendor.index.__f__("log", "at pages/weekly-report/index.vue:196", "周报页面加载完成");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(downloadReport),
        b: common_vendor.o(shareReport),
        c: common_vendor.f(categoryTabs, (tab, index, i0) => {
          return {
            a: common_vendor.t(tab.label),
            b: index,
            c: currentTab.value === tab.value ? 1 : "",
            d: common_vendor.o(($event) => switchTab(tab.value), index)
          };
        }),
        d: common_vendor.o(($event) => navigateTo("/pages/pet-profile/index")),
        e: common_vendor.o(($event) => navigateTo("/pages/daily-record/index")),
        f: common_vendor.o(($event) => navigateTo("/pages/emotion/index")),
        g: common_vendor.o(($event) => navigateTo("/pages/my/index"))
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/weekly-report/index.js.map
