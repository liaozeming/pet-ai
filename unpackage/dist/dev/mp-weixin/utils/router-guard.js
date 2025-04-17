"use strict";
const common_vendor = require("../common/vendor.js");
const stores_user = require("../stores/user.js");
function setupRouterGuard() {
  common_vendor.index.addInterceptor("navigateTo", {
    invoke(e) {
      return checkLogin(e.url);
    }
  });
  common_vendor.index.addInterceptor("redirectTo", {
    invoke(e) {
      return checkLogin(e.url);
    }
  });
  common_vendor.index.addInterceptor("reLaunch", {
    invoke(e) {
      return checkLogin(e.url);
    }
  });
  common_vendor.index.addInterceptor("switchTab", {
    invoke(e) {
      return checkLogin(e.url);
    }
  });
}
function checkLogin(url) {
  const userStore = stores_user.useUserStore();
  if (url.includes("/pages/login/")) {
    return true;
  }
  if (!userStore.isLoggedIn) {
    common_vendor.index.reLaunch({
      url: "/pages/login/index"
    });
    return false;
  }
  return true;
}
exports.setupRouterGuard = setupRouterGuard;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/router-guard.js.map
