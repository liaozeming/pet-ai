"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const currentTab = common_vendor.ref("text");
    const inputContent = common_vendor.ref("");
    const isRecording = common_vendor.ref(false);
    const inputTabs = [
      { label: "文字", value: "text", icon: "💬" },
      { label: "图片", value: "image", icon: "🖼️" },
      { label: "音频", value: "audio", icon: "🎵" }
    ];
    const historyRecords = common_vendor.ref([
      {
        emotion: "Happy",
        time: "2025-04-08 14:30",
        intensity: 85,
        result: "豆豆今天情绪愉悦，活力充沛，对周围环境表现出浓厚兴趣。",
        suggestion: "可以增加互动游戏时间，满足其好奇心和活动需求。"
      },
      {
        emotion: "Anxious",
        time: "2025-04-07 10:15",
        intensity: 60,
        result: "豆豆表现出轻微焦虑，可能是由于环境变化或陌生人到访引起。",
        suggestion: "提供安静的休息空间，减少环境刺激，适当增加安抚。"
      }
    ]);
    const switchTab = (tab) => {
      currentTab.value = tab;
      inputContent.value = "";
    };
    const chooseImage = () => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/emotion/index.vue:169", res.tempFilePaths[0]);
        }
      });
    };
    const recordAudio = () => {
      if (isRecording.value) {
        isRecording.value = false;
        common_vendor.index.stopRecord();
      } else {
        isRecording.value = true;
        common_vendor.index.startRecord({
          success: (res) => {
            common_vendor.index.__f__("log", "at pages/emotion/index.vue:184", res.tempFilePath);
            isRecording.value = false;
          }
        });
      }
    };
    const startAnalysis = () => {
      if (!inputContent.value && currentTab.value === "text") {
        common_vendor.index.showToast({
          title: "请输入描述内容",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "分析中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        const newRecord = {
          emotion: "Happy",
          time: "2025-04-09 15:45",
          intensity: 90,
          result: "根据描述，豆豆情绪非常愉快，精力充沛，表现出对周围环境的好奇和探索欲望。",
          suggestion: "继续保持良好的互动和运动量，可以尝试新的玩具或游戏来丰富其生活体验。"
        };
        historyRecords.value.unshift(newRecord);
        inputContent.value = "";
        common_vendor.index.showToast({
          title: "分析完成",
          icon: "success"
        });
      }, 2e3);
    };
    const getEmotionIcon = (emotion) => {
      const icons = {
        "Happy": "😊",
        "Anxious": "⏱️",
        "Sad": "😢",
        "Excited": "🎉",
        "Tired": "😴",
        "Angry": "😠"
      };
      return icons[emotion] || "😐";
    };
    const navigateTo = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    common_vendor.onLoad(() => {
      common_vendor.index.__f__("log", "at pages/emotion/index.vue:256", "情绪分析页面加载完成");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(inputTabs, (tab, index, i0) => {
          return {
            a: common_vendor.t(tab.icon),
            b: common_vendor.t(tab.label),
            c: index,
            d: currentTab.value === tab.value ? 1 : "",
            e: common_vendor.o(($event) => switchTab(tab.value), index)
          };
        }),
        b: currentTab.value === "text"
      }, currentTab.value === "text" ? {
        c: inputContent.value,
        d: common_vendor.o(($event) => inputContent.value = $event.detail.value)
      } : currentTab.value === "image" ? {
        f: common_vendor.o(chooseImage)
      } : {
        g: common_vendor.t(isRecording.value ? "录音中..." : "点击录音"),
        h: common_vendor.o(recordAudio)
      }, {
        e: currentTab.value === "image",
        i: common_vendor.o(startAnalysis),
        j: common_vendor.f(historyRecords.value, (record, index, i0) => {
          return {
            a: common_vendor.t(getEmotionIcon(record.emotion)),
            b: common_vendor.n(record.emotion.toLowerCase()),
            c: common_vendor.t(record.emotion),
            d: common_vendor.t(record.time),
            e: record.intensity + "%",
            f: common_vendor.t(record.result),
            g: common_vendor.t(record.suggestion),
            h: index
          };
        }),
        k: common_vendor.o(($event) => navigateTo("/pages/pet-profile/index")),
        l: common_vendor.o(($event) => navigateTo("/pages/daily-record/index")),
        m: common_vendor.o(($event) => navigateTo("/pages/weekly-report/index")),
        n: common_vendor.o(($event) => navigateTo("/pages/my/index"))
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/emotion/index.js.map
