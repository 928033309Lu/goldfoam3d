import axios from 'axios'
import {
  dealAxiosResponseError
} from './util'

const service = axios.create({
  timeout: 30000
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    if (!response.data) {
      return {
        code: -1,
        msg: '请求出错'
      }
    }
    // 将GIS返回的Msg和code形式和后端服务返回的结构保持一致
    response.data.code = response.data.status === 0 || !response.data.hasOwnProperty('status') ? '1' : (response.data.status === 1 ? '-1' : String(response.data.status))
    delete response.data.status
    if (typeof response.data.message === 'string') {
      response.data.msg = response.data.message
      delete response.data.message
    }
    const data = {}
    for (const item in response.data) {
      if (item === 'code' || item === 'msg') {
        continue
      }
      data[item] = response.data[item]
      delete response.data[item]
    }
    response.data.data = data
    return response.data
  },
  error => {
    return dealAxiosResponseError(error)
  }
)

export default service
