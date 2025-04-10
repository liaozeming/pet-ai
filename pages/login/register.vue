<template>
  <view class="container">
    <!-- 渐变标题栏 -->
    <view class="header">
      <text class="header-title">宠物AI助手</text>
    </view>
    
    <!-- 注册区域 -->
    <view class="register-container">
      <!-- 返回按钮 -->
      <view class="back-btn" @tap="goBack">
        <text class="back-icon">←</text>
        <text class="back-text">返回登录</text>
      </view>
      
      <!-- 欢迎文字 -->
      <view class="welcome-text">
        <text class="welcome-title">创建账号</text>
        <text class="welcome-subtitle">注册成为宠物AI助手的新用户</text>
      </view>
      
      <!-- 注册表单 -->
      <view class="register-form">
        <!-- 用户名 -->
        <view class="form-item">
          <text class="form-icon">👤</text>
          <input 
            class="form-input" 
            type="text" 
            v-model="registerForm.username" 
            placeholder="用户名" 
            @blur="validateUsername"
          />
        </view>
        <text v-if="errors.username" class="error-text">{{ errors.username }}</text>
        
        <!-- 手机号 -->
        <view class="form-item">
          <text class="form-icon">📱</text>
          <input 
            class="form-input" 
            type="number" 
            v-model="registerForm.phone" 
            placeholder="手机号码" 
            maxlength="11"
            @blur="validatePhone"
          />
        </view>
        <text v-if="errors.phone" class="error-text">{{ errors.phone }}</text>
        
        <!-- 验证码 -->
<!--        <view class="form-item">
          <text class="form-icon">🔢</text>
          <input 
            class="form-input" 
            type="number" 
            v-model="registerForm.verificationCode" 
            placeholder="验证码" 
            maxlength="6"
            @blur="validateVerificationCode"
          />
          <view 
            class="verification-btn" 
            :class="{ disabled: countdown > 0 }"
            @tap="sendVerificationCode"
          >
            <text class="verification-text">{{ countdown > 0 ? `${countdown}秒后重发` : '获取验证码' }}</text>
          </view>
        </view>
        <text v-if="errors.verificationCode" class="error-text">{{ errors.verificationCode }}</text> -->
        
        <!-- 密码 -->
        <view class="form-item">
          <text class="form-icon">🔒</text>
          <input 
            class="form-input" 
            :type="showPassword ? 'text' : 'password'" 
            v-model="registerForm.password" 
            placeholder="密码（6-20位字母、数字或符号）" 
            @blur="validatePassword"
          />
          <text 
            class="password-toggle" 
            @tap="togglePasswordVisibility"
          >{{ showPassword ? '👁️' : '👁️‍🗨️' }}</text>
        </view>
        <text v-if="errors.password" class="error-text">{{ errors.password }}</text>
        
        <!-- 确认密码 -->
        <view class="form-item">
          <text class="form-icon">🔒</text>
          <input 
            class="form-input" 
            :type="showConfirmPassword ? 'text' : 'password'" 
            v-model="registerForm.confirmPassword" 
            placeholder="确认密码" 
            @blur="validateConfirmPassword"
          />
          <text 
            class="password-toggle" 
            @tap="toggleConfirmPasswordVisibility"
          >{{ showConfirmPassword ? '👁️' : '👁️‍🗨️' }}</text>
        </view>
        <text v-if="errors.confirmPassword" class="error-text">{{ errors.confirmPassword }}</text>
        
        <!-- 用户协议 -->
        <view class="agreement">
          <checkbox 
            :checked="agreeTerms" 
            @tap="agreeTerms = !agreeTerms" 
            color="#e91e63"
          />
          <text class="agreement-text">
            我已阅读并同意
            <text class="agreement-link" @tap="showTerms">《用户协议》</text>
            和
            <text class="agreement-link" @tap="showPrivacy">《隐私政策》</text>
          </text>
        </view>
        <text v-if="errors.agreement" class="error-text">{{ errors.agreement }}</text>
        
        <!-- 注册按钮 -->
        <button class="register-button" @tap="handleRegister">注册</button>
      </view>
      
      <!-- 社交媒体注册 -->
      <view class="social-register">
        <view class="divider">
          <view class="line"></view>
          <text class="divider-text">其他方式注册</text>
          <view class="line"></view>
        </view>
        
        <view class="social-icons">
          <view class="social-icon wechat" @tap="socialRegister('wechat')">
            <text class="icon-text">微信</text>
          </view>
          <view class="social-icon qq" @tap="socialRegister('qq')">
            <text class="icon-text">QQ</text>
          </view>
          <view class="social-icon weibo" @tap="socialRegister('weibo')">
            <text class="icon-text">微博</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue';
//import * as uni from '@dcloudio/uni-app';

// 注册表单数据
const registerForm = reactive({
  username: '',
  phone: '',
  verificationCode: '',
  password: '',
  confirmPassword: ''
});

// 表单错误信息
const errors = reactive({
  username: '',
  phone: '',
  verificationCode: '',
  password: '',
  confirmPassword: '',
  agreement: ''
});

// 是否显示密码
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// 是否同意用户协议
const agreeTerms = ref(false);

// 验证码倒计时
const countdown = ref(0);
let timer = null;

// 切换密码可见性
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// 切换确认密码可见性
const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

// 验证用户名
const validateUsername = () => {
  if (!registerForm.username) {
    errors.username = '请输入用户名';
    return false;
  }
  
  if (registerForm.username.length < 3 || registerForm.username.length > 20) {
    errors.username = '用户名长度应为3-20个字符';
    return false;
  }
  
  errors.username = '';
  return true;
};

// 验证手机号
const validatePhone = () => {
  if (!registerForm.phone) {
    errors.phone = '请输入手机号码';
    return false;
  }
  
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!phoneRegex.test(registerForm.phone)) {
    errors.phone = '请输入有效的手机号码';
    return false;
  }
  
  errors.phone = '';
  return true;
};

// 验证验证码
const validateVerificationCode = () => {
  if (!registerForm.verificationCode) {
    errors.verificationCode = '请输入验证码';
    return false;
  }
  
  if (registerForm.verificationCode.length !== 6) {
    errors.verificationCode = '验证码应为6位数字';
    return false;
  }
  
  errors.verificationCode = '';
  return true;
};

// 验证密码
const validatePassword = () => {
  if (!registerForm.password) {
    errors.password = '请输入密码';
    return false;
  }
  
  if (registerForm.password.length < 6 || registerForm.password.length > 20) {
    errors.password = '密码长度应为6-20个字符';
    return false;
  }
  
  errors.password = '';
  return true;
};

// 验证确认密码
const validateConfirmPassword = () => {
  if (!registerForm.confirmPassword) {
    errors.confirmPassword = '请确认密码';
    return false;
  }
  
  if (registerForm.confirmPassword !== registerForm.password) {
    errors.confirmPassword = '两次输入的密码不一致';
    return false;
  }
  
  errors.confirmPassword = '';
  return true;
};

// 验证用户协议
const validateAgreement = () => {
  if (!agreeTerms.value) {
    errors.agreement = '请阅读并同意用户协议和隐私政策';
    return false;
  }
  
  errors.agreement = '';
  return true;
};

// 发送验证码
const sendVerificationCode = () => {
  if (countdown.value > 0) {
    return;
  }
  
  if (!validatePhone()) {
    return;
  }
  
  // 显示发送中提示
  uni.showLoading({
    title: '发送中...'
  });
  
  // 模拟发送验证码
  setTimeout(() => {
    uni.hideLoading();
    
    // 开始倒计时
    countdown.value = 60;
    timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer);
      }
    }, 1000);
    
    // 显示发送成功提示
    uni.showToast({
      title: '验证码已发送',
      icon: 'success'
    });
  }, 1500);
};

// 处理注册
const handleRegister = () => {
  // 验证表单
  const isUsernameValid = validateUsername();
  const isPhoneValid = validatePhone();
  const isVerificationCodeValid = validateVerificationCode();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();
  const isAgreementValid = validateAgreement();
  
  if (!isUsernameValid || !isPhoneValid || !isVerificationCodeValid || 
      !isPasswordValid || !isConfirmPasswordValid || !isAgreementValid) {
    return;
  }
  
  // 显示注册中
  uni.showLoading({
    title: '注册中...'
  });
  
  // 模拟注册请求
  setTimeout(() => {
    uni.hideLoading();
    
    // 注册成功，跳转到登录页面
    uni.showToast({
      title: '注册成功',
      icon: 'success',
      duration: 2000,
      success: () => {
        setTimeout(() => {
          uni.navigateBack();
        }, 2000);
      }
    });
  }, 2000);
};

// 社交媒体注册
const socialRegister = (platform) => {
  uni.showToast({
    title: `正在使用${platform}注册`,
    icon: 'none'
  });
  
  // 这里可以实现具体的社交媒体注册逻辑
};

// 显示用户协议
const showTerms = () => {
  uni.navigateTo({
    url: '/pages/login/terms'
  });
};

// 显示隐私政策
const showPrivacy = () => {
  uni.navigateTo({
    url: '/pages/login/privacy'
  });
};index

// 返回登录页面
const goBack = () => {
	uni.navigateTo({
				url: '/pages/login/'
			})
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

/* 注册区域 */
.register-container {
  flex: 1;
  padding: 30rpx 50rpx;
  display: flex;
  flex-direction: column;
}

/* 返回按钮 */
.back-btn {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.back-icon {
  font-size: 36rpx;
  color: #666;
  margin-right: 10rpx;
}

.back-text {
  font-size: 28rpx;
  color: #666;
}

/* 欢迎文字 */
.welcome-text {
  margin-bottom: 40rpx;
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

/* 注册表单 */
.register-form {
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

.verification-btn {
  background-color: #e91e63;
  border-radius: 8rpx;
  padding: 10rpx 20rpx;
}

.verification-btn.disabled {
  background-color: #ccc;
}

.verification-text {
  color: white;
  font-size: 24rpx;
  white-space: nowrap;
}

.error-text {
  color: #f44336;
  font-size: 24rpx;
  margin: -10rpx 0 20rpx 20rpx;
  display: block;
}

/* 用户协议 */
.agreement {
  display: flex;
  align-items: center;
  margin: 20rpx 0 30rpx;
}

.agreement-text {
  font-size: 26rpx;
  color: #666;
  margin-left: 10rpx;
}

.agreement-link {
  color: #e91e63;
}

/* 注册按钮 */
.register-button {
  background-color: #e91e63;
  color: white;
  border-radius: 10rpx;
  padding: 20rpx 0;
  font-size: 32rpx;
  border: none;
}

/* 社交媒体注册 */
.social-register {
  margin-top: auto;
  padding-top: 40rpx;
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

.social-icons {
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
</style>