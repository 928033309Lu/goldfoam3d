import {
  CesiumConfig
} from '@/config/map-config'
import ImageLayerGroup from '@/core/cesium/image-layer-group'
import {
  loadLayerByConfig
} from '@/core/cesium/layer-config-util'
export default class MapManager {
  /**
   * 地图管理对象
   * @param {String} mapcontiner 地图容器div
   * @param {Object} mapconfig 地图配置信息
   * @param {Object} options 配置信息
   */
  constructor (mapcontiner, mapconfig, options = {}) {
    this._viewer = null
    this._baseLayerGroup = null
    this._initMap(mapcontiner, mapconfig)
  }

  get viewer () {
    return this._viewer
  }
  /**
   * 加载底图
   */
  loadBaseLayers (layerConfigs) {
    if (!this._baseLayerGroup) {
      this._baseLayerGroup = new ImageLayerGroup(this._viewer)
    }
    // 移除默认加载的谷歌影像图层
    if (this._viewer.imageryLayers._layers[0].imageryProvider.url === CesiumConfig.imageMapUrl) {
      this._viewer.imageryLayers.remove(this._viewer.imageryLayers._layers[0], true)
    }
    this._baseLayerGroup.clearLayers()

    if (!layerConfigs || layerConfigs.length === 0) return
    for (let i = layerConfigs.length - 1; i >= 0; i--) {
      const layer = loadLayerByConfig(layerConfigs[i])
      if (!layer) {
        return
      }
      this._baseLayerGroup.addLayer(layer)
    }
    this._baseLayerGroup.bringToBack()
  }

  /**
   * 初始化地图
   * @param {String} mapcontiner 地图容器div
   */
  _initMap (mapcontiner, mapconfig) {
    this._viewer = new WindEarth.Viewer(mapcontiner, {
      imageryProvider: new WindEarth.UrlTemplateImageryProvider({
        url: CesiumConfig.imageMapUrl
      }),
      terrainProvider: new WindEarth.CesiumTerrainProvider({
        url: CesiumConfig.terrainUrl,
        requestVertexNormals: true
      })
    })
    this._viewer.scene.globe.depthTestAgainstTerrain = true
    this._viewer.extend(WindEarth.NavigationMixin, {})
  }
  setDefaultView ({
    west,
    south,
    east,
    north
  }) {
    WindEarth.SetDefaultView({
      west,
      south,
      east,
      north
    })
  }
}
