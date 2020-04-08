import axios from 'axios'
import router from '../router'
import {
  jsonToParams
} from '../config/network.config'
import {
  Message
} from 'element-ui'
import envConfig from '@/config/env-config'

let token = null

function getToken () {
  if (token) return token
  // console.log(router)
  const curRoute = router.history.current
  if (curRoute.query.shareId) {
    token = localStorage.getItem('token' + curRoute.params.projectId + '/' + curRoute.params.id)
  } else {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    token = userInfo && userInfo.token
  }
  if (envConfig.appNodeEnv === 'local' && !token) {
    token = '666'
  }
  return token
}

function get (url, data, auth = false, options = {}) {
  const token = getToken()
  let config = {}
  url = url + jsonToParams(data)
  if (auth) {
    config = Object.assign({}, options)
    config.headers = (config.headers) ? config.headers : {}
    config.headers['token'] = token
  }
  return axios.get(url, config)
    .then((res) => responseHandler(res))
    .catch((err) => responseError(err))
}

function post (url, data, auth = false, options = {}) {
  const token = getToken()
  let config = options
  if (auth) {
    if (!config.headers) {
      config.headers = {}
    }
    config.headers.token = token
    // config = Object.assign(options, {
    //   headers: {'token': token}
    // });
  } else {
    config = options
  }

  return axios.post(url, data, config)
    .then((res) => responseHandler(res))
    .catch((err) => responseError(err))
}

function deleteOut (url, data, auth = false, options = {}) {
  url = url + jsonToParams(data)
  const token = getToken()
  let config = {}
  if (auth) {
    config = Object.assign(options, {
      headers: {
        'token': token
      }
    })
  }
  return axios.delete(url, config)
    .then((res) => responseHandler(res))
    .catch((err) => responseError(err))
}

function deleteput (url, data, auth = false) {
  const token = getToken()
  let config = {}
  if (auth) {
    config = Object.assign({
      data: data
    }, {
      headers: {
        'token': token
      }
    })
  }
  return axios.delete(url, config)
    .then((res) => responseHandler(res))
    .catch((err) => responseError(err))
}

function put (url, data, auth = false, options = {}) {
  const token = getToken()
  let config = {}
  if (auth) {
    config = Object.assign(options, {
      headers: {
        'token': token
      }
    })
  }
  return axios.put(url, data, config)
    .then((res) => responseHandler(res))
    .catch((err) => responseError(err))
}

function responseHandler (res) {
  // if (res.data.code === 401) {
  //   const userInfo = localStorage.getItem('userInfo')
  //   const isadmin = userInfo ? JSON.parse(userInfo).isadmin : 0
  //   const type = isadmin == 0 ? 'common' : (isadmin == 1 ? 'enterAdminLogin' : 'sysAdminLogin')
  //   sessionStorage.clear()
  //   location.href = `/login/${type}`
  //   return
  // }
  if (res.status === 200) {
    if (!res.data.code) {
      return Promise.resolve(res.data)
    } else if (res.data.code === 200) {
      return Promise.resolve(res.data.data)
    } else if (res.data.code == 400 || res.data.code == 1) {
      return Promise.reject(res.data)
    } else {
      Message({
        message: res.data.msg,
        center: true
      })
      return Promise.reject(res.data)
    }
  } else {
    Message({
      message: res.data.msg,
      center: true
    })
    return Promise.reject(res.data)
  }
}

function responseError (err) {
  // if (err.response && err.response.status === 401) {
  //   if (!_.includes(location.pathname, '/login')) {
  //     const userInfo = localStorage.getItem('userInfo')
  //     const isadmin = userInfo ? JSON.parse(userInfo).isadmin : 0
  //     const type = isadmin == 0 ? 'common' : (isadmin == 1 ? 'enterAdminLogin' : 'sysAdminLogin')
  //     sessionStorage.clear()
  //     location.href = `/login/${type}`
  //   }
  // }
  if (err.response && err.response.status === 500) {
    !err.response.data.msg.includes('此链接已失效') && Message.error(err.response.data.msg)
  }
  if (err.response && err.response.status > 500) {
    Message.error(err.response.data.msg || '网络错误，请重试')
  }
  return Promise.reject(err)
}

export default {
  get,
  post,
  deleteOut,
  deleteput,
  put
}
