<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="nav-bar">
			<view class="back-btn" @tap="goBack">
				<text class="back-icon">←</text>
			</view>
			<text class="page-title">忘记密码</text>
		</view>

		<!-- 渐变标题栏 -->
		<view class="header">
			<text class="header-title">宠物AI助手</text>
		</view>

		<!-- 步骤指示器 -->
		<view class="step-indicator">
			<view v-for="(step, index) in steps" :key="index" class="step"
				:class="{ 'active': currentStep >= index, 'completed': currentStep > index }">
				<view class="step-circle">
					<text v-if="currentStep > index" class="step-check">✓</text>
					<text v-else class="step-number">{{ index + 1 }}</text>
				</view>
				<text class="step-label">{{ step }}</text>
				<view v-if="index < steps.length - 1" class="step-line"></view>
			</view>
		</view>

		<!-- 第一步：验证手机号 -->
		<view v-if="currentStep === 0" class="form-container">

			<view class="step-title">
				<text class="title-text">验证手机号</text>
				<text class="subtitle-text">请输入您注册时使用的手机号码</text>
			</view>

		<!-- 用户名 -->
			<view class="form-item">
				<text class="form-icon">👤</text>
				<input class="form-input" type="text" v-model="registerForm.username" placeholder="用户名"
					@blur="validateUsername" />
			</view>
			
			<view class="form-item">
				<text class="form-icon">📱</text>
				<input class="form-input" type="number" v-model="resetForm.phone" placeholder="请输入手机号" maxlength="11"
					@blur="validatePhone" />
			</view>
			<text v-if="errors.phone" class="error-text">{{ errors.phone }}</text>

			<view class="form-item verification">
				<text class="form-icon">🔑</text>
				<input class="form-input" type="number" v-model="resetForm.verificationCode" placeholder="请输入验证码"
					maxlength="6" @blur="validateVerificationCode" />
				<view class="verification-btn" :class="{ 'disabled': countdown > 0 }" @tap="sendVerificationCode">
					<text class="verification-text">{{ countdown > 0 ? `${countdown}s` : '获取验证码' }}</text>
				</view>
			</view>
			<text v-if="errors.verificationCode" class="error-text">{{ errors.verificationCode }}</text>

			<button class="next-button" @tap="verifyPhone">下一步</button>
		</view>

		<!-- 第二步：设置新密码 -->
		<view v-if="currentStep === 1" class="form-container">
			<view class="step-title">
				<text class="title-text">设置新密码</text>
				<text class="subtitle-text">请设置一个新的密码</text>
			</view>

			<view class="form-item">
				<text class="form-icon">🔒</text>
				<input class="form-input" :type="showPassword ? 'text' : 'password'" v-model="resetForm.newPassword"
					placeholder="请输入新密码" @blur="validateNewPassword" />
				<text class="password-toggle"
					@tap="togglePasswordVisibility('new')">{{ showPassword ? '👁️' : '👁️‍🗨️' }}</text>
			</view>
			<text v-if="errors.newPassword" class="error-text">{{ errors.newPassword }}</text>

			<view class="form-item">
				<text class="form-icon">🔒</text>
				<input class="form-input" :type="showConfirmPassword ? 'text' : 'password'"
					v-model="resetForm.confirmPassword" placeholder="请确认新密码" @blur="validateConfirmPassword" />
				<text class="password-toggle"
					@tap="togglePasswordVisibility('confirm')">{{ showConfirmPassword ? '👁️' : '👁️‍🗨️' }}</text>
			</view>
			<text v-if="errors.confirmPassword" class="error-text">{{ errors.confirmPassword }}</text>

			<view class="password-strength">
				<text class="strength-label">密码强度：</text>
				<view class="strength-meter">
					<view class="strength-bar" :class="passwordStrengthClass"
						:style="{ width: passwordStrength + '%' }"></view>
				</view>
				<text class="strength-text">{{ passwordStrengthText }}</text>
			</view>

			<view class="password-tips">
				<text class="tips-title">密码要求：</text>
				<text class="tips-item">• 长度为8-20个字符</text>
				<text class="tips-item">• 包含字母、数字和特殊字符</text>
				<text class="tips-item">• 不能与旧密码相同</text>
			</view>

			<button class="next-button" @tap="resetPassword">重置密码</button>
		</view>

		<!-- 第三步：重置成功 -->
		<view v-if="currentStep === 2" class="success-container">
			<view class="success-icon">✓</view>
			<text class="success-title">密码重置成功</text>
			<text class="success-message">您的密码已成功重置，请使用新密码登录</text>
			<button class="login-button" @tap="goToLogin">返回登录</button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		computed,
		watch
	} from 'vue';
	//import * as uni from '@dcloudio/uni-app';

	// 步骤数据
	const steps = ['验证手机号', '设置新密码', '重置成功'];
	const currentStep = ref(0);

	// 表单数据
	const resetForm = reactive({
		username: '',
		phone: '',
		verificationCode: '',
		newPassword: '',
		confirmPassword: ''
	});

	// 错误信息
	const errors = reactive({
		phone: '',
		verificationCode: '',
		newPassword: '',
		confirmPassword: ''
	});

	// 密码可见性
	const showPassword = ref(false);
	const showConfirmPassword = ref(false);

	// 验证码倒计时
	const countdown = ref(0);
	let timer = null;

	// 切换密码可见性
	const togglePasswordVisibility = (type) => {
		if (type === 'new') {
			showPassword.value = !showPassword.value;
		} else {
			showConfirmPassword.value = !showConfirmPassword.value;
		}
	};

	// 验证手机号
	const validatePhone = () => {
		const phoneRegex = /^1[3-9]\d{9}$/;

		if (!resetForm.phone) {
			errors.phone = '请输入手机号';
			return false;
		}

		if (!phoneRegex.test(resetForm.phone)) {
			errors.phone = '请输入正确的手机号';
			return false;
		}

		errors.phone = '';
		return true;
	};

	// 验证验证码
	const validateVerificationCode = () => {
		if (!resetForm.verificationCode) {
			errors.verificationCode = '请输入验证码';
			return false;
		}

		if (resetForm.verificationCode.length !== 6) {
			errors.verificationCode = '验证码为6位数字';
			return false;
		}

		errors.verificationCode = '';
		return true;
	};

	// 验证新密码
	const validateNewPassword = () => {
		if (!resetForm.newPassword) {
			errors.newPassword = '请输入新密码';
			return false;
		}

		if (resetForm.newPassword.length < 8 || resetForm.newPassword.length > 20) {
			errors.newPassword = '密码长度为8-20个字符';
			return false;
		}

		// 检查密码复杂度
		const hasLetter = /[a-zA-Z]/.test(resetForm.newPassword);
		const hasNumber = /\d/.test(resetForm.newPassword);
		const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(resetForm.newPassword);

		if (!(hasLetter && hasNumber && hasSpecial)) {
			errors.newPassword = '密码需包含字母、数字和特殊字符';
			return false;
		}

		errors.newPassword = '';
		return true;
	};

	// 验证确认密码
	const validateConfirmPassword = () => {
		if (!resetForm.confirmPassword) {
			errors.confirmPassword = '请确认新密码';
			return false;
		}

		if (resetForm.confirmPassword !== resetForm.newPassword) {
			errors.confirmPassword = '两次输入的密码不一致';
			return false;
		}

		errors.confirmPassword = '';
		return true;
	};

	// 计算密码强度
	const passwordStrength = computed(() => {
		if (!resetForm.newPassword) return 0;

		let strength = 0;

		// 长度检查
		if (resetForm.newPassword.length >= 8) strength += 20;
		if (resetForm.newPassword.length >= 12) strength += 10;

		// 复杂度检查
		if (/[a-z]/.test(resetForm.newPassword)) strength += 10;
		if (/[A-Z]/.test(resetForm.newPassword)) strength += 10;
		if (/\d/.test(resetForm.newPassword)) strength += 10;
		if (/[!@#$%^&*(),.?":{}|<>]/.test(resetForm.newPassword)) strength += 20;

		// 多样性检查
		const uniqueChars = new Set(resetForm.newPassword).size;
		strength += Math.min(uniqueChars * 2, 20);

		return Math.min(strength, 100);
	});

	// 密码强度文本
	const passwordStrengthText = computed(() => {
		if (passwordStrength.value < 40) return '弱';
		if (passwordStrength.value < 70) return '中';
		return '强';
	});

	// 密码强度样式类
	const passwordStrengthClass = computed(() => {
		if (passwordStrength.value < 40) return 'weak';
		if (passwordStrength.value < 70) return 'medium';
		return 'strong';
	});

	// 发送验证码
	const sendVerificationCode = () => {
		if (countdown.value > 0) return;

		if (!validatePhone()) return;

		// 显示发送中
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
		}, 1000);
	};

	// 验证手机号并进入下一步
	const verifyPhone = () => {
		// 验证表单
		const isPhoneValid = validatePhone();
		const isCodeValid = validateVerificationCode();

		if (!isPhoneValid || !isCodeValid) {
			return;
		}

		// 显示验证中
		uni.showLoading({
			title: '验证中...'
		});

		// 模拟验证过程
		setTimeout(() => {
			uni.hideLoading();

			// 进入下一步
			currentStep.value = 1;
		}, 1500);
	};

	// 重置密码
	const resetPassword = () => {
		// 验证表单
		const isNewPasswordValid = validateNewPassword();
		const isConfirmPasswordValid = validateConfirmPassword();

		if (!isNewPasswordValid || !isConfirmPasswordValid) {
			return;
		}

		// 显示重置中
		uni.showLoading({
			title: '重置中...'
		});

		// 模拟重置过程
		setTimeout(() => {
			uni.hideLoading();

			// 进入成功页面
			currentStep.value = 2;
		}, 1500);
	};

	// 返回登录页面
	const goToLogin = () => {
		uni.navigateBack({
			delta: 1
		});
	};

	// 返回上一页
	const goBack = () => {
		if (currentStep.value > 0) {
			currentStep.value--;
		} else {
			uni.navigateBack();
		}
	};

	// 组件卸载时清除定时器
	watch(() => {
		return () => {
			if (timer) {
				clearInterval(timer);
			}
		};
	});

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
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: #f8f8f8;
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

	/* 步骤指示器 */
	.step-indicator {
		display: flex;
		justify-content: space-between;
		padding: 40rpx 60rpx;
		background-color: #fff;
		margin-bottom: 30rpx;
	}

	.step {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		flex: 1;
	}

	.step-circle {
		width: 60rpx;
		height: 60rpx;
		border-radius: 30rpx;
		background-color: #f5f5f5;
		border: 2rpx solid #ddd;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 10rpx;
		z-index: 2;
	}

	.step.active .step-circle {
		background-color: #e91e63;
		border-color: #e91e63;
	}

	.step.completed .step-circle {
		background-color: #4caf50;
		border-color: #4caf50;
	}

	.step-number {
		font-size: 28rpx;
		color: #999;
	}

	.step.active .step-number,
	.step.completed .step-check {
		color: #fff;
	}

	.step-label {
		font-size: 24rpx;
		color: #999;
	}

	.step.active .step-label,
	.step.completed .step-label {
		color: #333;
		font-weight: bold;
	}

	.step-line {
		position: absolute;
		top: 30rpx;
		right: -50%;
		width: 100%;
		height: 2rpx;
		background-color: #ddd;
		z-index: 1;
	}

	.step.active .step-line,
	.step.completed .step-line {
		background-color: #e91e63;
	}

	/* 表单容器 */
	.form-container {
		padding: 30rpx;
	}

	.step-title {
		margin-bottom: 40rpx;
	}

	.title-text {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 10rpx;
		display: block;
	}

	.subtitle-text {
		font-size: 28rpx;
		color: #666;
	}

	/* 表单项 */
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

	.verification {
		position: relative;
	}

	.verification-btn {
		background-color: #e91e63;
		color: white;
		padding: 10rpx 20rpx;
		border-radius: 8rpx;
		font-size: 24rpx;
	}

	.verification-btn.disabled {
		background-color: #ccc;
	}

	.verification-text {
		color: white;
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

	/* 密码强度 */
	.password-strength {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.strength-label {
		font-size: 26rpx;
		color: #666;
		margin-right: 10rpx;
	}

	.strength-meter {
		flex: 1;
		height: 10rpx;
		background-color: #f5f5f5;
		border-radius: 5rpx;
		overflow: hidden;
		margin-right: 10rpx;
	}

	.strength-bar {
		height: 100%;
		transition: width 0.3s;
	}

	.strength-bar.weak {
		background-color: #f44336;
	}

	.strength-bar.medium {
		background-color: #ff9800;
	}

	.strength-bar.strong {
		background-color: #4caf50;
	}

	.strength-text {
		font-size: 26rpx;
		color: #666;
	}

	/* 密码提示 */
	.password-tips {
		background-color: #f5f5f5;
		border-radius: 10rpx;
		padding: 20rpx;
		margin-bottom: 40rpx;
	}

	.tips-title {
		font-size: 26rpx;
		color: #666;
		font-weight: bold;
		margin-bottom: 10rpx;
		display: block;
	}

	.tips-item {
		font-size: 24rpx;
		color: #666;
		line-height: 1.6;
		display: block;
	}

	/* 按钮 */
	.next-button,
	.login-button {
		background-color: #e91e63;
		color: white;
		border-radius: 10rpx;
		padding: 20rpx 0;
		font-size: 32rpx;
		border: none;
		margin-top: 20rpx;
	}

	/* 成功页面 */
	.success-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 60rpx 30rpx;
	}

	.success-icon {
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
		background-color: #4caf50;
		color: white;
		font-size: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 30rpx;
	}

	.success-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 20rpx;
	}

	.success-message {
		font-size: 28rpx;
		color: #666;
		text-align: center;
		margin-bottom: 40rpx;
	}
</style>