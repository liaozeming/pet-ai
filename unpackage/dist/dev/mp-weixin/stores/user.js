"use strict";
const common_vendor = require("../common/vendor.js");
const useUserStore = common_vendor.defineStore("user", {
  state: () => ({
    userInfo: null
  }),
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
      common_vendor.index.setStorageSync("userInfo", userInfo);
    },
    clearUserInfo() {
      common_vendor.index.__f__("log", "at stores/user.js:16", "清除用户信息");
      this.userInfo = null;
      common_vendor.index.removeStorageSync("userInfo");
    },
    // 退出登录
    logout() {
      this.clearUserInfo();
      common_vendor.index.reLaunch({
        url: "/pages/login/index"
      });
    },
    // 初始化时从本地存储加载用户信息
    initUserInfo() {
      try {
        const userInfo = common_vendor.index.getStorageSync("userInfo");
        if (userInfo) {
          this.userInfo = userInfo;
          common_vendor.index.__f__("log", "at stores/user.js:36", "已加载用户信息:", userInfo);
        } else {
          common_vendor.index.__f__("log", "at stores/user.js:38", "未找到用户信息");
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at stores/user.js:41", "读取用户信息失败:", e);
      }
    }
  },
  getters: {
    isLoggedIn: (state) => {
      const isLogin = !!state.userInfo && !!state.userInfo.token;
      common_vendor.index.__f__("log", "at stores/user.js:49", "登录状态:", isLogin);
      return isLogin;
    }
  }
});
exports.useUserStore = useUserStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/user.js.map
