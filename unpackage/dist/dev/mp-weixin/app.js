"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
require("./stores/user.js");
if (!Math) {
  "./pages/login/index.js";
  "./pages/pet-profile/index.js";
  "./pages/pet-profile/edit.js";
  "./pages/daily-record/index.js";
  "./pages/emotion/index.js";
  "./pages/weekly-report/index.js";
  "./pages/my/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:33", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:36", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:39", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  const pinia = common_vendor.createPinia();
  app.use(pinia);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
