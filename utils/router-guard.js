import { useUserStore } from '../stores/user'


// 路由拦截器
export function setupRouterGuard() {
	// console.log('开始初始化路由拦截器')
	
	// 拦截页面跳转
	uni.addInterceptor('navigateTo', {
		invoke(e) {
			// console.log('拦截 navigateTo:', e.url)
			return checkLogin(e.url)
		}
	})
	
	uni.addInterceptor('redirectTo', {
		invoke(e) {
			// console.log('拦截 redirectTo:', e.url)
			return checkLogin(e.url)
		}
	})
	
	uni.addInterceptor('reLaunch', {
		invoke(e) {
			// console.log('拦截 reLaunch:', e.url)
			return checkLogin(e.url)
		}
	})
	
	uni.addInterceptor('switchTab', {
		invoke(e) {
			// console.log('拦截 switchTab:', e.url)
			return checkLogin(e.url)
		}
	})
	
	
	// console.log('路由拦截器初始化完成')
}

// 检查登录状态
function checkLogin(url) {
	// console.log('检查登录状态:', url)
	const userStore = useUserStore()
	
	// 检查是否是登录相关页面
	if (url.includes('/pages/login/')) {
		// console.log('是登录页面，允许访问')
		return true
	}
	
	// 如果不是登录页面且未登录，则跳转到登录页
	if (!userStore.isLoggedIn) {
		// console.log('未登录，跳转到登录页')
		uni.reLaunch({
			url: '/pages/login/index'
		})
		return false
	}
	
	// console.log('已登录，允许访问')
	return true
}