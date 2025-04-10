import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
	state: () => ({
		userInfo: null
	}),
	
	actions: {
		setUserInfo(userInfo) {
			this.userInfo = userInfo
			// 保存到本地存储
			uni.setStorageSync('userInfo', userInfo)
		},
		
		clearUserInfo() {
			console.log('清除用户信息')
			this.userInfo = null
			uni.removeStorageSync('userInfo')
		},
		
		// 退出登录
		logout() {
			this.clearUserInfo()
			// 直接跳转到登录页
			uni.reLaunch({
				url: '/pages/login/index'
			})
		},
		
		// 初始化时从本地存储加载用户信息
		initUserInfo() {
			try {
				const userInfo = uni.getStorageSync('userInfo')
				if (userInfo) {
					this.userInfo = userInfo
					console.log('已加载用户信息:', userInfo)
				} else {
					console.log('未找到用户信息')
				}
			} catch (e) {
				console.error('读取用户信息失败:', e)
			}
		}
	},
	
	getters: {
		isLoggedIn: (state) => {
			const isLogin = !!state.userInfo && !!state.userInfo.token
			console.log('登录状态:', isLogin)
			return isLogin
		}
	}
}) 