// API基础URL
const BASE_URL = `http://localhost:8000/api/pets`

const AVATAR_BASE_URL = `${BASE_URL}/avatar/`

// 数据相关API
export const petsApi = {
	//按用户ID获取宠物
	getPetByUserId: (params) => {
		return uni.request({
			url: `${BASE_URL}`,
			method: 'GET',
			data: params
		})
	},
	
	// 查询数据
	getPetByPetId: (id) => {
		return uni.request({
			url: `${BASE_URL}/${id}`,
			method: 'GET'
		})
	},
	// 更新数据
	updatePet: (id, data) => {
		return uni.request({
			url: `${BASE_URL}/${id}`,
			method: 'PUT',
			data: data
		})
	},

	// 新增数据
	savePet: (data) => {
		return uni.request({
			url: `${BASE_URL}/`,
			method: 'POST',
			data: data
		})
	},

	// 上传宠物头像
	uploadAvatar: (pet_id,filePath) => {
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: `${BASE_URL}/${pet_id}/avatar`,
				filePath: filePath,
				name: 'file',
				success: (res) => {
					if (res.statusCode === 200) {
						resolve(JSON.parse(res.data))
					} else {
						reject(new Error('上传失败'))
					}
				},
				fail: (err) => {
					reject(err)
				}
			})
		})
	}
} 

export {
	AVATAR_BASE_URL,
} 