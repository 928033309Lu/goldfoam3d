export function convertCartesian2Lonlat ({
  x,
  y,
  z
}) {
  const cartesian = new WindEarth.Cartesian3(x, y, z)
  const cartographic = WindEarth.Cartographic.fromCartesian(cartesian)
  const lon = WindEarth.Math.toDegrees(cartographic.longitude)
  const lat = WindEarth.Math.toDegrees(cartographic.latitude)
  return [lon, lat, 0]
}
