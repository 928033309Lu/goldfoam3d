import envConfig from '@/config/env-config'
const electricLayer = {}

let featureEntityLayer = null
electricLayer.load = function (turbines) {
  electricLayer.remove()
  if (!turbines || turbines.length === 0) {
    return
  }
  featureEntityLayer = new WindEarth.FeatureEntityLayer(gwmap.viewer, {
    id: 'electric'
  })

  featureEntityLayer.bindMouseEventFunc(WindEarth.MouseEventType.LEFT_CLICK, function (e) {
    if (!e || !e.feature) return
    gwmap.dataManager.locat2FeatureByIds('turbine', [e.feature.id])
  })

  turbines.forEach(item => {
    const positions = gwmap.proj4To84(item.x, item.y)
    positions.push(100)
    const featureEntity = new WindEarth.BillBoardFeatureEntity({
      id: item.tag,
      positions: positions,
      styleOptions: {
        url: envConfig.publicPath + '/images/electric_lower.png',
        heightReference: 2,
        // scale: 1,
        width: 91,
        height: 24,
        // horizontalOrigin: WindEarth.HorizontalOrigin.RIGHT,
        verticalOrigin: WindEarth.VerticalOrigin.BOTTOM
      }
    })
    featureEntityLayer.addFeatureEntity(featureEntity)
  })
}

electricLayer.remove = function () {
  if (!featureEntityLayer) {
    return
  }
  featureEntityLayer.removeAll()
  featureEntityLayer.removeFromViewer()
  featureEntityLayer = null
}
export default electricLayer
