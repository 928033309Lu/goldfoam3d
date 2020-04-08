/**
 * 所有环境公用的基础配置
 */
const publicConfig = {
  APP_TITLE: '"风匠"',
  APP_VERSION: `'${require('../package.json').version}'`,
  APP_BUILD_TIME: `'${require('dayjs')().format('YYYYMMDD')}'`,
  S3PATH: '"/api/s3path"', // 本地代理或nginx代理
  VUE_APP_API_MAP: '"http://10.12.3.135:6500"', // （姜云鹏）数据功能模块服务地址
  VUE_APP_API_ELELVATION: '"http://10.35.191.98:5000"', // （姜云鹏）高程服务地址
  VUE_APP_API_ELELVATION2: '"http://10.12.3.134:8010"', // （郭俊伟）高程服务地址
};
const merge = function (env) {
  return Object.assign({}, publicConfig, env)
}
/**
 * 
 * 系统环境变量配置
 * 在/src/config/env-config.js中有对应的信息
 */
const envConfig = {
  "local": merge({
    NODE_ENV: '"local"',
    BASE_API: '"/api/scheme-service"',
    PUBLIC_PATH: '""', // 同webpack publicPath保持一致，但去掉最后的“/”
  }),
  "development": merge({
    NODE_ENV: '"development"',
    BASE_API: '"/api/scheme-service"',
    PUBLIC_PATH: '"/map3d"', // 同webpack publicPath保持一致，但去掉最后的“/”
  }),
  "production": merge({
    NODE_ENV: '"production"',
    BASE_API: '"/api/scheme-service"',
    PUBLIC_PATH: '"/map3d"', // 同webpack publicPath保持一致，但去掉最后的“/”
  })
}

module.exports = envConfig