WindEarth.ImageryLayer.getChinaLayer = function (type, options) {
  const provider = WindEarth.ImageryLayer.getChinaProvider(type, options)
  if (!provider) return null
  const layer = new WindEarth.ImageryLayer(provider)
  return layer
}

WindEarth.ImageryLayer.getChinaProvider = function (type, options) {
  if (!type) return null
  options = options || {}
  const parts = type.split('.')
  const providerName = parts[0]
  const mapName = parts[1]
  const mapType = parts[2]

  const providers = WindEarth.ImageryLayer.providers
  const layerOptions = {
    url: providers[providerName][mapName][mapType],
    enablePickFeatures: false
  }
  const subdomains = providers[providerName].Subdomains
  if (subdomains.length !== 0) {
    layerOptions.subdomains = subdomains
  }
  // 如果是4326的参考系
  if (providerName === 'TianDiTu4326' || providerName === 'TianDiTuWMTS4326') {
    layerOptions.tileWidth = 256
    layerOptions.tileHeight = 256
  }
  // 附加天地图token
  if (providerName.indexOf('TianDiTu') >= 0 && options.token) {
    layerOptions.url += '&tk=' + options.token
  }

  return new WindEarth.UrlTemplateImageryProvider(layerOptions)
}

WindEarth.ImageryLayer.providers = {

  // 天地图 WGS84(CGCS2000) EPSG:4326
  TianDiTu4326: {
    Normal: {
      Map: 'http://t{s}.tianditu.cn/DataServer?T=vec_c&X={x}&Y={y}&L={z}',
      Annotion: 'http://t{s}.tianditu.cn/DataServer?T=cva_c&X={x}&Y={y}&L={z}'
    },
    Satellite: {
      Map: 'http://t{s}.tianditu.cn/DataServer?T=img_c&X={x}&Y={y}&L={z}',
      Annotion: 'http://t{s}.tianditu.cn/DataServer?T=cia_c&X={x}&Y={y}&L={z}'
    },
    Terrain: {
      Map: 'http://t{s}.tianditu.cn/DataServer?T=ter_c&X={x}&Y={y}&L={z}',
      Annotion: 'http://t{s}.tianditu.cn/DataServer?T=cta_c&X={x}&Y={y}&L={z}'
    },
    Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
  },

  // 天地图WMTS WEB墨卡托 EPSG:3857
  TianDiTuWMTS: {
    Normal: {
      Map: 'http://t{s}.tianditu.com/vec_w/wmts?layer=vec&style=default&tilematrixset=w&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}',
      Annotion: 'http://t{s}.tianditu.com/cva_w/wmts?layer=cva&style=default&tilematrixset=w&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}'
    },
    Satellite: {
      Map: 'http://t{s}.tianditu.com/img_w/wmts?layer=img&style=default&tilematrixset=w&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}',
      Annotion: 'http://t{s}.tianditu.com/cia_w/wmts?layer=cia&style=default&tilematrixset=w&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}'
    },
    Terrain: {
      Map: 'http://t{s}.tianditu.com/ter_w/wmts?layer=ter&style=default&tilematrixset=w&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}',
      Annotion: 'http://t{s}.tianditu.com/cta_w/wmts?layer=cta&style=default&tilematrixset=w&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}'
    },
    Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
  },

  // 天地图WMTS WGS84(CGCS2000) EPSG:4326
  TianDiTuWMTS4326: {
    Normal: {
      Map: 'http://t{s}.tianditu.com/vec_c/wmts?layer=vec&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}',
      Annotion: 'http://t{s}.tianditu.com/cva_c/wmts?layer=cva&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}'
    },
    Satellite: {
      Map: 'http://t{s}.tianditu.com/img_c/wmts?layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}',
      Annotion: 'http://t{s}.tianditu.com/cia_c/wmts?layer=cia&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}'
    },
    Terrain: {
      Map: 'http://t{s}.tianditu.com/ter_c/wmts?layer=ter&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}',
      Annotion: 'http://t{s}.tianditu.com/cta_c/wmts?layer=cta&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}'
    },
    Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
  },

  // 高德 WEB墨卡托 EPSG:3857
  GaoDe: {
    Normal: {
      Map: 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      Annotion: 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z}'
    },
    Satellite: {
      Map: 'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
      Annotion: 'http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
    },
    Subdomains: ['1', '2', '3', '4']
  },

  // 谷歌 WEB墨卡托 EPSG:3857  都是有偏移的
  Google: {
    Normal: {
      Map: 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'
    },
    Satellite: {
      Map: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
      Annotion: 'http://www.google.cn/maps/vt?lyrs=h@189&gl=cn&x={x}&y={y}&z={z}'
    },
    Terrain: {
      Map: 'http://www.google.cn/maps/vt?lyrs=t@189&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}',
      Annotion: 'http://www.google.cn/maps/vt?lyrs=r@189&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}'
    },
    Subdomains: []
  },

  // 谷歌无偏移的地图服务 WEB墨卡托 EPSG:3857
  GoogleNoOffset: {
    Satellite: {
      Map: 'http://ditu.google.cn/maps/vt/lyrs=s&x={x}&y={y}&z={z}'
    },
    Subdomains: []
  }

}
