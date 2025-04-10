<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @tap="goBack">
        <text class="back-icon">←</text>
      </view>
      <text class="page-title">记录</text>
    </view>
    
    <!-- 渐变标题栏 -->
    <view class="header">
      <text class="header-title">宠物AI助手</text>
    </view>
    
    <!-- 日常记录标题和日期选择 -->
    <view class="record-header">
      <text class="record-title">日常记录</text>
      <view class="date-picker">
        <picker mode="date" :value="currentDate" @change="handleDateChange">
          <view class="date-display">
            <text class="calendar-icon">📅</text>
            <text class="date-text">{{ formatDate(currentDate) }}</text>
          </view>
        </picker>
      </view>
    </view>
    
    <!-- 分类筛选栏 - 固定显示所有选项 -->
    <view class="category-filter">
      <view 
        v-for="(category, index) in categories" 
        :key="index" 
        class="category-item" 
        :class="{ active: currentCategory === category.value }"
        @tap="setCategory(category.value)"
      >
        <text class="category-icon">{{ category.icon }}</text>
        <text class="category-text">{{ category.label }}</text>
      </view>
    </view>
    
    <!-- 添加记录按钮 -->
    <view class="add-record-btn" @tap="handleAddRecord">
      <text class="plus-icon">+</text>
      <text class="add-text">添加记录</text>
    </view>
    
    <!-- 记录列表 -->
    <scroll-view scroll-y class="record-list">
      <view 
        v-for="(record, index) in filteredRecords" 
        :key="index" 
        class="record-item"
        :class="record.type"
      >
        <view class="record-icon">{{ getCategoryIcon(record.type) }}</view>
        <view class="record-content">
          <text class="record-desc">{{ record.description }}</text>
          <text class="record-time">{{ record.time }}</text>
        </view>
      </view>
    </scroll-view>
    
    <!-- 底部导航栏 -->
    <view class="tab-bar">
      <view class="tab-item" @tap="navigateTo('/pages/pet-profile/index')">
        <view class="tab-icon">🐾</view>
        <text class="tab-text">档案</text>
      </view>
      <view class="tab-item active">
        <view class="tab-icon">📅</view>
        <text class="tab-text">记录</text>
      </view>
      <view class="tab-item" @tap="navigateTo('/pages/emotion/index')">
        <view class="tab-icon">❤️</view>
        <text class="tab-text">情绪</text>
      </view>
      <view class="tab-item" @tap="navigateTo('/pages/weekly-report/index')">
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
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

// Import uni-app API
// import * as uni from '@dcloudio/uni-app';

// 当前日期
const currentDate = ref('2025-04-09');

// 当前选中的分类
const currentCategory = ref('all');

// 分类数据
const categories = [
  { label: '全部', value: 'all', icon: '🔍' },
  { label: '饮食', value: 'food', icon: '🍽️' },
  { label: '饮水', value: 'water', icon: '💧' },
  { label: '活动', value: 'activity', icon: '📈' },
  { label: '睡眠', value: 'sleep', icon: '🌙' },
  { label: '健康', value: 'health', icon: '💊' }
];

// 记录数据
const records = ref([
  { 
    type: 'food', 
    description: '猫粮100g，食欲良好', 
    time: '08:30', 
    date: '2025-04-09' 
  },
  { 
    type: 'water', 
    description: '饮水约50ml', 
    time: '10:15', 
    date: '2025-04-09' 
  },
  { 
    type: 'activity', 
    description: '室内玩耍30分钟，精力充沛', 
    time: '14:00', 
    date: '2025-04-09' 
  }
]);

// 根据分类筛选记录
const filteredRecords = computed(() => {
  if (currentCategory.value === 'all') {
    return records.value.filter(record => record.date === currentDate.value);
  } else {
    return records.value.filter(
      record => record.type === currentCategory.value && record.date === currentDate.value
    );
  }
});

// 获取分类图标
const getCategoryIcon = (type) => {
  const category = categories.find(c => c.value === type);
  return category ? category.icon : '🔍';
};

// 设置当前分类
const setCategory = (category) => {
  currentCategory.value = category;
};

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return dateStr.replace(/-/g, '-');
};

// 处理日期变更
const handleDateChange = (e) => {
  currentDate.value = e.detail.value;
};

// 添加记录
const handleAddRecord = () => {
  uni.navigateTo({
    url: '/pages/daily-record/add'
  });
};

// 返回上一页
const goBack = () => {
  uni.navigateBack();
};

// 页面导航
const navigateTo = (url) => {
	uni.navigateTo({
		url: url
	})
}

// 生命周期钩子
onLoad(() => {
  // 可以在这里加载记录数据
  console.log('页面加载完成');
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

/* 顶部导航栏 */
.nav-bar {
  display: flex;
  align-items: center;
  height: 90rpx;
  padding: 0 30rpx;
  background-color: #fff;
  position: relative;
}

.back-btn {
  position: absolute;
  left: 30rpx;
  top: 50%;
  transform: translateY(-50%);
}

.back-icon {
  font-size: 40rpx;
  color: #333;
}

.page-title {
  flex: 1;
  text-align: center;
  font-size: 34rpx;
  font-weight: bold;
  color: #333;
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

/* 记录标题和日期选择 */
.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
}

.record-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #333;
}

.date-picker {
  background-color: #fff;
  border-radius: 8rpx;
  padding: 10rpx 20rpx;
  border: 1px solid #eee;
}

.date-display {
  display: flex;
  align-items: center;
}

.calendar-icon {
  margin-right: 10rpx;
  font-size: 28rpx;
}

.date-text {
  font-size: 28rpx;
  color: #333;
}

/* 分类筛选栏 - 固定显示所有选项 */
.category-filter {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  background-color: #fff;
  border-radius: 10rpx;
  margin: 0 30rpx 20rpx;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rpx 0;
  flex: 1;
}

.category-icon {
  font-size: 28rpx;
  margin-bottom: 6rpx;
}

.category-text {
  font-size: 22rpx;
  color: #666;
}

.category-item.active {
  background-color: #ffebee;
  border-radius: 8rpx;
}

.category-item.active .category-text {
  color: #e91e63;
}

/* 添加记录按钮 */
.add-record-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e91e63;
  color: white;
  padding: 20rpx 0;
  border-radius: 10rpx;
  margin: 0 30rpx 20rpx;
}

.plus-icon {
  font-size: 32rpx;
  margin-right: 10rpx;
}

.add-text {
  font-size: 30rpx;
}

/* 记录列表 */
.record-list {
  flex: 1;
  padding: 0 30rpx;
}

.record-item {
  display: flex;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
  border-left: 10rpx solid #ddd;
}

.record-item.food {
  border-left-color: #fff9c4;
  background-color: #fffde7;
}

.record-item.water {
  border-left-color: #bbdefb;
  background-color: #e3f2fd;
}

.record-item.activity {
  border-left-color: #c8e6c9;
  background-color: #e8f5e9;
}

.record-item.sleep {
  border-left-color: #d1c4e9;
  background-color: #ede7f6;
}

.record-item.health {
  border-left-color: #f8bbd0;
  background-color: #fce4ec;
}

.record-icon {
  margin-right: 20rpx;
  font-size: 40rpx;
  display: flex;
  align-items: center;
}

.record-content {
  flex: 1;
}

.record-desc {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 10rpx;
}

.record-time {
  font-size: 24rpx;
  color: #999;
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

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tab-icon {
  font-size: 40rpx;
  margin-bottom: 4rpx;
}

.tab-text {
  font-size: 24rpx;
  color: #999;
}

.tab-item.active {
  background-color: #fff5f8;
  box-shadow: 0 -4rpx 10rpx rgba(0, 0, 0, 0.05);
  position: relative;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background-color: #e91e63;
  border-radius: 2rpx;
}

.tab-item.active .tab-icon,
.tab-item.active .tab-text {
  color: #e91e63;
}

.tab-bar .tab-item.active {
  background-color: #fff5f8;
  box-shadow: 0 -4rpx 10rpx rgba(0, 0, 0, 0.05);
  position: relative;
}
</style>