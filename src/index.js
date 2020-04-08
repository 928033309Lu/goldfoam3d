// 页面初始化 资源加载
import 'normalize.css/normalize.css'
import '@/assets/style/index.less'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from '@/store/index'
import App from './App.vue'
import moment from 'moment'
import envConfig from '@/config/env-config'
Vue.prototype.moment = moment
Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
  if (value === 0 || value == null || value === '') {
    return '-'
  } else {
    return moment(value).format(formatString)
  }
})

Vue.use(ElementUI)
Vue.prototype.publicPath = envConfig.publicPath

// VUE部分 初始化
new Vue({
  router,
  store,
  render: h => h(App),
  created () {

  },
  mounted () {

  }
}).$mount('#app')

// 地图部分 初始化
import gwmap from '@/gwmap'
gwmap.init('mapContainer')
window.gwmap = gwmap
