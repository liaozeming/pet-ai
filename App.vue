<script>
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import { useUserStore } from './stores/user'
import { setupRouterGuard } from './utils/router-guard'

export function createApp() {
	const app = createSSRApp(App)
	const pinia = createPinia()
	app.use(pinia)

	
	// 在应用启动时就检查登录状态
	const userStore = useUserStore()
	userStore.initUserInfo()
	
	// 如果未登录，直接跳转到登录页
	if (!userStore.isLoggedIn) {
		uni.reLaunch({
			url: '/pages/login/index'
		})
	}
	
	return {
		app
	}
}

export default {
	onLaunch: function() {
		console.log('App Launch')
		// 在onLaunch中初始化路由拦截器
		setupRouterGuard()
	},
	onShow: function() {
		// console.log('App Show')
		// // 在onShow中检查登录状态
		// const userStore = useUserStore()
		// const pages = getCurrentPages()
		// const currentPage = pages[pages.length - 1]
		// if (currentPage && !currentPage.route.includes('login') && !userStore.isLoggedIn) {
		// 	console.log('未登录，跳转到登录页')
		// 	uni.reLaunch({
		// 		url: '/pages/login/index'
		// 	})
		// }
	},
	onLoad: function() {
		// console.log('App Load')
		// // 在onLoad中检查登录状态
		// const userStore = useUserStore()
		// const pages = getCurrentPages()
		// const currentPage = pages[pages.length - 1]
		// if (currentPage && !currentPage.route.includes('login') && !userStore.isLoggedIn) {
		// 	console.log('未登录，跳转到登录页')
		// 	uni.reLaunch({
		// 		url: '/pages/login/index'
		// 	})
		// }
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style>
	/*每个页面公共css */
	page {
		background-color: #f8f8f8;
	}
</style>
