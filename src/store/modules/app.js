export default {
  namespaced: true,
  state: {
    screenSize: [0, 0], // 当前页面区域宽度、高度
    currentMapControl: null, // 当前激活的地图操作控件
    globeLoading: false // 全局loading
  },
  actions: {

  },
  mutations: {
    screenSize (state, screenSize) {
      state.screenSize = screenSize
    },
    currentMapControl (state, currentMapControl) {
      state.currentMapControl = currentMapControl
    },
    globeLoading (state, loading) {
      state.globeLoading = loading
    }

  }

}
