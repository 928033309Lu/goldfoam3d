const envConfig = {
  appNodeEnv: process.env.NODE_ENV,
  appVersion: process.env.APP_VERSION,
  appBuildTime: process.env.APP_BUILD_TIME,
  appTitle: process.env.APP_TITLE,
  publicPath: process.env.PUBLIC_PATH,
  s3Path: process.env.S3PATH,
  apiBaseUrl: process.env.BASE_API,
  apiBaseUrlMap: process.env.VUE_APP_API_MAP,
  apiBaseUrlElevation: process.env.VUE_APP_API_ELELVATION,
  apiBaseUrlElevation2: process.env.VUE_APP_API_ELELVATION2,
  devMode: process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development' // 是否处于开发模式
}

export default envConfig
