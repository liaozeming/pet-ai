"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const stores_user = require("../../stores/user.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const loginForm = common_vendor.reactive({
      username: "",
      password: ""
    });
    const errors = common_vendor.reactive({
      username: "",
      password: ""
    });
    const showPassword = common_vendor.ref(false);
    const rememberMe = common_vendor.ref(false);
    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };
    const validateUsername = () => {
      if (!loginForm.username) {
        errors.username = "请输入用户名或手机号";
        return false;
      }
      errors.username = "";
      return true;
    };
    const validatePassword = () => {
      if (!loginForm.password) {
        errors.password = "请输入密码";
        return false;
      }
      if (loginForm.password.length < 6) {
        errors.password = "密码长度不能少于6位";
        return false;
      }
      errors.password = "";
      return true;
    };
    const handleLogin = async () => {
      const isUsernameValid = validateUsername();
      const isPasswordValid = validatePassword();
      common_vendor.index.__f__("log", "at pages/login/index.vue:164", isUsernameValid);
      if (!isUsernameValid || !isPasswordValid) {
        return;
      }
      common_vendor.index.showLoading({
        title: "登录中..."
      });
      try {
        const userInfo = {
          username: loginForm.username,
          token: "mock_token_" + Date.now(),
          timestamp: Date.now()
        };
        stores_user.useUserStore().setUserInfo(userInfo);
        common_vendor.index.__f__("log", "at pages/login/index.vue:184", "登录成功，用户信息:", userInfo);
        if (rememberMe.value) {
          common_vendor.index.setStorageSync("loginInfo", {
            username: loginForm.username,
            timestamp: Date.now()
          });
        }
        common_vendor.index.reLaunch({
          url: "/pages/pet-profile/index",
          success: () => {
            common_vendor.index.showToast({
              title: "登录成功",
              icon: "success"
            });
          }
        });
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/login/index.vue:205", "登录失败:", error);
        common_vendor.index.showToast({
          title: "登录失败",
          icon: "error"
        });
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    const forgotPassword = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/resetPsw"
      });
    };
    const socialLogin = (platform) => {
      common_vendor.index.showToast({
        title: `正在使用${platform}登录`,
        icon: "none"
      });
    };
    const goToRegister = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/register"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: common_vendor.o(validateUsername),
        c: loginForm.username,
        d: common_vendor.o(($event) => loginForm.username = $event.detail.value),
        e: errors.username
      }, errors.username ? {
        f: common_vendor.t(errors.username)
      } : {}, {
        g: showPassword.value
      }, showPassword.value ? {
        h: common_vendor.o(validatePassword),
        i: loginForm.password,
        j: common_vendor.o(($event) => loginForm.password = $event.detail.value)
      } : {
        k: common_vendor.o(validatePassword),
        l: loginForm.password,
        m: common_vendor.o(($event) => loginForm.password = $event.detail.value)
      }, {
        n: common_vendor.t(showPassword.value ? "👁️" : "👁️‍🗨️"),
        o: common_vendor.o(togglePasswordVisibility),
        p: errors.password
      }, errors.password ? {
        q: common_vendor.t(errors.password)
      } : {}, {
        r: rememberMe.value,
        s: common_vendor.o(($event) => rememberMe.value = !rememberMe.value),
        t: common_vendor.o(forgotPassword),
        v: common_vendor.o(handleLogin),
        w: common_vendor.o(($event) => socialLogin("wechat")),
        x: common_vendor.o(($event) => socialLogin("qq")),
        y: common_vendor.o(($event) => socialLogin("weibo")),
        z: common_vendor.o(goToRegister)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/index.js.map
