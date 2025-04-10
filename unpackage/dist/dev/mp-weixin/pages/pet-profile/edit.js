"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "edit",
  setup(__props) {
    const petInfo = common_vendor.ref({
      name: "豆豆",
      type: "猫",
      breed: "英短",
      gender: "男",
      birthDate: "2022-05-15",
      weight: "4.5"
    });
    const petTypes = ["猫", "狗", "兔子", "仓鼠", "其他"];
    const typeIndex = common_vendor.computed(() => petTypes.indexOf(petInfo.value.type));
    const genders = ["男", "女"];
    const genderIndex = common_vendor.computed(() => genders.indexOf(petInfo.value.gender));
    const formatDate = (dateStr) => {
      if (!dateStr)
        return "";
      return dateStr.replace(/-/g, "/");
    };
    const handleTypeChange = (e) => {
      petInfo.value.type = petTypes[e.detail.value];
    };
    const handleGenderChange = (e) => {
      petInfo.value.gender = genders[e.detail.value];
    };
    const handleDateChange = (e) => {
      petInfo.value.birthDate = e.detail.value;
    };
    const chooseImage = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/pet-profile/edit.vue:159", res.tempFilePaths[0]);
        }
      });
    };
    const handleSave = () => {
      common_vendor.index.setStorageSync("petInfo", JSON.stringify(petInfo.value));
      common_vendor.index.showToast({
        title: "保存成功",
        icon: "success",
        duration: 2e3
      });
      setTimeout(() => {
        common_vendor.index.navigateTo({
          url: "/pages/index/index"
        });
      }, 1e3);
    };
    common_vendor.onLoad((option) => {
      common_vendor.index.__f__("log", "at pages/pet-profile/edit.vue:191", option.id);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleSave),
        b: common_vendor.o(chooseImage),
        c: petInfo.value.name,
        d: common_vendor.o(($event) => petInfo.value.name = $event.detail.value),
        e: common_vendor.t(petInfo.value.type),
        f: common_vendor.o(handleTypeChange),
        g: typeIndex.value,
        h: petTypes,
        i: petInfo.value.breed,
        j: common_vendor.o(($event) => petInfo.value.breed = $event.detail.value),
        k: common_vendor.t(petInfo.value.gender),
        l: common_vendor.o(handleGenderChange),
        m: genderIndex.value,
        n: genders,
        o: common_vendor.t(formatDate(petInfo.value.birthDate)),
        p: petInfo.value.birthDate,
        q: common_vendor.o(handleDateChange),
        r: petInfo.value.weight,
        s: common_vendor.o(($event) => petInfo.value.weight = $event.detail.value),
        t: common_vendor.o(($event) => _ctx.navigateTo("/pages/daily-record/index")),
        v: common_vendor.o(($event) => _ctx.navigateTo("/pages/emotion/index")),
        w: common_vendor.o(($event) => _ctx.navigateTo("/pages/weekly-report/index")),
        x: common_vendor.o(($event) => _ctx.navigateTo("/pages/my/index"))
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/pet-profile/edit.js.map
