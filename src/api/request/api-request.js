import axios from 'axios'
import envConfig from '@/config/env-config'
import {
  dealAxiosResponseError
} from './util'

const service = axios.create({
  baseURL: envConfig.apiBaseUrl,
  timeout: 30000
})

// // 请求拦截器
// service.interceptors.request.use(
//   config => {
//     // // 判断请求是否需要带token
//     // if (config.hasOwnProperty('useToken') && !config.useToken) return config
//     // config.headers['x-authentication-token'] = util.getToken()
//     return config
//   },
//   error => {
//     // 发送失败
//     Promise.reject(error)
//   }
// )

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return dealAxiosResponseError(error)
  }
)

export default service
