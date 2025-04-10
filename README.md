# pet-ai

## 项目部署运行

1.下载hbuilder软件，将该项目导入其中
[hbuilderx](https://www.dcloud.io/hbuilderx.html)

2.点击运行即可

![1744283304976](.\static\img\1744283304976.jpg)

3.如果是小程序需要下载微信开发者工具





## 目录说明

- api     请求接口目录

- pages  页面目录

​     	-- daily-record   日常记录

​         -- emotion          情感 

​         -- login                 登录注册

​         -- pet-profile       首页

​        -- weekly-report   周报

- static  静态图片

- stores 存储

​	   --  user.js 用户登录信息

- utils 工具包

​	 -- router-guard.js 路由拦截



APP.vue       启动页

index.html   初始化页面

main.js          配置信息

pages.json   页面注册





## 前端页面

![logined](.\static\img\logined.jpg)

 

![login](.\static\img\login.jpg)



## 其他链接

[vue官网](https://cn.vuejs.org/guide/introduction)

[uniapp官网](https://uniapp.dcloud.net.cn/tutorial/vue3-basics.html)

[微信小程序开发](https://developers.weixin.qq.com/miniprogram/dev/framework/)





## 前后端交互Demo

[前端api demo](https://git.nju.edu.cn/liaozeming/app-api-demo)

![apiDemo](.\static\img\apiDemo.jpg)

api/index.js

```
// API基础URL
const BASE_URL = 'http://localhost:8899/uni'

// 数据相关API
export const dataApi = {
	// 新增数据
	create: (data) => {
		return uni.request({
			url: `${BASE_URL}/data`,
			method: 'POST',
			data: data
		})
	},
	
	// 查询数据
	read: (id) => {
		return uni.request({
			url: `${BASE_URL}/data/${id}`,
			method: 'GET'
		})
	},
	
	// 更新数据
	update: (id, data) => {
		return uni.request({
			url: `${BASE_URL}/data/${id}`,
			method: 'PUT',
			data: data
		})
	},
	
	// 删除数据
	delete: (id) => {
		return uni.request({
			url: `${BASE_URL}/data/${id}`,
			method: 'DELETE'
		})
	},
	
	// 使用query参数查询数据列表
	getList: (params) => {
		return uni.request({
			url: `${BASE_URL}/data/list`,
			method: 'GET',
			data: params
		})
	}
}

```
pages/api/api.vue
```
<template>
	<view class="content">
		<text class="title">API中心页面</text>
		
		<!-- API操作按钮 -->
		<view class="api-buttons">
			<button class="api-btn" @click="handleCreate">新增数据</button>
			<button class="api-btn" @click="handleRead">查询数据</button>
			<button class="api-btn" @click="handleUpdate">更新数据</button>
			<button class="api-btn" @click="handleDelete">删除数据</button>
			<button class="api-btn" @click="handleGetList">查询列表</button>
		</view>
		
		<!-- 底部导航栏 -->
		<view class="tab-bar">
			<view class="tab-item" @click="navigateTo('/pages/index/index')">
				<text class="tab-text">首页</text>
			</view>
			<view class="tab-item" @click="navigateTo('/pages/api/api')">
				<text class="tab-text">API中心</text>
			</view>
			<view class="tab-item" @click="navigateTo('/pages/my/my')">
				<text class="tab-text">我的</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { dataApi } from '@/api/index.js'

const navigateTo = (url) => {
	uni.navigateTo({
		url: url
	})
}

// 新增数据
const handleCreate = () => {
	dataApi.create({
		name: '测试数据',
		age: '25',
		description: '这是一条测试数据'
	}).then(res => {
		uni.showToast({
			title: '新增成功',
			icon: 'success'
		})
	}).catch(err => {
		uni.showToast({
			title: '新增失败',
			icon: 'error'
		})
	})
}

// 查询数据
const handleRead = () => {
	dataApi.read(1).then(res => {
		uni.showToast({
			title: '查询成功',
			icon: 'success'
		})
		console.log('查询结果：', res.data)
	}).catch(err => {
		uni.showToast({
			title: '查询失败',
			icon: 'error'
		})
	})
}

// 更新数据
const handleUpdate = () => {
	dataApi.update(1, {
		name: '更新后的数据',
		age: 26,
		description: '这是更新后的测试数据'
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

// 删除数据
const handleDelete = () => {
	dataApi.delete(1).then(res => {
		uni.showToast({
			title: '删除成功',
			icon: 'success'
		})
	}).catch(err => {
		uni.showToast({
			title: '删除失败',
			icon: 'error'
		})
	})
}

// 查询数据列表
const handleGetList = () => {
	dataApi.getList({
		page: 1,
		pageSize: 10,
		keyword: '测试',
		status: 1
	}).then(res => {
		uni.showToast({
			title: '查询成功',
			icon: 'success'
		})
		console.log('列表数据：', res.data)
	}).catch(err => {
		uni.showToast({
			title: '查询失败',
			icon: 'error'
		})
	})
}
</script>
```

2. 因为宠物需要特定的id,需要根据用户获取特定的宠物，增加用户登录页面



vue中 获取用户信息

```
const userStore = useUserStore()
const userInfo = ref(null)


onMounted(() => {
    userInfo.value = userStore.userInfo
    console.log('用户信息:', userInfo.value.username)
})
```
