import {
  CesiumConfig
} from '@/config/map-config'
import {
  proj4To84
} from '@/core/proj-util'
import MapManager from './cesium/map-manager'
import MapControlManager from './cesium/map-control-manager'
import mapStatusBar from './components/map-statusbar'
import dataManager from './cesium/data-manager'
import layerManager from './cesium/layer-manager'
import noiseLayer from './cesium/noise-layer'
import windMap from './cesium/wind-map-layer'
import store from '../store/index'
import request from '@/api'
const gwmap = {}
gwmap.dataManager = dataManager
gwmap.layerManager = layerManager
gwmap.noiseLayer = noiseLayer
gwmap.windMap = windMap
gwmap.mapManager = null
gwmap.mapControlManager = null

gwmap.schemeEPSG = null // 方案EPSG

gwmap.init = function (elementId, options = {}) {
  if (!elementId) {
    return
  }

  gwmap.mapManager = new MapManager(elementId, CesiumConfig)
  gwmap.viewer = gwmap.mapManager.viewer

  gwmap.mapControlManager = new MapControlManager(gwmap.mapManager.viewer, {
    activeChange: () => {}
    // ,measureProfileCallback: (positions) => {
    //   store.commit('app/profilePoints', positions)
    // }
  })
}

gwmap.loadMapComponents = function (elementId) {
  if (!elementId) {
    return
  }

  // 加载地图状态栏
  document.getElementById(elementId).appendChild(mapStatusBar.element)
  mapStatusBar.init(gwmap.mapManager.viewer)
}

gwmap.dataManager.featureClicked = (type, id) => {
  switch (type) {
    case 'turbine':
      store.dispatch('project/setDialog', {
        componentName: 'fan-view-panel',
        id
      })
      break
    case 'mast':
      store.dispatch('project/setDialog', {
        componentName: 'tower-view-panel',
        id
      })
      break
  }
}

gwmap.proj4To84 = function (x, y) {
  return proj4To84(gwmap.schemeEPSG, [x, y])
}

// 获取高程信息
gwmap.getPositionByXYZ = function (items, callback) {
  if (!items) {
    callback(false)
    return
  }

  const points = []
  items.forEach((item) => {
    item._position = gwmap.proj4To84(item.x, item.y)
    item._position.push(item.z)
    points.push(item._position)
  })

  request.getElevation2(points, (res) => {
    if (!res || !res.data || !res.data.features) {
      console.error('获取坐标高程出错！')
      callback(true)
      return
    }
    res.data.features.forEach(item => {
      const point = points.find(p => p[0] === item.geometry.coordinates[0] && p[1] === item.geometry.coordinates[1])
      if (!point) return
      point[2] = item.properties.altitude
    })
    callback(true)
  })

  // 1. 使用getElevation获取高程  有问题
  // let count = 0
  // items.forEach(item => {
  //   item._position = gwmap.proj4To84(item.x, item.y)
  //   request.getElevation(item._position[0], item._position[1], (res) => {
  //     // console.log(`${item.tag}|  ${res && res.data && res.data.elevation}|   |${item.z}`)
  //     const z = res && res.data && res.data.elevation || item.z
  //     // z -= 10 // todo:风机高度统一减10 临时解决风机离地的问题
  //     item._position.push(z)
  //     count++
  //     if (count === items.length) {
  //       callback(true)
  //     }
  //   })
  // })

  // 2. 使用彭颖霞提供的三维方法前端获取高程  对风图谱有问题
  // const points = []
  // items.forEach((item) => {
  //   item._position = gwmap.proj4To84(item.x, item.y)
  //   item._position.push(0)
  //   points.push(item._position)
  // })
  // const samplePromise = new WindEarth.TerrainSampleTool(gwmap.mapManager.viewer.terrainProvider).getMostDetailHeights(points)
  // samplePromise.then((positions) => {
  //   callback(true)
  // })
}

export default gwmap
