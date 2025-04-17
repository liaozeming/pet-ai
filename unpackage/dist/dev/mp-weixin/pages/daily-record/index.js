"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const currentDate = common_vendor.ref("2025-04-09");
    const currentCategory = common_vendor.ref("all");
    const categories = [
      { label: "全部", value: "all", icon: "🔍" },
      { label: "饮食", value: "food", icon: "🍽️" },
      { label: "饮水", value: "water", icon: "💧" },
      { label: "活动", value: "activity", icon: "📈" },
      { label: "睡眠", value: "sleep", icon: "🌙" },
      { label: "健康", value: "health", icon: "💊" }
    ];
    const records = common_vendor.ref([
      {
        type: "food",
        description: "猫粮100g，食欲良好",
        time: "08:30",
        date: "2025-04-09"
      },
      {
        type: "water",
        description: "饮水约50ml",
        time: "10:15",
        date: "2025-04-09"
      },
      {
        type: "activity",
        description: "室内玩耍30分钟，精力充沛",
        time: "14:00",
        date: "2025-04-09"
      }
    ]);
    const filteredRecords = common_vendor.computed(() => {
      if (currentCategory.value === "all") {
        return records.value.filter((record) => record.date === currentDate.value);
      } else {
        return records.value.filter(
          (record) => record.type === currentCategory.value && record.date === currentDate.value
        );
      }
    });
    const getCategoryIcon = (type) => {
      const category = categories.find((c) => c.value === type);
      return category ? category.icon : "🔍";
    };
    const setCategory = (category) => {
      currentCategory.value = category;
    };
    const formatDate = (dateStr) => {
      if (!dateStr)
        return "";
      return dateStr.replace(/-/g, "-");
    };
    const handleDateChange = (e) => {
      currentDate.value = e.detail.value;
    };
    const handleAddRecord = () => {
      common_vendor.index.navigateTo({
        url: "/pages/daily-record/add"
      });
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const navigateTo = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    common_vendor.onLoad(() => {
      common_vendor.index.__f__("log", "at pages/daily-record/index.vue:194", "页面加载完成");
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goBack),
        b: common_vendor.t(formatDate(currentDate.value)),
        c: currentDate.value,
        d: common_vendor.o(handleDateChange),
        e: common_vendor.f(categories, (category, index, i0) => {
          return {
            a: common_vendor.t(category.icon),
            b: common_vendor.t(category.label),
            c: index,
            d: currentCategory.value === category.value ? 1 : "",
            e: common_vendor.o(($event) => setCategory(category.value), index)
          };
        }),
        f: common_vendor.o(handleAddRecord),
        g: common_vendor.f(filteredRecords.value, (record, index, i0) => {
          return {
            a: common_vendor.t(getCategoryIcon(record.type)),
            b: common_vendor.t(record.description),
            c: common_vendor.t(record.time),
            d: index,
            e: common_vendor.n(record.type)
          };
        }),
        h: common_vendor.o(($event) => navigateTo("/pages/pet-profile/index")),
        i: common_vendor.o(($event) => navigateTo("/pages/emotion/index")),
        j: common_vendor.o(($event) => navigateTo("/pages/weekly-report/index")),
        k: common_vendor.o(($event) => navigateTo("/pages/my/index"))
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/daily-record/index.js.map
