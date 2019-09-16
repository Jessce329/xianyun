export const state = () => {
  return {
    arr: [
      {
        departCity: '',
        departCode: '',
        destCity: '',
        destCode: '',
        departDate: ''
      }
    ]
  }
}

export const mutations = {
  setFlight (state, data) {
    state.arr.push(data)
  }
}
