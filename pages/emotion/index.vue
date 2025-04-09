<template>
  <view class="container">
    <!-- 渐变标题栏 -->
    <view class="header">
      <text class="header-title">宠物AI助手</text>
    </view>
    
    <!-- 情绪分析区域 -->
    <view class="emotion-header">
      <text class="emotion-title">情绪分析</text>
    </view>
    
    <!-- 输入方式选择 -->
    <view class="input-tabs">
      <view 
        v-for="(tab, index) in inputTabs" 
        :key="index" 
        class="tab-item" 
        :class="{ active: currentTab === tab.value }"
        @tap="switchTab(tab.value)"
      >
        <text class="tab-icon">{{ tab.icon }}</text>
        <text class="tab-text">{{ tab.label }}</text>
      </view>
    </view>
    
    <!-- 输入区域 -->
    <view class="input-area">
      <textarea 
        v-if="currentTab === 'text'" 
        class="text-input" 
        placeholder="描述宠物的行为、状态或表现..." 
        v-model="inputContent"
      />
      <view v-else-if="currentTab === 'image'" class="image-input" @tap="chooseImage">
        <text class="upload-icon">📷</text>
        <text class="upload-text">上传图片</text>
      </view>
      <view v-else class="audio-input" @tap="recordAudio">
        <text class="record-icon">🎤</text>
        <text class="record-text">{{ isRecording ? '录音中...' : '点击录音' }}</text>
      </view>
    </view>
    
    <!-- 分析按钮 -->
    <view class="analyze-btn" @tap="startAnalysis">
      <text class="analyze-text">开始分析</text>
    </view>
    
    <!-- 历史分析记录 -->
    <view class="history-section">
      <text class="history-title">历史分析记录</text>
      
      <view class="history-list">
        <view v-for="(record, index) in historyRecords" :key="index" class="history-item">
          <view class="emotion-icon" :class="record.emotion.toLowerCase()">
            {{ getEmotionIcon(record.emotion) }}
          </view>
          <view class="history-content">
            <view class="history-header">
              <text class="emotion-name">{{ record.emotion }}</text>
              <text class="history-time">{{ record.time }}</text>
            </view>
            
            <view class="intensity-bar">
              <text class="intensity-label">情绪强度</text>
              <view class="progress-bar">
                <view 
                  class="progress-fill" 
                  :style="{ width: record.intensity + '%' }"
                ></view>
              </view>
            </view>
            
            <view class="analysis-result">
              <text class="result-label">分析结果：</text>
              <text class="result-text">{{ record.result }}</text>
            </view>
            
            <view class="suggestion">
              <text class="suggestion-label">建议：</text>
              <text class="suggestion-text">{{ record.suggestion }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 底部导航栏 -->
    <view class="tab-bar">
      <view class="tab-item" @tap="navigateTo('/pages/index/index')">
        <view class="tab-icon">🐾</view>
        <text class="tab-text">档案</text>
      </view>
      <view class="tab-item" @tap="navigateTo('/pages/daily-record/index')">
        <view class="tab-icon">📅</view>
        <text class="tab-text">记录</text>
      </view>
      <view class="tab-item active">
        <view class="tab-icon">❤️</view>
        <text class="tab-text">情绪</text>
      </view>
      <view class="tab-item" @tap="navigateTo('/pages/weekly-report/index')">
        <view class="tab-icon">📊</view>
        <text class="tab-text">周报</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

// Import uni-app API
// import * as uni from '@dcloudio/uni-app';

// 当前选中的输入方式
const currentTab = ref('text');

// 输入内容
const inputContent = ref('');

// 录音状态
const isRecording = ref(false);

// 输入方式选项
const inputTabs = [
  { label: '文字', value: 'text', icon: '💬' },
  { label: '图片', value: 'image', icon: '🖼️' },
  { label: '音频', value: 'audio', icon: '🎵' }
];

// 历史记录数据
const historyRecords = ref([
  {
    emotion: 'Happy',
    time: '2025-04-08 14:30',
    intensity: 85,
    result: '豆豆今天情绪愉悦，活力充沛，对周围环境表现出浓厚兴趣。',
    suggestion: '可以增加互动游戏时间，满足其好奇心和活动需求。'
  },
  {
    emotion: 'Anxious',
    time: '2025-04-07 10:15',
    intensity: 60,
    result: '豆豆表现出轻微焦虑，可能是由于环境变化或陌生人到访引起。',
    suggestion: '提供安静的休息空间，减少环境刺激，适当增加安抚。'
  }
]);

// 切换输入方式
const switchTab = (tab) => {
  currentTab.value = tab;
  inputContent.value = '';
};

// 选择图片
const chooseImage = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      console.log(res.tempFilePaths[0]);
      // 这里可以处理选择的图片
    }
  });
};

// 录制音频
const recordAudio = () => {
  if (isRecording.value) {
    isRecording.value = false;
    uni.stopRecord();
  } else {
    isRecording.value = true;
    uni.startRecord({
      success: (res) => {
        console.log(res.tempFilePath);
        isRecording.value = false;
        // 这里可以处理录制的音频
      }
    });
  }
};

// 开始分析
const startAnalysis = () => {
  if (!inputContent.value && currentTab.value === 'text') {
    uni.showToast({
      title: '请输入描述内容',
      icon: 'none'
    });
    return;
  }
  
  // 显示加载中
  uni.showLoading({
    title: '分析中...'
  });
  
  // 模拟分析过程
  setTimeout(() => {
    uni.hideLoading();
    
    // 添加一条新的分析记录
    const newRecord = {
      emotion: 'Happy',
      time: '2025-04-09 15:45',
      intensity: 90,
      result: '根据描述，豆豆情绪非常愉快，精力充沛，表现出对周围环境的好奇和探索欲望。',
      suggestion: '继续保持良好的互动和运动量，可以尝试新的玩具或游戏来丰富其生活体验。'
    };
    
    historyRecords.value.unshift(newRecord);
    
    // 清空输入
    inputContent.value = '';
    
    // 显示分析完成提示
    uni.showToast({
      title: '分析完成',
      icon: 'success'
    });
  }, 2000);
};

// 获取情绪图标
const getEmotionIcon = (emotion) => {
  const icons = {
    'Happy': '😊',
    'Anxious': '⏱️',
    'Sad': '😢',
    'Excited': '🎉',
    'Tired': '😴',
    'Angry': '😠'
  };
  
  return icons[emotion] || '😐';
};

// 页面导航
const navigateTo = (url) => {
	uni.navigateTo({
		url: url
	})
}

// 生命周期钩子
onLoad(() => {
  console.log('情绪分析页面加载完成');
});
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f8f8;
  position: relative;
  padding-bottom: 120rpx;
}

/* 渐变标题栏 */
.header {
  height: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #ffcdd2, #b2ebf2);
  padding: 20rpx 0;
}

.header-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

/* 情绪分析标题 */
.emotion-header {
  padding: 30rpx;
}

.emotion-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #333;
}

/* 输入方式选择 */
.input-tabs {
  display: flex;
  background-color: #fff;
  border-radius: 10rpx;
  margin: 0 30rpx 20rpx;
  overflow: hidden;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20rpx 0;
  border-bottom: 2rpx solid transparent;
}

.tab-icon {
  margin-right: 8rpx;
  font-size: 28rpx;
}

.tab-text {
  font-size: 28rpx;
  color: #666;
}

.tab-item.active {
  background-color: #f5f5f5;
  border-bottom: 2rpx solid #e91e63;
}

.tab-item.active .tab-text {
  color: #e91e63;
}

/* 输入区域 */
.input-area {
  background-color: #fff;
  border-radius: 10rpx;
  margin: 0 30rpx 20rpx;
  padding: 20rpx;
  min-height: 200rpx;
}

.text-input {
  width: 100%;
  height: 200rpx;
  font-size: 28rpx;
}

.image-input, .audio-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200rpx;
  border: 2rpx dashed #ddd;
  border-radius: 10rpx;
}

.upload-icon, .record-icon {
  font-size: 60rpx;
  margin-bottom: 20rpx;
  color: #999;
}

.upload-text, .record-text {
  font-size: 28rpx;
  color: #999;
}

/* 分析按钮 */
.analyze-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f48fb1;
  color: white;
  padding: 20rpx 0;
  border-radius: 10rpx;
  margin: 0 30rpx 30rpx;
}

.analyze-text {
  font-size: 30rpx;
}

/* 历史分析记录 */
.history-section {
  padding: 0 30rpx;
}

.history-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  padding-bottom: 10rpx;
  border-bottom: 1rpx solid #eee;
}

.history-list {
  margin-bottom: 30rpx;
}

.history-item {
  display: flex;
  background-color: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.emotion-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  margin-right: 20rpx;
}

.emotion-icon.happy {
  background-color: #c8e6c9;
}

.emotion-icon.anxious {
  background-color: #ffe0b2;
}

.emotion-icon.sad {
  background-color: #bbdefb;
}

.history-content {
  flex: 1;
}

.history-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10rpx;
}

.emotion-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.history-time {
  font-size: 24rpx;
  color: #999;
}

.intensity-bar {
  display: flex;
  align-items: center;
  margin-bottom: 15rpx;
}

.intensity-label {
  font-size: 24rpx;
  color: #666;
  margin-right: 10rpx;
  width: 120rpx;
}

.progress-bar {
  flex: 1;
  height: 16rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #e91e63;
  border-radius: 8rpx;
}

.analysis-result, .suggestion {
  margin-bottom: 10rpx;
}

.result-label, .suggestion-label {
  font-size: 26rpx;
  color: #666;
  font-weight: bold;
}

.result-text, .suggestion-text {
  font-size: 26rpx;
  color: #333;
  line-height: 1.5;
}

/* 底部导航栏 */
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  display: flex;
  background-color: #fff;
  border-top: 1rpx solid #eee;
}

.tab-bar .tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: none;
}

.tab-bar .tab-icon {
  font-size: 40rpx;
  margin-bottom: 4rpx;
  margin-right: 0;
}

.tab-bar .tab-text {
  font-size: 24rpx;
  color: #999;
}

.tab-bar .tab-item.active .tab-icon,
.tab-bar .tab-item.active .tab-text {
  color: #e91e63;
}
.tab-bar .tab-item.active {
  background-color: #fff5f8;
  box-shadow: 0 -4rpx 10rpx rgba(0, 0, 0, 0.05);
  position: relative;
}
</style>