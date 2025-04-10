<template>
	<view class="container">
		<!-- 渐变标题栏 -->
		<view class="header">
			<text class="header-title">宠物AI助手</text>
		</view>

		<!-- 宠物档案区域 -->
		<view class="profile-header">
			<text class="profile-title">宠物档案</text>
			<navigator :url="'/pages/pet-profile/edit?id=' + petInfo.id" open-type="redirect"
				hover-class="other-navigator-hover">
				<view class="edit-button">
					<text class="edit-icon">✎</text>
					<text class="edit-text">编辑</text>
				</view>
			</navigator>
		</view>

		<!-- 宠物头像和名称 -->
		<view class="pet-info-header">
			<view class="avatar-container">
				<view class="avatar">
					<cover-image class="controls-pause img" :src="petInfo.img" @click="previewImage" />
					<!-- 这里可以放置实际的宠物头像 -->
				</view>
			</view>
			<view class="pet-name">{{petInfo.name}}</view>
			<view class="pet-breed">{{petInfo.breed}}</view>
		</view>

		<!-- 宠物详细信息 -->
		<view class="pet-details">
			<view class="detail-item">
				<text class="detail-label">宠物昵称</text>
				<text class="detail-value"> {{petInfo.name}}</text>
			</view>
			<view class="detail-item">
				<text class="detail-label">宠物种类</text>
				<text class="detail-value">{{petInfo.type}}</text>
			</view>
			<view class="detail-item">
				<text class="detail-label">品种</text>
				<text class="detail-value">{{petInfo.breed}}</text>
			</view>
			<view class="detail-item">
				<text class="detail-label">性别</text>
				<text class="detail-value">{{petInfo.gender}}</text>
			</view>
			<view class="detail-item">
				<text class="detail-label">出生日期</text>
				<text class="detail-value">{{petInfo.birthDate}}</text>
			</view>
			<view class="detail-item">
				<text class="detail-label">体重</text>
				<text class="detail-value">{{petInfo.weight}}</text>
			</view>
		</view>

		<!-- 底部导航栏 -->
		<view class="tab-bar">
			<view class="tab-item active">
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
			<view class="tab-item" @tap="navigateTo('/pages/my/index')">
				<view class="tab-icon">👤</view>
				<text class="tab-text">我的</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		useUserStore
	} from '../../stores/user'
	// import uni from '@dcloudio/uni-app';

	const userStore = useUserStore()
	const userInfo = ref(null)


	onMounted(() => {
		userInfo.value = userStore.userInfo
		console.log('用户信息:', userInfo.value.username)
	})
	// 响应式数据
	const petInfo = ref({
		id: 1,
		name: '豆豆1',
		type: '猫',
		breed: '英短',
		gender: '男',
		birthDate: '2022-05-15',
		weight: '4.5 kg',
		img: "https://n.sinaimg.cn/sinakd20116/160/w1440h1920/20231215/cf0e-e50a1b5a6503ef01228d42b14f51dcb3.jpg"
	});

	const navigateTo = (url) => {
		uni.navigateTo({
			url: url
		})
	}

	// 预览图片
	const previewImage = () => {
		uni.previewImage({
			urls: [petInfo.value.img],
			current: petInfo.value.img
		})
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: #f8f8f8;
		position: relative;
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

	/* 宠物档案标题区域 */
	.profile-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
	}

	.profile-title {
		font-size: 34rpx;
		font-weight: bold;
		color: #333;
	}

	.edit-button {
		display: flex;
		align-items: center;
	}

	.edit-icon {
		margin-right: 6rpx;
		font-size: 32rpx;
	}

	.edit-text {
		font-size: 28rpx;
		color: #666;
	}

	/* 宠物头像和名称 */
	.pet-info-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.avatar-container {
		margin-bottom: 20rpx;
	}

	.avatar {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		background-color: #eee;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.pet-name {
		font-size: 40rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}

	.pet-breed {
		font-size: 28rpx;
		color: #666;
	}

	/* 宠物详细信息 */
	.pet-details {
		background-color: #fff;
		border-radius: 20rpx;
		margin: 0 30rpx;
		overflow: hidden;
	}

	.detail-item {
		display: flex;
		justify-content: space-between;
		padding: 30rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.detail-item:last-child {
		border-bottom: none;
	}

	.detail-label {
		color: #666;
		font-size: 28rpx;
	}

	.detail-value {
		color: #333;
		font-size: 28rpx;
		font-weight: 500;
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

	.tab-item.active .tab-text {
		color: #ff6b81;
	}

	.tab-bar .tab-item.active {
		background-color: #fff5f8;
		box-shadow: 0 -4rpx 10rpx rgba(0, 0, 0, 0.05);
		position: relative;
	}
</style>