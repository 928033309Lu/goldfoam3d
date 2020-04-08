const dayejs = require('dayjs')

export function getNow (format = 'YYYY-MM-DD HH:mm:ss') {
  return dayejs().format(format)
}

export function dateFormat (dateStr, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayejs(dateStr).format(format)
}
/**
 * 将数值小数位保留指定位数
 * @param {Number} number 原数值
 * @param {Number} fixed 小数点保留位数
 */
export function formatNumber (number, fixed = 4) {
  if (!number || isNaN(number)) return number

  return Number(Number(number).toFixed(fixed)) // toFixed返回字符串
}

/**
 * 对地图经纬度显示数字进行格式化，保留指定位数
 * @param {Object} position {lng,lat,level}
 * @param {Number} fixed 保留小数位数
 */
export function formatCoordinate (coordinate, fixed = 4) {
  if (!coordinate) return coordinate

  return [
    formatNumber(coordinate[0], fixed),
    formatNumber(coordinate[1], fixed)
  ]
}
