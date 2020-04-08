import map3dServices from '@/services/map3d.service'
export default {
  namespaced: true,
  state: {
    currentProjectId: null,
    currentSchemeId: null,
    componentName: '',
    pointName: '',
    riskData: null, // 风险区数据
    noiseData: null, // 噪音数据
    creditData: null, // 置信度数据
    windMapData: null, // 风图谱数据
    windMapMinMax: null,
    measuredState: null, // 测量停止的状态
    drawState: null // 绘制停止的状态
  },
  getters: {},
  actions: {
    setDialog ({
      commit,
      state
    }, {
      componentName,
      id
    }) {
      if(id){
          commit('setComponents', null)
          commit('setComponents', componentName)
          commit('setPoint', id)
      }else{
          commit('setComponents', null)
          commit('setPoint', null)
      }
    },
    getRiskData ({
      commit,
      state
    }, {
      callback
    }) {
      if (state.riskData) {
        callback(state.riskData)
        return
      }

      map3dServices.getRiskData(state.currentSchemeId)
        .then(res => {
          if (!res) {
            callback(null)
            return
          }
          commit('riskData', res)
          callback(res)
        })
        .catch(() => {
          callback(null)
        })
    },
    getNoiseData ({
      commit,
      state
    }, {
      callback
    }) {
      if (state.noiseData) {
        callback(state.noiseData)
        return
      }

      map3dServices.getNoiseData(state.currentSchemeId)
        .then(res => {
          if (!res) {
            callback(null)
            return
          }
          commit('noiseData', res)
          callback(res)
        })
        .catch(() => {
          callback(null)
        })
    },
    getCreditData ({
      commit,
      state
    }, {
      callback
    }) {
      if (state.creditData) {
        callback(state.creditData)
        return
      }
      map3dServices.getCreditData(state.currentSchemeId)
        .then(res => {
          if (!res) {
            callback(null)
            return
          }
          commit('creditData', res)
          callback(res)
        })
        .catch(() => {
          callback(null)
        })
    },
    getWindMapData ({
      commit,
      state
    }, {
      callback
    }) {
      if (state.windMapData) {
        callback(state.windMapData)
        return
      }
      if (!state.currentProjectId || !state.currentSchemeId) return
      map3dServices.getWindMapData(state.currentProjectId, state.currentSchemeId)
        .then(res => {
          if (!res) {
            callback(null)
            return
          }
          commit('windMapData', res)
          callback(res)
        })
        .catch(() => {
          callback(null)
        })
    }
  },
  mutations: {
    currentProjectId (state, data) {
      state.currentProjectId = data
    },
    currentSchemeId (state, data) {
      state.currentSchemeId = data
    },
    riskData (state, data) {
      state.riskData = data
    },
    noiseData (state, data) {
      state.noiseData = data
    },
    creditData (state, data) {
      state.creditData = data
    },
    windMapData (state, data) {
      state.windMapData = data
    },
    setComponents (state, data) {
      state.componentName = data
    },
    setPoint (state, data) {
      state.pointName = data
    },
    windMapMinMax (state, data) {
      state.windMapMinMax = null
      state.windMapMinMax = data
    },
    measuredState (state, data) {
      state.measuredState = null
      state.measuredState = data
    },
    drawState (state, data) {
      state.drawState = null
      state.drawState = data
    }

  }
}
