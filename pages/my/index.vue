<template>
  <view class="container">
    <!-- 渐变标题栏 -->
    <view class="header">
      <text class="header-title">宠物AI助手</text>
    </view>
    
    <!-- 用户信息区域 -->
    <view class="user-profile">
      <view class="profile-background"></view>
      <view class="profile-content">
        <view class="avatar-container" @tap="changeAvatar">
          <image class="avatar" :src="userInfo.avatar" mode="aspectFill"></image>
          <view class="edit-avatar">
            <text class="edit-icon">📷</text>
          </view>
        </view>
        <view class="user-info">
          <view class="name-vip">
            <text class="user-name">{{ userInfo.nickname }}</text>
            <view v-if="userInfo.isVip" class="vip-badge">
              <text class="vip-text">VIP</text>
            </view>
          </view>
          <text class="user-id">ID: {{ userInfo.userId }}</text>
        </view>
        <view class="edit-profile" @tap="editProfile">
          <text class="edit-text">编辑资料</text>
          <text class="arrow-icon">></text>
        </view>
      </view>
    </view>
    
    <!-- 用户数据统计 -->
    <view class="user-stats">
      <view class="stat-item" @tap="navigateTo('/pages/my/pets')">
        <text class="stat-value">{{ userInfo.petCount }}</text>
        <text class="stat-label">我的宠物</text>
      </view>
      <view class="stat-divider"></view>
      <view class="stat-item" @tap="navigateTo('/pages/my/favorites')">
        <text class="stat-value">{{ userInfo.favoriteCount }}</text>
        <text class="stat-label">我的收藏</text>
      </view>
      <view class="stat-divider"></view>
      <view class="stat-item" @tap="navigateTo('/pages/my/points')">
        <text class="stat-value">{{ userInfo.points }}</text>
        <text class="stat-label">积分</text>
      </view>
    </view>
    
    <!-- VIP会员卡 -->
    <view v-if="userInfo.isVip" class="vip-card" @tap="navigateTo('/pages/my/vip')">
      <view class="vip-info">
        <view class="vip-title-row">
          <text class="vip-title">AI助手高级会员</text>
          <text class="vip-level">Lv{{ userInfo.vipLevel }}</text>
        </view>
        <text class="vip-expire">有效期至：{{ userInfo.vipExpireDate }}</text>
      </view>
      <view class="vip-benefits">
        <text class="benefits-text">查看权益 ></text>
      </view>
    </view>
    
    <!-- 功能菜单 -->
    <view class="menu-section">
      <view class="menu-group">
        <view class="menu-item" @tap="navigateTo('/pages/my/pets')">
          <view class="menu-icon pet">🐾</view>
          <text class="menu-label">我的宠物</text>
          <text class="menu-arrow">></text>
        </view>
        <view class="menu-item" @tap="navigateTo('/pages/my/health-records')">
          <view class="menu-icon health">💊</view>
          <text class="menu-label">健康档案</text>
          <text class="menu-arrow">></text>
        </view>
        <view class="menu-item" @tap="navigateTo('/pages/my/reminders')">
          <view class="menu-icon reminder">⏰</view>
          <text class="menu-label">提醒设置</text>
          <text class="menu-arrow">></text>
        </view>
      </view>
      
      <view class="menu-group">
        <view class="menu-item" @tap="navigateTo('/pages/my/account-security')">
          <view class="menu-icon security">🔒</view>
          <text class="menu-label">账号安全</text>
          <text class="menu-arrow">></text>
        </view>
        <view class="menu-item" @tap="navigateTo('/pages/my/notifications')">
          <view class="menu-icon notification">🔔</view>
          <text class="menu-label">消息通知</text>
          <text class="menu-arrow">></text>
        </view>
        <view class="menu-item" @tap="navigateTo('/pages/my/privacy')">
          <view class="menu-icon privacy">👁️</view>
          <text class="menu-label">隐私设置</text>
          <text class="menu-arrow">></text>
        </view>
      </view>
      
      <view class="menu-group">
        <view class="menu-item" @tap="navigateTo('/pages/my/feedback')">
          <view class="menu-icon feedback">💬</view>
          <text class="menu-label">意见反馈</text>
          <text class="menu-arrow">></text>
        </view>
        <view class="menu-item" @tap="navigateTo('/pages/my/help')">
          <view class="menu-icon help">❓</view>
          <text class="menu-label">帮助中心</text>
          <text class="menu-arrow">></text>
        </view>
        <view class="menu-item" @tap="navigateTo('/pages/my/about')">
          <view class="menu-icon about">ℹ️</view>
          <text class="menu-label">关于我们</text>
          <text class="menu-arrow">></text>
        </view>
      </view>
    </view>
    
    <!-- 退出登录按钮 -->
    <view class="logout-button" @tap="showLogoutConfirm">
      <text class="logout-text">退出登录</text>
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
      <view class="tab-item" @tap="navigateTo('/pages/weekly-report/index')">
        <view class="tab-icon">📊</view>
        <text class="tab-text">周报</text>
      </view>
      <view class="tab-item active">
        <view class="tab-icon">👤</view>
        <text class="tab-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
//import * as uni from '@dcloudio/uni-app';
import { useUserStore } from '@/stores/user'

// 用户信息
const userInfo = reactive({
  nickname: '宠物爱好者',
  userId: '10086789',
  avatar: '/static/images/avatar.png',
  isVip: true,
  vipLevel: 2,
  vipExpireDate: '2025-12-31',
  petCount: 2,
  favoriteCount: 15,
  points: 368
});

// 修改头像
const changeAvatar = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      // 这里可以处理选择的图片，例如上传到服务器
      // 模拟更新头像
      userInfo.avatar = res.tempFilePaths[0];
      
      uni.showToast({
        title: '头像更新成功',
        icon: 'success'
      });
    }
  });
};

// 编辑个人资料
const editProfile = () => {
  uni.navigateTo({
    url: '/pages/my/edit-profile'
  });
};

// 页面导航
const navigateTo = (url) => {
  uni.navigateTo({
    url
  });
};

// 切换底部标签页
const switchTab = (url) => {
  uni.switchTab({
    url
  });
};

// 显示退出登录确认框
const showLogoutConfirm = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        logout();
      }
    }
  });
};

// 退出登录
const logout = () => {
  // 清除登录状态
	useUserStore().logout()
};

// 生命周期钩子
onMounted(() => {
  // 可以在这里获取用户信息
  console.log('我的页面加载完成');
});
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f8f8;
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

/* 用户信息区域 */
.user-profile {
  position: relative;
  margin-bottom: 30rpx;
}

.profile-background {
  height: 160rpx;
  background: linear-gradient(to right, #f48fb1, #81d4fa);
}

.profile-content {
  display: flex;
  align-items: center;
  padding: 0 30rpx 20rpx;
  background-color: #fff;
}

.avatar-container {
  position: relative;
  margin-top: -60rpx;
  margin-right: 30rpx;
}

.avatar {
  width: 150rpx;
  height: 150rpx;
  border-radius: 75rpx;
  border: 4rpx solid #fff;
  background-color: #f5f5f5;
}

.edit-avatar {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50rpx;
  height: 50rpx;
  border-radius: 25rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
}

.edit-icon {
  font-size: 30rpx;
}

.user-info {
  flex: 1;
}

.name-vip {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.user-name {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-right: 20rpx;
}

.vip-badge {
  background: linear-gradient(to right, #ff9800, #ff5722);
  border-radius: 6rpx;
  padding: 4rpx 10rpx;
}

.vip-text {
  color: #fff;
  font-size: 22rpx;
  font-weight: bold;
}

.user-id {
  font-size: 24rpx;
  color: #999;
}

.edit-profile {
  display: flex;
  align-items: center;
  padding: 10rpx 20rpx;
  border: 1rpx solid #ddd;
  border-radius: 30rpx;
}

.edit-text {
  font-size: 24rpx;
  color: #666;
}

.arrow-icon {
  font-size: 24rpx;
  color: #999;
  margin-left: 6rpx;
}

/* 用户数据统计 */
.user-stats {
  display: flex;
  background-color: #fff;
  padding: 30rpx 0;
  margin-bottom: 20rpx;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.stat-label {
  font-size: 26rpx;
  color: #666;
}

.stat-divider {
  width: 1rpx;
  background-color: #eee;
  margin: 10rpx 0;
}

/* VIP会员卡 */
.vip-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #ff9800, #ff5722);
  border-radius: 16rpx;
  padding: 30rpx;
  margin: 0 30rpx 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(255, 152, 0, 0.2);
}

.vip-title-row {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.vip-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #fff;
  margin-right: 20rpx;
}

.vip-level {
  font-size: 24rpx;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 6rpx;
  padding: 4rpx 10rpx;
}

.vip-expire {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
}

.vip-benefits {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 30rpx;
  padding: 10rpx 20rpx;
}

.benefits-text {
  font-size: 24rpx;
  color: #fff;
}

/* 功能菜单 */
.menu-section {
  margin-bottom: 40rpx;
}

.menu-group {
  background-color: #fff;
  border-radius: 16rpx;
  margin: 0 30rpx 20rpx;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-icon {
  width: 60rpx;
  height: 60rpx;
  border-radius: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
  font-size: 32rpx;
}

.menu-icon.pet {
  background-color: #e1f5fe;
  color: #03a9f4;
}

.menu-icon.health {
  background-color: #f3e5f5;
  color: #9c27b0;
}

.menu-icon.reminder {
  background-color: #e8f5e9;
  color: #4caf50;
}

.menu-icon.security {
  background-color: #fff3e0;
  color: #ff9800;
}

.menu-icon.notification {
  background-color: #fffde7;
  color: #ffc107;
}

.menu-icon.privacy {
  background-color: #e0f2f1;
  color: #009688;
}

.menu-icon.feedback {
  background-color: #f1f8e9;
  color: #8bc34a;
}

.menu-icon.help {
  background-color: #e8eaf6;
  color: #3f51b5;
}

.menu-icon.about {
  background-color: #fce4ec;
  color: #e91e63;
}

.menu-label {
  flex: 1;
  font-size: 30rpx;
  color: #333;
}

.menu-arrow {
  font-size: 30rpx;
  color: #ccc;
}

/* 退出登录按钮 */
.logout-button {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx 0;
  margin: 0 30rpx 40rpx;
  text-align: center;
}

.logout-text {
  font-size: 32rpx;
  color: #f44336;
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
</style>