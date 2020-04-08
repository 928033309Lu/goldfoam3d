import { callbackify } from "util";
import store from '../../store/index'
const windMap = {}

let windMapVtkModule = null
let promise = null

windMap.loadWindMap = function (opacity = 0.6) {
  windMap.remove()
  windMapVtkModule = new WindEarth.WindMapVtkModule(gwmap.viewer, { brightless: 1.5, opacity: opacity })
}

windMap.addWindMap = function (data) {
  if (!data.url) {
    return
  }
  if (!windMapVtkModule) {
    return
  }
  promise = windMapVtkModule.loadWindMapByLodWithHeight(data.url, data.positions, 0)
  promise.then(res => {
    store.commit('project/windMapMinMax', res)
  })
}

windMap.remove = function () {
  if (windMapVtkModule) {
    windMapVtkModule.removeAll(true)
    windMapVtkModule = null
  }
}

export default windMap
