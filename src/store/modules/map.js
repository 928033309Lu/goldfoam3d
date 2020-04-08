import gwmap from '../../gwmap'

export default {
  namespaced: true,
  state: {

  },
  actions: {
    setFeatureHighLight ({
      commit,
      state
    }, {
      type,
      id,
      highlight = true
    }) {
      gwmap.dataManager.setFeatureHighLight(type, id, highlight)
    },
    locat2Feature ({
      commit,
      state
    }, {
      type,
      ids
    }) {
      gwmap.dataManager.locat2FeatureByIds(type, ids)
    }
  },
  mutations: {}

}
