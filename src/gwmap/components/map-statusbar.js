import request from '@/api'
import util from '@/utils'

// 地图状态栏组件
const mapStatusBar = {}
mapStatusBar.element = document.createElement('div')
mapStatusBar.element.id = 'map-status-bar'
mapStatusBar.element.classList.add('map-status-bar')

let cesiumWidgetsFunc = null
let getElevationTimer = null
/**
 * 组件入口
 */
mapStatusBar.init = function (viewer) {
  if (!viewer) return
  // 三维地图
  if (!cesiumWidgetsFunc) {
    cesiumWidgetsFunc = new WindEarth.WidgetsFunc(viewer)
    cesiumWidgetsFunc.bindStatusInfoFunc(infos => {
      if (infos) {
        updateStatus(infos.longitude, infos.latitude, infos.cameraHeight)
      } else {
        updateStatus()
      }
    })
  }
}

/**
 * 更新地图状态栏信息
 * @param {*} lon
 * @param {*} lat
 * @param {*} cameraHeight
 */
const updateStatus = function (lon, lat, cameraHeight) {
  if (getElevationTimer) {
    clearTimeout(getElevationTimer)
  }
  if (!lon && !lat && !cameraHeight) {
    mapStatusBar.element.innerHTML = ''
    return
  }
  mapStatusBar.element.innerHTML = `<span>经度：</span>${util.formater.formatNumber(lon)}° <span>纬度：</span>${util.formater.formatNumber(lat)}° ${cameraHeight ? `<span>视角高度：</span>${cameraHeight}m` : ''}`

  // 延迟获取高程和投影坐标，减少不必要的请求或转换次数
  getElevationTimer = setTimeout(() => {
    request.getElevation(lon, lat, (res) => {
      const height = res && res.data && res.data.elevation
      if (height < 0) return
      mapStatusBar.element.innerHTML += `<span>海拔：</span>${height}m`
    })
  }, 500)
}

export default mapStatusBar
