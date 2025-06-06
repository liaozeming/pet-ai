<template>
	<view class="container">
		<!-- 渐变标题栏 -->
		<view class="header">
			<text class="header-title">宠物AI助手</text>
		</view>

		<!-- 宠物档案区域 -->
		<view class="profile-header">
			<text class="profile-title">宠物档案</text>
			<view class="save-button" @tap="handleSave">
				<text class="save-text">保存</text>
			</view>
		</view>

		<!-- 宠物头像和名称 -->
		<view class="pet-info-header">
			<view class="avatar-container" @tap="chooseImage">
				<view class="avatar">
					<image v-if="petImgShow" class="avatar-image" :src="petImgShow" mode="aspectFill"></image>
					<view v-else class="camera-icon">
						<text class="icon">📷</text>
					</view>
				</view>
			</view>
			<view class="pet-name">{{ petInfo.name }}</view>
			<view class="pet-breed"> {{ petInfo.type }} · {{petInfo.breed}}</view>
		</view>

		<!-- 宠物详细信息表单 -->
		<view class="pet-form">
			<view class="form-row">
				<view class="form-item">
					<text class="form-label">宠物昵称</text>
					<input class="form-input" style="height: 35px;" v-model="petInfo.name" placeholder="请输入宠物昵称" />
				</view>
				<view class="form-item">
					<text class="form-label">宠物种类</text>
					<view class="form-select">
						<picker @change="handleTypeChange" :value="typeIndex" :range="petTypes">
							<view class="picker-value">
								{{ petInfo.type }}
								<text class="arrow-icon">▼</text>
							</view>
						</picker>
					</view>
				</view>
			</view>

			<view class="form-row">
				<view class="form-item">
					<text class="form-label">品种</text>
					<input class="form-input" style="height: 35px;" v-model="petInfo.breed" placeholder="请输入品种" />
				</view>
				<view class="form-item">
					<text class="form-label">性别</text>
					<view class="form-select">
						<picker @change="handleGenderChange" :value="genderIndex" :range="genders">
							<view class="picker-value">
								{{ petInfo.gender }}
								<text class="arrow-icon">▼</text>
							</view>
						</picker>
					</view>
				</view>
			</view>

			<view class="form-row">
				<view class="form-item">
					<text class="form-label">出生日期</text>
					<view class="form-date">
						<picker mode="date" :value="petInfo.birthDate" @change="handleDateChange">
							<view class="picker-value">
								{{ formatDate(petInfo.birthDate) }}
								<text class="calendar-icon">📅</text>
							</view>
						</picker>
					</view>
				</view>
				<view class="form-item">
					<text class="form-label">体重 (kg)</text>
					<input class="form-input" style="height: 35px;" v-model="petInfo.weight" type="digit"
						placeholder="请输入体重" />
				</view>
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
		computed
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		petsApi,
		AVATAR_BASE_URL
	} from '@/api/pets.js'

import {useUserStore} from '../../stores/user'


const userStore = useUserStore()
const userInfo = ref(null)
	// 响应式数据
	const petInfo = ref({
		name: '',
		type: '', // 设置默认值
		breed: '',
		gender: '', // 设置默认值
		birthDate: '',
		weight: ''
	});

	// 选择器数据
	const petTypes = ['猫', '狗', '兔子', '仓鼠', '其他'];
	const typeIndex = ref(0); // 改为ref类型

	const genders = ['公', '母'];
	const genderIndex = ref(0); // 改为ref类型
	const petId = ref()
	const petImgShow = ref()
	
	
	// 方法
	const formatDate = (dateStr) => {
		if (!dateStr) return '';
		return dateStr.replace(/-/g, '/');
	};

	const handleTypeChange = (e) => {
		const index = e.detail.value;
		typeIndex.value = index;
		petInfo.value.type = petTypes[index];
	};

	const handleGenderChange = (e) => {
		const index = e.detail.value;
		genderIndex.value = index;
		petInfo.value.gender = genders[index];
	};

	const handleDateChange = (e) => {
		petInfo.value.birthDate = e.detail.value;
	};

	const chooseImage = () => {
		uni.chooseImage({
			count: 1,
			sizeType: ['compressed'],
			sourceType: ['album', 'camera'],
			success: async (res) => {
				const tempFilePath = res.tempFilePaths[0]
				try {
					// 显示加载提示
					uni.showLoading({
						title: '上传中...'
					})
					
					// 上传图片
					const uploadRes = await petsApi.uploadAvatar(petId.value? petId.value:'9446eb11-32b3-4425-aa4c-2a4a4c937620' ,tempFilePath)
					
					// 更新宠物信息中的图片URL
					petImgShow.value = AVATAR_BASE_URL + uploadRes.avatar_url
					petInfo.value.img =  uploadRes.avatar_url
			
					uni.hideLoading()
					uni.showToast({
						title: '上传成功',
						icon: 'success'
					})
				} catch (err) {
					uni.hideLoading()
					uni.showToast({
						title: '上传失败',
						icon: 'error'
					})
					console.error('上传失败:', err)
				}
			}
		})
	}

	const navigateTo = (url) => {
		uni.navigateTo({
			url: url
		})
	}

	const handleSave = () => {
		// 这里可以添加表单验证逻辑
		console.log(petId.value)
		console.log("typeof petId.value  !== 'undefined' :", typeof petId.value !== 'undefined')
		if (typeof petId.value !== 'undefined' && petId.value !== null) {
			updatePet(petId.value)
		} else {
			savePet()
		}


		//  // 保存宠物信息到本地存储
		//  uni.setStorageSync('petInfo', JSON.stringify(petInfo.value));
		// 显示保存成功提示
		uni.showToast({
			title: '保存成功',
			icon: 'success',
			duration: 2000
		});

		// 延迟跳转到首页
		setTimeout(() => {
			uni.navigateTo({
				url: '/pages/pet-profile/index'
			})
		}, 1000);
	};

	const getPetByUserId = (pet_id) => {
		petsApi.getPetByPetId(pet_id).then(res => {
			console.log("res:", res)
			console.log("res.data:", res.data)

			// 检查res.data是否存在且不为空
			if (!res || !res.data) {
				console.log("未获取到宠物数据")
				uni.showToast({
					title: '未找到宠物信息',
					icon: 'none'
				})
				return
			}

			const petData = res.data
			// 检查petData是否包含必要的字段
			if (!petData.pet_id || !petData.name) {
				console.log("宠物数据不完整")
				uni.showToast({
					title: '宠物信息不完整',
					icon: 'none'
				})
				return
			}

			// 数据完整，进行赋值
			petInfo.value = {
				id: petData.pet_id,
				name: petData.name,
				type: petData.type || '猫', // 设置默认值
				breed: petData.breed || '', // 设置默认值
				gender: petData.gender || '公', // 设置默认值
				birthDate: petData.birth_date || '',
				weight: petData.weight || '',
				img: petData.avatar_url || ''
			}
			
			petImgShow.value = AVATAR_BASE_URL + petInfo.value.img || ''

			// 设置选择器的初始值
			typeIndex.value = petTypes.indexOf(petData.type) >= 0 ? petTypes.indexOf(petData.type) : 0
			genderIndex.value = genders.indexOf(petData.gender) >= 0 ? genders.indexOf(petData.gender) : 0

		}).catch(err => {
			console.error("请求错误:", err)
			uni.showToast({
				title: '查询失败',
				icon: 'none'
			})
		})
	}

	const savePet = () => {
		petsApi.savePet( {
			user_id: userInfo.value.username,
			name: petInfo.value.name,
			type: petInfo.value.type,
			breed: petInfo.value.breed,
			gender: petInfo.value.gender,
			birth_date: petInfo.value.birthDate,
			weight: parseFloat(petInfo.value.weight),
			avatar_url: petInfo.value.img
		}).then(res => {
			uni.showToast({
				title: '保存成功',
				icon: 'success'
			})
		}).catch(err => {
			uni.showToast({
				title: '保存失败',
				icon: 'error'
			})
		})
		
	}

	const updatePet = (pet_Id) => {
		petsApi.updatePet(pet_Id, {
			user_id: userInfo.value.username,
			name: petInfo.value.name,
			type: petInfo.value.type,
			breed: petInfo.value.breed,
			gender: petInfo.value.gender,
			birth_date: petInfo.value.birthDate,
			weight: parseFloat(petInfo.value.weight),
			avatar_url: petInfo.value.img
		}).then(res => {
			uni.showToast({
				title: '更新成功',
				icon: 'success'
			})
		}).catch(err => {
			uni.showToast({
				title: '更新失败',
				icon: 'error'
			})
		})
	}

	// 生命周期钩子  路由跳转获取id
	onLoad((option) => {
		userInfo.value = userStore.userInfo
		console.log('用户信息edit:', userInfo.value.username)
		if (option.pet_id !== 'undefined' && option.pet_id !== null) {
			getPetByUserId(option.pet_id)
			petId.value = option.pet_id
		}
	});

	// onMounted(() => {
	//     userInfo.value = userStore.userInfo
	//     console.log('用户信息edit:', userInfo.value.username)
	// })
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

	.save-button {
		background-color: #e91e63;
		color: white;
		padding: 12rpx 30rpx;
		border-radius: 8rpx;
	}

	.save-text {
		font-size: 28rpx;
		color: white;
	}

	/* 宠物头像和名称 */
	.pet-info-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 40rpx;
	}

	.avatar-container {
		margin-bottom: 20rpx;
		position: relative;
	}

	.avatar {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		background-color: #eee;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.avatar-image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.camera-icon {
		position: absolute;
		right: 0;
		bottom: 0;
		background-color: #fff;
		width: 50rpx;
		height: 50rpx;
		border-radius: 25rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
	}

	.icon {
		font-size: 30rpx;
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

	/* 宠物详细信息表单 */
	.pet-form {
		background-color: #fff;
		border-radius: 20rpx;
		margin: 0 30rpx;
		padding: 20rpx;
	}

	.form-row {
		display: flex;
		margin-bottom: 20rpx;
	}

	.form-item {
		flex: 1;
		padding: 10rpx;
	}

	.form-label {
		font-size: 28rpx;
		color: #333;
		margin-bottom: 15rpx;
		display: block;
	}

	.form-input {
		border: 1px solid #e0e0e0;
		border-radius: 8rpx;
		padding: 15rpx;
		font-size: 28rpx;
		width: 100%;
		box-sizing: border-box;
	}

	.form-select,
	.form-date {
		border: 1px solid #e0e0e0;
		border-radius: 8rpx;
		padding: 15rpx;
		font-size: 28rpx;
		width: 100%;
		box-sizing: border-box;
	}

	.picker-value {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.arrow-icon,
	.calendar-icon {
		color: #999;
		font-size: 24rpx;
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
</style>