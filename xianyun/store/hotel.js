// 酒店存储数据

export const state = () => {
  return {
    // 所有城市 酒店信息
    AllHotel: [],
    CityId: 0
  }
}

export const mutations = {
  setAllHotel (state, data) {
    state.AllHotel = data
  },
  setCityId (state, id) {
    state.CityId = id
  }
}
