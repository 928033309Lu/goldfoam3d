export const dealAxiosResponseError = (error) => {
  // 如果服务调用成功，但出现业务了相关错误
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.code
  ) {
    return Promise.resolve(error.response.data)
  }

  // 其他为网络等错误
  const errorData = {
    code: '999',
    msg: '未知错误。',
    data: error
  }
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '请求错误'
        break
      case 401:
        error.message = '未授权，请登录'
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = `请求地址出错: ${error.response.config.url}`
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器内部错误'
        break
      case 501:
        error.message = '服务未实现'
        break
      case 502:
        error.message = '网关错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网关超时'
        break
      case 505:
        error.message = 'HTTP版本不受支持'
        break
    }
    errorData.code = String(error.response.status)
    errorData.msg = error.message
  }
  // 将错误信息也使用Promise.resolve，这样无论是否有错，都只能在Promise.then方法中捕捉到错误。
  // 使用errorData将请求错误 和 请求正确 返回的数据保持一致的形式
  return Promise.resolve(errorData)
}
