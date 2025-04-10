<template>
  <view class="container">
    <!-- 渐变标题栏 -->
    <view class="header">
      <text class="header-title">宠物AI助手</text>
    </view>
    
    <!-- 登录区域 -->
    <view class="login-container">
      <!-- 宠物插图 -->
      <view class="pet-illustration">
        <image class="pet-image" src="/static/images/pet-login.png" mode="aspectFit"></image>
      </view>
      
      <!-- 欢迎文字 -->
      <view class="welcome-text">
        <text class="welcome-title">欢迎回来</text>
        <text class="welcome-subtitle">登录您的账号，开始关爱您的宠物</text>
      </view>
      
      <!-- 登录表单 -->
      <view class="login-form">
        <view class="form-item">
          <text class="form-icon">👤</text>
          <input 
            class="form-input" 
            type="text" 
            v-model="loginForm.username" 
            placeholder="手机号/用户名" 
            @blur="validateUsername"
          />
        </view>
        <text v-if="errors.username" class="error-text">{{ errors.username }}</text>
        
        <view class="form-item">
          <text class="form-icon">🔒</text>
          <input 
            class="form-input" 
            type="text" 
            v-if="showPassword"
            v-model="loginForm.password" 
            placeholder="密码" 
            @blur="validatePassword"
          />
          <input 
            class="form-input" 
            type="password" 
            v-else
            v-model="loginForm.password" 
            placeholder="密码" 
            @blur="validatePassword"
          />
          <view 
            class="password-toggle" 
            @tap="togglePasswordVisibility"
          >{{ showPassword ? '👁️' : '👁️‍🗨️' }}</view>
        </view>
        <text v-if="errors.password" class="error-text">{{ errors.password }}</text>
        
        <view class="remember-forgot">
          <label class="remember-me">
            <checkbox 
              :checked="rememberMe" 
              @tap="rememberMe = !rememberMe" 
              color="#e91e63"
            />
            <text class="remember-text">记住我</text>
          </label>
          <text class="forgot-password" @tap="forgotPassword">忘记密码?</text>
        </view>
        
        <button class="login-button" @tap="handleLogin">登录</button>
        
        <!-- 其他登录方式 -->
        <view class="other-login">
          <view class="divider">
            <view class="line"></view>
            <text class="divider-text">其他登录方式</text>
            <view class="line"></view>
          </view>
          
          <view class="social-login">
            <view class="social-icon wechat" @tap="socialLogin('wechat')">
              <text class="icon-text">微信</text>
            </view>
            <view class="social-icon qq" @tap="socialLogin('qq')">
              <text class="icon-text">QQ</text>
            </view>
            <view class="social-icon weibo" @tap="socialLogin('weibo')">
              <text class="icon-text">微博</text>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 注册链接 -->
      <view class="register-link">
        <text class="register-text">还没有账号？</text>
        <text class="register-button" @tap="goToRegister">立即注册</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useUserStore } from '@/stores/user'

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: ''
});

// 表单错误信息
const errors = reactive({
  username: '',
  password: ''
});

// 是否显示密码
const showPassword = ref(false);

// 记住我选项
const rememberMe = ref(false);

// 切换密码可见性
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// 验证用户名
const validateUsername = () => {
  if (!loginForm.username) {
    errors.username = '请输入用户名或手机号';
    return false;
  }
  
  errors.username = '';
  return true;
};

// 验证密码
const validatePassword = () => {
  if (!loginForm.password) {
    errors.password = '请输入密码';
    return false;
  }
  
  if (loginForm.password.length < 6) {
    errors.password = '密码长度不能少于6位';
    return false;
  }
  
  errors.password = '';
  return true;
};

// 处理登录
const handleLogin = async () => {
  // 验证表单
  const isUsernameValid = validateUsername();
  const isPasswordValid = validatePassword();
  console.log(isUsernameValid)
  if (!isUsernameValid || !isPasswordValid) {
    return;
  }
  
  // 显示加载中
  uni.showLoading({
    title: '登录中...'
  });
  
  try {
    // 模拟登录请求
    const userInfo = {
      username: loginForm.username,
      token: 'mock_token_' + Date.now(),
      timestamp: Date.now()
    }
    
    // 保存用户信息
    useUserStore().setUserInfo(userInfo)
    console.log('登录成功，用户信息:', userInfo)
    
    // 如果选择了记住我，保存登录信息
    if (rememberMe.value) {
      uni.setStorageSync('loginInfo', {
        username: loginForm.username,
        timestamp: Date.now()
      });
    }
    
    // 登录成功后跳转
    uni.reLaunch({
      url: '/pages/pet-profile/index',
      success: () => {
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        });
      }
    });
  } catch (error) {
    console.error('登录失败:', error)
    uni.showToast({
      title: '登录失败',
      icon: 'error'
    });
  } finally {
    uni.hideLoading();
  }
};

// 忘记密码
const forgotPassword = () => {
  uni.navigateTo({
    url: '/pages/login/resetPsw'
  });
};

// 社交媒体登录
const socialLogin = (platform) => {
  uni.showToast({
    title: `正在使用${platform}登录`,
    icon: 'none'
  });
  
  // 这里可以实现具体的社交媒体登录逻辑
};

// 跳转到注册页面
const goToRegister = () => {
  uni.navigateTo({
    url: '/pages/login/register'
  });
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f8f8;
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

/* 登录区域 */
.login-container {
  flex: 1;
  padding: 40rpx 50rpx;
  display: flex;
  flex-direction: column;
}

/* 宠物插图 */
.pet-illustration {
  display: flex;
  justify-content: center;
  margin-bottom: 40rpx;
}

.pet-image {
  width: 240rpx;
  height: 240rpx;
}

/* 欢迎文字 */
.welcome-text {
  text-align: center;
  margin-bottom: 50rpx;
}

.welcome-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
  display: block;
}

.welcome-subtitle {
  font-size: 28rpx;
  color: #666;
}

/* 登录表单 */
.login-form {
  margin-bottom: 40rpx;
}

.form-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.05);
}

.form-icon {
  margin-right: 20rpx;
  font-size: 36rpx;
}

.form-input {
  flex: 1;
  font-size: 28rpx;
  height: 60rpx;
}

.password-toggle {
  font-size: 36rpx;
  color: #999;
}

.error-text {
  color: #f44336;
  font-size: 24rpx;
  margin: -10rpx 0 20rpx 20rpx;
  display: block;
}

/* 记住我和忘记密码 */
.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
}

.remember-me {
  display: flex;
  align-items: center;
}

.remember-text {
  font-size: 26rpx;
  color: #666;
  margin-left: 10rpx;
}

.forgot-password {
  font-size: 26rpx;
  color: #e91e63;
}

/* 登录按钮 */
.login-button {
  background-color: #e91e63;
  color: white;
  border-radius: 10rpx;
  padding: 20rpx 0;
  font-size: 32rpx;
  border: none;
  margin-bottom: 40rpx;
}

/* 其他登录方式 */
.other-login {
  margin-bottom: 40rpx;
}

.divider {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.line {
  flex: 1;
  height: 1rpx;
  background-color: #ddd;
}

.divider-text {
  padding: 0 20rpx;
  font-size: 26rpx;
  color: #999;
}

.social-login {
  display: flex;
  justify-content: center;
}

.social-icon {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.social-icon.wechat {
  background-color: #07c160;
}

.social-icon.qq {
  background-color: #12b7f5;
}

.social-icon.weibo {
  background-color: #e6162d;
}

.icon-text {
  color: white;
  font-size: 26rpx;
}

/* 注册链接 */
.register-link {
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-text {
  font-size: 28rpx;
  color: #666;
}

.register-button {
  font-size: 28rpx;
  color: #e91e63;
  margin-left: 10rpx;
  font-weight: bold;
}
</style>