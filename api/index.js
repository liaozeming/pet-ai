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

// 文件上传相关API
export const uploadApi = {
	// 上传图片
	uploadImage: (filePath, options = {}) => {
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: `${BASE_URL}/upload/image`,
				filePath: filePath,
				name: 'file',
				formData: {
					process: true, // 表示需要服务端处理
					width: options.width || 800, // 处理后的图片宽度
					height: options.height || 800, // 处理后的图片高度
					quality: options.quality || 80, // 图片质量
					format: options.format || 'jpeg' // 输出格式
				},
				success: (res) => {
					const data = JSON.parse(res.data)
					if (data.code === 0) {
						resolve(data)
					} else {
						reject(new Error(data.message || '上传失败'))
					}
				},
				fail: (err) => {
					reject(err)
				}
			})
		})
	}
} 