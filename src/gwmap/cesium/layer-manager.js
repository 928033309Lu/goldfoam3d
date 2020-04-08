import ImageLayerGroup from '@/core/cesium/image-layer-group'
import {
  loadLayerByConfig
} from '@/core/cesium/layer-config-util'

const layerManager = {}
let serviceLayerGroup = null
const layerDist = {}

// 添加服务图层
layerManager.loadServiceLayer = function (layerData) {
  if (!layerData || layerDist.hasOwnProperty(layerData.layerId)) return
  if (!serviceLayerGroup) {
    serviceLayerGroup = new ImageLayerGroup(gwmap.mapManager.viewer)
    serviceLayerGroup.bringToBack()
  }

  const layer = loadLayerByConfig(layerData)
  if (!layer) {
    return
  }
  serviceLayerGroup.addLayer(layer)
  layerDist[layerData.layerId] = layer
}

// 移除服务图层
layerManager.removeServiceLayer = function (layerData) {
  if (!layerData || !layerDist.hasOwnProperty(layerData.layerId)) return

  serviceLayerGroup.removeLayer(layerDist[layerData.layerId])
  delete layerDist[layerData.layerId]
}

export default layerManager
