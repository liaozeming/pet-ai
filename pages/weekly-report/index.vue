<template>
  <view class="container">
    <!-- 渐变标题栏 -->
    <view class="header">
      <text class="header-title">宠物AI助手</text>
    </view>
    
    <!-- 周报标题和操作按钮 -->
    <view class="report-header">
      <text class="report-title">周报</text>
      <view class="action-buttons">
        <view class="action-btn" @tap="downloadReport">
          <text class="action-icon">⬇️</text>
        </view>
        <view class="action-btn" @tap="shareReport">
          <text class="action-icon">↗️</text>
        </view>
      </view>
    </view>
    
    <!-- 周报内容 -->
    <view class="report-content">
      <!-- 日期范围 -->
      <view class="date-range">
        <text class="calendar-icon">📅</text>
        <text class="date-text">04.02 - 04.09</text>
      </view>
      
      <!-- 统计数据 -->
      <view class="stats-row">
        <view class="stat-card green">
          <text class="stat-label">记录天数</text>
          <text class="stat-value">7</text>
        </view>
        <view class="stat-card blue">
          <text class="stat-label">记录完整度</text>
          <text class="stat-value">92%</text>
        </view>
      </view>
      
      <!-- 本周概要 -->
      <view class="summary-section">
        <text class="summary-label">本周概要：</text>
        <text class="summary-text">豆豆本周状态良好，情绪稳定，饮食充足，活动量适中。</text>
      </view>
      
      <!-- 分类标签页 -->
      <view class="category-tabs">
        <view 
          v-for="(tab, index) in categoryTabs" 
          :key="index" 
          class="tab-item" 
          :class="{ active: currentTab === tab.value }"
          @tap="switchTab(tab.value)"
        >
          <text class="tab-text">{{ tab.label }}</text>
        </view>
      </view>
      
      <!-- 记录统计 -->
      <view class="stats-section">
        <view class="section-header">
          <text class="section-icon">📊</text>
          <text class="section-title">记录统计</text>
        </view>
        <view class="stats-chart">
          <!-- 这里可以放置实际的统计图表 -->
          <text class="chart-placeholder">记录统计图表</text>
        </view>
      </view>
      
      <!-- 特别提醒 -->
      <view class="alert-section">
        <view class="section-header">
          <text class="section-icon">⚠️</text>
          <text class="section-title">特别提醒</text>
        </view>
        <view class="alert-list">
          <view class="alert-item">
            <text class="bullet yellow">•</text>
            <text class="alert-text">本周饮水量略低于平均水平，建议增加饮水量</text>
          </view>
          <view class="alert-item">
            <text class="bullet yellow">•</text>
            <text class="alert-text">体重保持稳定，饮食控制良好</text>
          </view>
        </view>
      </view>
      
      <!-- 下周建议 -->
      <view class="suggestion-section">
        <view class="section-header">
          <text class="section-title">下周建议</text>
        </view>
        <view class="suggestion-list">
          <view class="suggestion-item">
            <text class="bullet red">•</text>
            <text class="suggestion-text">增加饮水点，可以考虑添加自动或提醒饮水器</text>
          </view>
          <view class="suggestion-item">
            <text class="bullet red">•</text>
            <text class="suggestion-text">趁特好日期安排户外活动，有助于情绪稳定</text>
          </view>
          <view class="suggestion-item">
            <text class="bullet red">•</text>
            <text class="suggestion-text">注意观察被毛情况，保持足够的梳理</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 底部导航栏 -->
    <view class="tab-bar">
      <view class="tab-item" @tap="navigateTo('/pages/pet-profile/index')">
        <view class="tab-icon">🐾</view>
        <text class="tab-text">档案</text>
      </view>
      <view class="tab-item" @tap="navigateTo('/pages/daily-record/index')">
        <view class="tab-icon">📅</view>
        <text class="tab-text">记录</text>
      </view>
      <view class="tab-item" @tap="navigateTo('/pages/emotion/index')">
        <view class="tab-icon">❤️</view>
        <text class="tab-text">情绪</text>
      </view>
      <view class="tab-item active">
        <view class="tab-icon">📊</view>
        <text class="tab-text">周报</text>
      </view>
	  <view class="tab-item"  @tap="navigateTo('/pages/my/index')">
	    <view class="tab-icon">👤</view>
	    <text class="tab-text">我的</text>
	  </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

// Import uni-app API
// import * as uni from '@dcloudio/uni-app';

// 当前选中的分类标签
const currentTab = ref('overview');

// 分类标签数据
const categoryTabs = [
  { label: '总览', value: 'overview' },
  { label: '饮食', value: 'diet' },
  { label: '活动', value: 'activity' },
  { label: '情绪', value: 'emotion' }
];

// 切换分类标签
const switchTab = (tab) => {
  currentTab.value = tab;
};

// 下载报告
const downloadReport = () => {
  uni.showToast({
    title: '报告下载中...',
    icon: 'loading',
    duration: 2000
  });
  
  // 模拟下载过程
  setTimeout(() => {
    uni.showToast({
      title: '下载成功',
      icon: 'success',
      duration: 2000
    });
  }, 2000);
};

// 分享报告
const shareReport = () => {
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline']
  });
};

// 页面导航
const navigateTo = (url) => {
	uni.navigateTo({
		url: url
	})
}

// 生命周期钩子
onLoad(() => {
  console.log('周报页面加载完成');
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

/* 周报标题和操作按钮 */
.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
}

.report-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #333;
}

.action-buttons {
  display: flex;
}

.action-btn {
  width: 60rpx;
  height: 60rpx;
  border-radius: 30rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20rpx;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
}

.action-icon {
  font-size: 30rpx;
}

/* 周报内容 */
.report-content {
  padding: 0 30rpx;
}

/* 日期范围 */
.date-range {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.calendar-icon {
  margin-right: 10rpx;
  font-size: 30rpx;
}

.date-text {
  font-size: 28rpx;
  color: #333;
}

/* 统计数据 */
.stats-row {
  display: flex;
  margin-bottom: 20rpx;
}

.stat-card {
  flex: 1;
  border-radius: 10rpx;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
}

.stat-card:last-child {
  margin-right: 0;
}

.stat-card.green {
  background-color: #e8f5e9;
}

.stat-card.blue {
  background-color: #e3f2fd;
}

.stat-label {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.stat-value {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
}

.stat-card.green .stat-value {
  color: #4caf50;
}

.stat-card.blue .stat-value {
  color: #2196f3;
}

/* 本周概要 */
.summary-section {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.summary-label {
  font-size: 26rpx;
  color: #666;
  font-weight: bold;
}

.summary-text {
  font-size: 26rpx;
  color: #333;
  line-height: 1.5;
}

/* 分类标签页 */
.category-tabs {
  display: flex;
  background-color: #fff;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
}

.category-tabs .tab-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20rpx 0;
  border-bottom: 2rpx solid transparent;
}

.category-tabs .tab-text {
  font-size: 28rpx;
  color: #666;
}

.category-tabs .tab-item.active {
  border-bottom: 2rpx solid #e91e63;
}

.category-tabs .tab-item.active .tab-text {
  color: #e91e63;
  font-weight: bold;
}

/* 记录统计 */
.stats-section {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 15rpx;
}

.section-icon {
  font-size: 30rpx;
  margin-right: 10rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.stats-chart {
  height: 200rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 8rpx;
}

.chart-placeholder {
  font-size: 26rpx;
  color: #999;
}

/* 特别提醒 */
.alert-section {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.alert-list {
  margin-top: 10rpx;
}

.alert-item {
  display: flex;
  margin-bottom: 10rpx;
}

.bullet {
  margin-right: 10rpx;
  font-size: 30rpx;
  line-height: 1.2;
}

.bullet.yellow {
  color: #ffc107;
}

.alert-text {
  font-size: 26rpx;
  color: #333;
  line-height: 1.5;
  flex: 1;
}

/* 下周建议 */
.suggestion-section {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
}

.suggestion-list {
  margin-top: 10rpx;
}

.suggestion-item {
  display: flex;
  margin-bottom: 10rpx;
}

.bullet.red {
  color: #f44336;
}

.suggestion-text {
  font-size: 26rpx;
  color: #333;
  line-height: 1.5;
  flex: 1;
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
}

.tab-bar .tab-icon {
  font-size: 40rpx;
  margin-bottom: 4rpx;
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