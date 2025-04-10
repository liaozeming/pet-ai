"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_user = require("../../stores/user.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const userInfo = common_vendor.reactive({
      nickname: "宠物爱好者",
      userId: "10086789",
      avatar: "/static/images/avatar.png",
      isVip: true,
      vipLevel: 2,
      vipExpireDate: "2025-12-31",
      petCount: 2,
      favoriteCount: 15,
      points: 368
    });
    const changeAvatar = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          userInfo.avatar = res.tempFilePaths[0];
          common_vendor.index.showToast({
            title: "头像更新成功",
            icon: "success"
          });
        }
      });
    };
    const editProfile = () => {
      common_vendor.index.navigateTo({
        url: "/pages/my/edit-profile"
      });
    };
    const navigateTo = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    const showLogoutConfirm = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            logout();
          }
        }
      });
    };
    const logout = () => {
      stores_user.useUserStore().logout();
    };
    common_vendor.onMounted(() => {
      common_vendor.index.__f__("log", "at pages/my/index.vue:234", "我的页面加载完成");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userInfo.avatar,
        b: common_vendor.o(changeAvatar),
        c: common_vendor.t(userInfo.nickname),
        d: userInfo.isVip
      }, userInfo.isVip ? {} : {}, {
        e: common_vendor.t(userInfo.userId),
        f: common_vendor.o(editProfile),
        g: common_vendor.t(userInfo.petCount),
        h: common_vendor.o(($event) => navigateTo("/pages/my/pets")),
        i: common_vendor.t(userInfo.favoriteCount),
        j: common_vendor.o(($event) => navigateTo("/pages/my/favorites")),
        k: common_vendor.t(userInfo.points),
        l: common_vendor.o(($event) => navigateTo("/pages/my/points")),
        m: userInfo.isVip
      }, userInfo.isVip ? {
        n: common_vendor.t(userInfo.vipLevel),
        o: common_vendor.t(userInfo.vipExpireDate),
        p: common_vendor.o(($event) => navigateTo("/pages/my/vip"))
      } : {}, {
        q: common_vendor.o(($event) => navigateTo("/pages/my/pets")),
        r: common_vendor.o(($event) => navigateTo("/pages/my/health-records")),
        s: common_vendor.o(($event) => navigateTo("/pages/my/reminders")),
        t: common_vendor.o(($event) => navigateTo("/pages/my/account-security")),
        v: common_vendor.o(($event) => navigateTo("/pages/my/notifications")),
        w: common_vendor.o(($event) => navigateTo("/pages/my/privacy")),
        x: common_vendor.o(($event) => navigateTo("/pages/my/feedback")),
        y: common_vendor.o(($event) => navigateTo("/pages/my/help")),
        z: common_vendor.o(($event) => navigateTo("/pages/my/about")),
        A: common_vendor.o(showLogoutConfirm),
        B: common_vendor.o(($event) => navigateTo("/pages/pet-profile/index")),
        C: common_vendor.o(($event) => navigateTo("/pages/daily-record/index")),
        D: common_vendor.o(($event) => navigateTo("/pages/emotion/index")),
        E: common_vendor.o(($event) => navigateTo("/pages/weekly-report/index"))
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/index.js.map
