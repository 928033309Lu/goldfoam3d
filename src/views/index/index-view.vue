<template>
  <div class="map-view">
    <div v-if="noshareid" class="no-shareid">
      <img :src="publicPath+'/images/map3d/no-shareid.png'" alt="">
      <p>当前分享链接已失效。<br/>请联系该项目的分享人员重新分享或者对当前分享进行延期！</p>
    </div>
    <map-header :project-name="schemeVisualInfo.projectName"></map-header>
    <map-side-bar v-if="!noshareid&&initLoaded" ref="mapSideBar" @action="clickHandle(null)" @action_son="clickHandle" @clickPopout="clickPopout" :componentName.sync="componentName"></map-side-bar>

    <transition v-if="!noshareid" name="slideleft">
      <component v-if="componentName" v-bind:is="componentName" :componentName.sync="componentName" :scheme-visual-info="schemeVisualInfo" :dataSet.sync="dataSet" @visual-analyse-change="visualAnalyseChange" @wake-flow-change="wakeFlowChange" @noiseChange="noiseChange" @riskChange="riskChange" @close="detailClose"></component>
      <component v-if="projectComponent" v-bind:is="projectComponent +'-panel'" @closeProjectView="closeProjectView" :scheme-visual-info="schemeVisualInfo"></component>
    </transition>
    <div v-if="!noshareid" id="measureDraw">
      <component v-if="popoutComponent" v-bind:is="popoutComponent +'-panel'"></component>
    </div>

    <label-switcher id="labelSwitcher" v-if="initLoaded"></label-switcher>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import mapHeader from './components/map-header.vue'
import mapSideBar from './components/map-side-bar.vue'
import labelSwitcher from './components/label-switcher.vue'
import userServices from '@/services/user.service'
import map3dServices from '@/services/map3d.service'
import envConfig from '@/config/env-config'
export default {
  name: 'map-view',
  components: {
    mapHeader,
    mapSideBar,
    labelSwitcher,
    'measure-panel': () => import('@/components/view-panel/measure-panel.vue'),
    'draw-panel': () => import('@/components/view-panel/draw-panel.vue'),
    'atils-panel': () => import('@/components/view-panel/atils-panel.vue'),
    'fan-data-panel': () => import('@/components/data-panel/fan-data-panel.vue'),
    'tower-data-panel': () => import('@/components/data-panel/tower-data-panel.vue'),
    'project-view-panel': () => import('@/components/view-panel/project-view-panel.vue'),
    'tower-view-panel': () => import('@/components/view-panel/tower-view-panel.vue'),
    'fan-view-panel': () => import('@/components/view-panel/fan-view-panel.vue'),
    'fan-list-panel': () => import('@/components/view-panel/fan-list-panel.vue'),
    'visual-analyse-panel': () => import('@/components/function-panel/visual-analyse-panel.vue'),
    'noise-panel': () => import('@/components/function-panel/noise-panel.vue'),
    'credit-panel': () => import('@/components/function-panel/credit-panel.vue'),
    'wake-flow-panel': () => import('@/components/function-panel/wake-flow-panel.vue'),
    'risk-panel': () => import('@/components/function-panel/risk-panel.vue')
  },
  data () {
    return {
      hasToken: false,
      popoutComponent: null,
      projectComponent: null,
      componentName: '',
      isSecret: false,
      schemeVisualInfo: {},
      dataSet: {},
      currentMenuItem: null,
      accessPwd: '',
      // disableMenus: [],
      fullscreen: false, // if: todo文字提示用的
      noshareid: false,
      initLoaded: false // 页面初始化是否完成
    }
  },
  computed: {
    tokenName () {
      return 'token' + this.$route.params.projectId + '/' + this.$route.params.id
    }
  },
  watch: {
    "$route" () {
      this.routeUpdate()
    },
    '$store.state.project.componentName' (v) {
      this.componentName = v;
      v && (this.dataSet = this.$store.state.project.pointName)
    },
    'componentName' (v) {
      if (v != this.$store.state.project.componentName) {
        this.$store.commit('project/setComponents', v)
      }
      if (!v) {
        this.$refs['mapSideBar'].initSonIndex();
        gwmap.dataManager.clearHighLight();
      }
    },
    'noshareid' (bool) {
      if (!bool) {
        // document.getElementById('mapContainer').remove()
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.routeUpdate()
    })
  },
  mounted () {
    this.controls();
  },
  methods: {
    ...mapActions('project', ["getRiskData", 'getNoiseData', 'getCreditData']),
    //自定义控件
    controls () {
      document.querySelector("#controlsPosition").addEventListener("click", () => {
        gwmap.dataManager.locat2Layer("turbine");
      });
      document.querySelector("#controlsEsc").addEventListener("click", (event) => {
        //todo 全屏事件
        this.handleFullScreen();
      });
    },
    handleFullScreen () {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    routeUpdate () {
      if (!this.$route.params.projectId) {
        this.noshareid = true;
        return;
      }
      // 路由改变时进行相关设置
      this.$store.commit('project/currentProjectId', this.$route.params.projectId)
      this.$store.commit('project/currentSchemeId', this.$route.params.id)

      if (envConfig.appNodeEnv === "local") {
        // todo:本地调试使用
        // const userInfo = {
        //   isadmin: 0,
        //   token: "666"
        // }
        // localStorage.setItem("userInfo", JSON.stringify(userInfo))
      }
      document.getElementById("load-percent").innerHTML = "50%"
      document.getElementById("mapLoading").style.display = "inherit"
      this.initLoaded = false

      this.init();

    },
    init () {
      if (this.$route.query.shareId) {  //分享
        // if (localStorage.getItem(this.tokenName)) {
        //   this.hasToken = true;
        //   this.getSchemeVisualInfo();
        // } else {
        // this.checkIsSecret()//校验是否需要加密
        this.analysisShareId()
        // }
      } else {  //查看
        this.hasToken = true;
        this.getSchemeVisualInfo();
      }
    },
    checkIsSecret () {
      userServices.checkAccess({
        shareId: this.$route.query.shareId,
      }).then(res => {
        this.isSecret = res
        if (res) {
          this.accessPwd = prompt("请输入密码：");
          if (!(this.accessPwd || this.accessPwd === '')) {
            window.close();
          }
          this.analysisShareId()
        } else {
          this.analysisShareId()
        }
      })
    },
    getSchemeVisualInfo () {
      map3dServices.getSchemeVisualInfo(this.$route.params.projectId, this.$route.params.id).then(res => {
        this.noshareid = false;
        this.schemeVisualInfo = Object.assign({}, res);
        document.title = this.schemeVisualInfo.projectName;
        gwmap.schemeEPSG = this.schemeVisualInfo.epsg
        // if (this.schemeVisualInfo.terrain) {
        //   // 设置 场区范围
        //   const topRight = gwmap.proj4To84(this.schemeVisualInfo.terrain.xMax, this.schemeVisualInfo.terrain.yMax)
        //   const bottomLeft = gwmap.proj4To84(this.schemeVisualInfo.terrain.xMin, this.schemeVisualInfo.terrain.yMin)
        //   gwmap.mapManager.setDefaultView({
        //     west: bottomLeft[0],
        //     south: bottomLeft[1],
        //     east: topRight[0],
        //     north: topRight[1]
        //   })
        // }

        gwmap.dataManager.addTurbines(this.schemeVisualInfo.wts)
        gwmap.dataManager.addMasts(this.schemeVisualInfo.masts)
        gwmap.dataManager.turbinesRiskData = this.schemeVisualInfo.riskZone
        gwmap.dataManager.setSectionData(this.schemeVisualInfo.sections)



        // 以1s的时间作为过渡
        // 1. 完成三维初始化并缩放到方案视角
        // 2. 显示伪装的加载进度
        let tempPercent = 50
        const tempInterval = setInterval(() => {
          tempPercent += 10
          document.getElementById("load-percent").innerHTML = tempPercent + "%"
          if (tempPercent >= 100) {
            clearInterval(tempInterval)
            document.getElementById("mapLoading").style.display = "none"
            gwmap.loadMapComponents("mapContainer")
            this.initLoaded = true
            this.$nextTick(() => {
              const disableMenus = []
              if (!this.schemeVisualInfo.noisePath) {
                disableMenus.push("noise")
              }
              if (!this.schemeVisualInfo.windMastPath) {
                disableMenus.push("credit")
              }
              this.$refs.mapSideBar && (this.$refs.mapSideBar.disableMenus = disableMenus)
            })
          }
        }, 700);

      }).catch(err => {
        // if (err.response && (err.response.data.code == '500' || err.response.data.code == '401')) {
        this.noshareid = true;
        // }
        console.log(err)
      })
    },
    analysisShareId () {
      if (!this.$route.query.shareId) {
        this.noshareid = true;
      }
      let params = {
        shareId: this.$route.query.shareId
      }
      this.isSecret && (params.accessPwd = this.accessPwd)
      userServices.analysisShareId(params).then(res => {
        if (res) {
          this.hasToken = true
          this.noshareid = false;
          localStorage.setItem(this.tokenName, res.newToken)
          this.getSchemeVisualInfo();
        }
      }).catch(err => {
        this.noshareid = true;
        // this.accessPwd = prompt("密码错误，请重新输入密码：");
        // this.analysisShareId()
      })
    },
    visualAnalyseChange ({ distance, opacity }) {
      gwmap.dataManager.changeVisualDomain(opacity, distance)
    },
    wakeFlowChange (section) {
      gwmap.dataManager.changeWakeFlow(section)
    },
    noiseChange (opacity) {
      gwmap.noiseLayer.changeOpacity(opacity)
    },
    riskChange (data) {
      gwmap.dataManager.showTurbineRisk(data[0], data[1], data[2])
    },
    clickHandle (menuItem) {
      // if (menuItem.hasOwnProperty('children')) return
      // 先关闭之前菜单项功能
      if (this.currentMenuItem) {
        switch (this.currentMenuItem.fn) {
          // case "viewAction":
          case "showFanGrid":
          case "showTowerGrid":
            break
          case "wakeFlow":
            gwmap.dataManager.closeWakeFlow()
            break
          case "risk":
            gwmap.dataManager.closeTurbineRisk()
            break
          case "noise":
            gwmap.noiseLayer.remove()
            break
          case "visualAnalyse":
            gwmap.dataManager.closeVisualAnalyse()
            break
          case "credit":
            gwmap.noiseLayer.remove()
            break
        }
      }

      // 如果是点击同一菜单，表示关闭该项功能
      if (!menuItem || this.currentMenuItem === menuItem) {
        this.currentMenuItem = null
        this.componentName = null
        return
      }
      // 开启新菜单项功能
      this.currentMenuItem = menuItem
      this.componentName = menuItem && menuItem.component

      switch (menuItem.fn) {
        // case "viewAction":
        case "showFanGrid":
        case "showTowerGrid":
          break
        case "wakeFlow":
          gwmap.dataManager.openWakeFlow()
          break
        case "risk":
          gwmap.dataManager.showTurbineRisk(true, true, true)
          break
        case "noise":
          gwmap.noiseLayer.load(this.schemeVisualInfo)
          break
        case "visualAnalyse":
          gwmap.dataManager.openVisualAnalyse()
          break
        case "credit":
          // 当前和噪音使用相同的组件和类
          gwmap.noiseLayer.load(this.schemeVisualInfo, false)
          break
      }
    },
    //弹框类型的组件
    clickPopout (index) {
      this.popoutComponent = null;
      this.projectComponent = null;
      switch (index) {
        case 0:
          this.projectComponent = 'project-view';
          break
        case 3:
          this.popoutComponent = 'atils';
          break
        case 4:
          this.popoutComponent = 'measure';
          break
        case 5:
          this.popoutComponent = 'draw';
          break
      }
    },
    //关闭项目概览
    closeProjectView () {
      this.$refs['mapSideBar'].initIndex();
    },
    detailClose () {
      gwmap.dataManager.currentShowDetailItem = null
    }
  }
}
</script>

<style lang="less" scoped>
.map-view {
  width: 100%;
  height: 100%;
  position: relative;
}
.no-shareid {
  position: fixed;
  width: 100vw;
  height: calc(100vh - 40px);
  top: 40px;
  text-align: center;
  background: #050709;
  color: #95a7b7;
  img {
    width: 297px;
    margin-top: 75px;
  }
  p {
    padding-left: 50px;
    line-height: 2;
  }
}
#measureDraw {
  position: fixed;
  top: 522px;
  left: 80px;
  z-index: 111;
}
.slideleft-enter-active,
.slideleft-leave-active {
  transition: all 0.5s;
}

.slideleft-enter,
.slideleft-leave-to {
  opacity: 0;
}
#labelSwitcher {
  position: fixed;
  right: 15px;
  top: 55px;
}
</style>
