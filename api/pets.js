// API基础URL
const BASE_URL = 'http://localhost:8000/api/pets'

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
	
} 