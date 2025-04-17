"use strict";
const common_vendor = require("../../common/vendor.js");
const api_pets = require("../../api/pets.js");
const stores_user = require("../../stores/user.js");
const _sfc_main = {
  __name: "edit",
  setup(__props) {
    const userStore = stores_user.useUserStore();
    const userInfo = common_vendor.ref(null);
    const petInfo = common_vendor.ref({
      name: "",
      type: "",
      // 设置默认值
      breed: "",
      gender: "",
      // 设置默认值
      birthDate: "",
      weight: ""
    });
    const petTypes = ["猫", "狗", "兔子", "仓鼠", "其他"];
    const typeIndex = common_vendor.ref(0);
    const genders = ["公", "母"];
    const genderIndex = common_vendor.ref(0);
    const petId = common_vendor.ref();
    const petImgShow = common_vendor.ref();
    const formatDate = (dateStr) => {
      if (!dateStr)
        return "";
      return dateStr.replace(/-/g, "/");
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
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: async (res) => {
          const tempFilePath = res.tempFilePaths[0];
          try {
            common_vendor.index.showLoading({
              title: "上传中..."
            });
            const uploadRes = await api_pets.petsApi.uploadAvatar(petId.value ? petId.value : "9446eb11-32b3-4425-aa4c-2a4a4c937620", tempFilePath);
            petImgShow.value = api_pets.AVATAR_BASE_URL + uploadRes.avatar_url;
            petInfo.value.img = uploadRes.avatar_url;
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "上传成功",
              icon: "success"
            });
          } catch (err) {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              title: "上传失败",
              icon: "error"
            });
            common_vendor.index.__f__("error", "at pages/pet-profile/edit.vue:205", "上传失败:", err);
          }
        }
      });
    };
    const navigateTo = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    const handleSave = () => {
      common_vendor.index.__f__("log", "at pages/pet-profile/edit.vue:219", petId.value);
      common_vendor.index.__f__("log", "at pages/pet-profile/edit.vue:220", "typeof petId.value  !== 'undefined' :", typeof petId.value !== "undefined");
      if (typeof petId.value !== "undefined" && petId.value !== null) {
        updatePet(petId.value);
      } else {
        savePet();
      }
      common_vendor.index.showToast({
        title: "保存成功",
        icon: "success",
        duration: 2e3
      });
      setTimeout(() => {
        common_vendor.index.navigateTo({
          url: "/pages/pet-profile/index"
        });
      }, 1e3);
    };
    const getPetByUserId = (pet_id) => {
      api_pets.petsApi.getPetByPetId(pet_id).then((res) => {
        common_vendor.index.__f__("log", "at pages/pet-profile/edit.vue:247", "res:", res);
        common_vendor.index.__f__("log", "at pages/pet-profile/edit.vue:248", "res.data:", res.data);
        if (!res || !res.data) {
          common_vendor.index.__f__("log", "at pages/pet-profile/edit.vue:252", "未获取到宠物数据");
          common_vendor.index.showToast({
            title: "未找到宠物信息",
            icon: "none"
          });
          return;
        }
        const petData = res.data;
        if (!petData.pet_id || !petData.name) {
          common_vendor.index.__f__("log", "at pages/pet-profile/edit.vue:263", "宠物数据不完整");
          common_vendor.index.showToast({
            title: "宠物信息不完整",
            icon: "none"
          });
          return;
        }
        petInfo.value = {
          id: petData.pet_id,
          name: petData.name,
          type: petData.type || "猫",
          // 设置默认值
          breed: petData.breed || "",
          // 设置默认值
          gender: petData.gender || "公",
          // 设置默认值
          birthDate: petData.birth_date || "",
          weight: petData.weight || "",
          img: petData.avatar_url || ""
        };
        petImgShow.value = api_pets.AVATAR_BASE_URL + petInfo.value.img || "";
        typeIndex.value = petTypes.indexOf(petData.type) >= 0 ? petTypes.indexOf(petData.type) : 0;
        genderIndex.value = genders.indexOf(petData.gender) >= 0 ? genders.indexOf(petData.gender) : 0;
      }).catch((err) => {
        common_vendor.index.__f__("error", "at pages/pet-profile/edit.vue:290", "请求错误:", err);
        common_vendor.index.showToast({
          title: "查询失败",
          icon: "none"
        });
      });
    };
    const savePet = () => {
      api_pets.petsApi.savePet({
        user_id: userInfo.value.username,
        name: petInfo.value.name,
        type: petInfo.value.type,
        breed: petInfo.value.breed,
        gender: petInfo.value.gender,
        birth_date: petInfo.value.birthDate,
        weight: parseFloat(petInfo.value.weight),
        avatar_url: petInfo.value.img
      }).then((res) => {
        common_vendor.index.showToast({
          title: "保存成功",
          icon: "success"
        });
      }).catch((err) => {
        common_vendor.index.showToast({
          title: "保存失败",
          icon: "error"
        });
      });
    };
    const updatePet = (pet_Id) => {
      api_pets.petsApi.updatePet(pet_Id, {
        user_id: userInfo.value.username,
        name: petInfo.value.name,
        type: petInfo.value.type,
        breed: petInfo.value.breed,
        gender: petInfo.value.gender,
        birth_date: petInfo.value.birthDate,
        weight: parseFloat(petInfo.value.weight),
        avatar_url: petInfo.value.img
      }).then((res) => {
        common_vendor.index.showToast({
          title: "更新成功",
          icon: "success"
        });
      }).catch((err) => {
        common_vendor.index.showToast({
          title: "更新失败",
          icon: "error"
        });
      });
    };
    common_vendor.onLoad((option) => {
      userInfo.value = userStore.userInfo;
      common_vendor.index.__f__("log", "at pages/pet-profile/edit.vue:348", "用户信息edit:", userInfo.value.username);
      if (option.pet_id !== "undefined" && option.pet_id !== null) {
        getPetByUserId(option.pet_id);
        petId.value = option.pet_id;
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleSave),
        b: petImgShow.value
      }, petImgShow.value ? {
        c: petImgShow.value
      } : {}, {
        d: common_vendor.o(chooseImage),
        e: common_vendor.t(petInfo.value.name),
        f: common_vendor.t(petInfo.value.type),
        g: common_vendor.t(petInfo.value.breed),
        h: petInfo.value.name,
        i: common_vendor.o(($event) => petInfo.value.name = $event.detail.value),
        j: common_vendor.t(petInfo.value.type),
        k: common_vendor.o(handleTypeChange),
        l: typeIndex.value,
        m: petTypes,
        n: petInfo.value.breed,
        o: common_vendor.o(($event) => petInfo.value.breed = $event.detail.value),
        p: common_vendor.t(petInfo.value.gender),
        q: common_vendor.o(handleGenderChange),
        r: genderIndex.value,
        s: genders,
        t: common_vendor.t(formatDate(petInfo.value.birthDate)),
        v: petInfo.value.birthDate,
        w: common_vendor.o(handleDateChange),
        x: petInfo.value.weight,
        y: common_vendor.o(($event) => petInfo.value.weight = $event.detail.value),
        z: common_vendor.o(($event) => navigateTo("/pages/daily-record/index")),
        A: common_vendor.o(($event) => navigateTo("/pages/emotion/index")),
        B: common_vendor.o(($event) => navigateTo("/pages/weekly-report/index")),
        C: common_vendor.o(($event) => navigateTo("/pages/my/index"))
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/pet-profile/edit.js.map
