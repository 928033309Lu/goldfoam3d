require('@/core/cesium/cesium.ChineseTmsProviders')
// 通过配置加载图层
export function loadLayerByConfig (layerData, redraw) {
  if (layerData == null || !layerData.layerConfig || !layerData.layerConfig.hasOwnProperty('type')) {
    return null
  }
  const layerConfig = layerData.layerConfig
  let layer = null
  let options = null
  switch (String(layerConfig.type).toUpperCase()) {
    case 'INNER':
      layer = WindEarth.ImageryLayer.getChinaLayer(layerConfig.url, layerConfig.options || {})
      break
    case 'TPL_IMG':
      options = {
        url: layerConfig.url,
        enablePickFeatures: false
      }
      if (layerConfig.subdomains) {
        options.subdomains = layerConfig.subdomains
      }
      layer = new WindEarth.ImageryLayer(new WindEarth.UrlTemplateImageryProvider(options))
      break
    case 'WMS':
      // 添加WMS图层
      if (layerConfig.url && layerConfig.layers) {
        options = {
          url: layerConfig.url,
          layers: layerConfig.layers,
          parameters: getWMSLayerOptions(layerData, redraw),
          enablePickFeatures: false
        }
        if (layerConfig.subdomains) {
          options.subdomains = layerConfig.subdomains
        }
        layer = new WindEarth.ImageryLayer(new WindEarth.WebMapServiceImageryProvider(options), getImageLayerOptions(layerData.styleConfig))
      }
      break
  }

  return layer
}

// 获取WMS服务图层的OPTIONS
export function getWMSLayerOptions (layerData, redraw) {
  if (!layerData) return null
  const options = {
    layers: layerData.layerConfig.layers,
    transparent: layerData.layerConfig.hasOwnProperty('transparent') ? layerData.layerConfig.transparent : true,
    format: layerData.layerConfig.hasOwnProperty('format') ? layerData.layerConfig.format : 'image/png',
    tiled: layerData.layerConfig.hasOwnProperty('tiled') ? layerData.layerConfig.tiled : 'false',
    version: layerData.layerConfig.hasOwnProperty('version') ? layerData.layerConfig.version : '1.1.0'
  }
  if (redraw) {
    options.timestamp = Date.parse(new Date())
  }
  return options
}

function getImageLayerOptions (styleConfig) {
  if (!styleConfig) return {}
  const options = {}
  if (styleConfig.opacity) {
    options.alpha = getRealOpacityValue(styleConfig.opacity)
  }
  if (styleConfig.brightness) {
    options.brightness = Number(styleConfig.brightness)
  }
  return options
}

export function getRealOpacityValue (opacity) {
  // opacity存储的是0-100之间的值，实际使用opacity/100
  return Number(opacity) / 100
}
