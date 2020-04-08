import axios from 'axios'
import envConfig from '@/config/env-config'
import request from './request/api-request'
import requestGIS from './request/gis-request'
import {
  apisConfig,
  mapApisConfig
} from '@/config/api-config'

const service = {}
/**
 * 请求后端提供的API
 */
service.api = function (apiName, data, callback) {
  return $J.requestUtil.requestService({
    request,
    apisConfig,
    apiName,
    data,
    callback
  })
}
/**
 * 请求后端提供的API，url中包含动态参数
 */
service.dynamic = function (apiName, apiUrlParams, data, callback) {
  return $J.requestUtil.requestService({
    request,
    apisConfig,
    apiName,
    apiUrlParams,
    data,
    callback
  })
}
/**
 * 请求地图处理相关API
 */
service.map = function (apiName, apiUrlParams, callback) {
  return $J.requestUtil.requestService({
    request: requestGIS,
    apisConfig: mapApisConfig,
    apiRootUrl: envConfig.apiBaseUrlMap,
    apiName,
    apiUrlParams,
    callback
  })
}

/**
 * 非后端api服务接口get请求
 * @param {*} url
 * @param {*} callback
 */
service.static = function (url, callback) {
  const promise = axios.get(url)
  promise.then(function (response) {
    if (response.data) {
      callback && callback($J.createRequestResult(true, '', response.data))
    } else {
      callback && callback($J.createRequestResult(false, 'status = ' + response.status))
    }
  })
    .catch(function (error) {
      callback && callback($J.createRequestResult(false, error.message))
    })
  return promise
}

/**
 * 获取点位高程信息
 * @param {Number} lon 经度
 * @param {Number} lat 纬度
 * @param {Function} callback
 */
service.getElevation = function (lon, lat, callback) {
  return $J.requestUtil.requestService({
    request: requestGIS,
    apisConfig: mapApisConfig,
    apiRootUrl: envConfig.apiBaseUrlElevation,
    apiName: 'getElevation',
    apiUrlParams: [lon, lat],
    callback
  })
}
/**
 * 获取点位高程信息
 * @param {Array} lonlats  坐标数组，如[
    [114.70, 35.60],
    [114.70, 35.65]
  ]
 * @param {Function} callback
 */
service.getElevation2 = function (lonlats, callback) {
  const data = {
    'args': {
      'query': {
        'altitude': ''
      },
      'name_out': 'test.json',
      'query_pts': lonlats
    }
  }
  return $J.requestUtil.requestService({
    request: requestGIS,
    apisConfig: mapApisConfig,
    apiRootUrl: envConfig.apiBaseUrlElevation2,
    apiName: 'geoQuery',
    data,
    callback
  })
}
/**
 * 获取多个点位的高程信息
 * @param {Array} lonlats [[lon,lat]]
 * @param {Function} callback
 */
service.getSection = function (lonlats, callback) {
  const feature = {
    'type': 'Feature',
    'geometry': {
      'type': 'LineString',
      'coordinates': lonlats
    }
  }

  return $J.requestUtil.requestService({
    request: requestGIS,
    apisConfig: mapApisConfig,
    apiRootUrl: envConfig.apiBaseUrlMap,
    apiName: 'section',
    apiUrlParams: [JSON.stringify(feature)],
    callback
  })
}
export default service
