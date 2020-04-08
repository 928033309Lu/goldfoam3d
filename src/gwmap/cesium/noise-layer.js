import envConfig from '@/config/env-config'

const noiseLayer = {}

let featureEntityLayer = null
let featureEntity = null

noiseLayer.load = function (data, noiseMode = true) {
  noiseLayer.remove()
  if (!data || !data.terrain) {
    return
  }
  const topRight = gwmap.proj4To84(data.terrain.xMax, data.terrain.yMax)
  const bottomLeft = gwmap.proj4To84(data.terrain.xMin, data.terrain.yMin)
  if (!topRight || !bottomLeft) return
  featureEntityLayer = new WindEarth.FeatureEntityLayer(gwmap.viewer, {
    id: 'noise'
  })

  featureEntity = new WindEarth.RectangleFeatureEntity({
    positions: {
      west: bottomLeft[0],
      south: bottomLeft[1],
      east: topRight[0],
      north: topRight[1]
    },
    styleOptions: {
      url: envConfig.s3Path + '/' + (noiseMode ? data.noisePath : data.windMastPath),
      color: 'rgba(255,255,255,1)'
    }
  })
  featureEntityLayer.addFeatureEntity(featureEntity)
}

noiseLayer.changeOpacity = function (opacity) {
  if (!featureEntity) {
    return
  }
  if (opacity < 0 || opacity > 1) {
    opacity = 1
  }
  featureEntity.changeFeatureProperty({
    styleOptions: {
      color: `rgba(255,255,255,${opacity})`
    }
  })
}

noiseLayer.remove = function () {
  if (!featureEntityLayer) {
    return
  }
  featureEntityLayer.removeFeatureEntity(featureEntity)
  featureEntityLayer.removeFromViewer()
  featureEntityLayer = null
  featureEntity = null
}
export default noiseLayer
