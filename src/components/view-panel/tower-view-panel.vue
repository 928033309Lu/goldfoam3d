<template>
  <div class="map3d-panel tower-view">
    <div class="title">
      <img :src="publicPath+'/images/map3d/title-prev-logo.png'" alt="">
      <span>{{mast.tag}} # 测风塔</span>
      <!--<i class="iconfont iconyoushuangjiantou"></i>-->
    </div>
    <i class="iconfont iconchazi1" @click="$emit('close');$emit('update:componentName',null)"></i>
    <ul class="data-list">
      <li>
        <span>风速：</span>
        <span>{{mast.freeSpeed}} m/s</span>
      </li>
      <li>
        <span>高度：</span>
        <span>{{mast.h}} m</span>
      </li>
      <li>
        <span>测风时间：</span>
        <span>{{mast.time}}</span>
      </li>
    </ul>
    <el-row class="chart-list">
      <el-col :span="8">
        <h4>风向玫瑰图</h4>
        <polar id="windDirection" :windSet="windData" class="grid-content bg-purple"></polar>
      </el-col>
      <el-col :span="8">
        <h4>风能玫瑰图</h4>
        <polar id="windEnergy" :windSet="energyData" class="grid-content bg-purple-light"></polar>
      </el-col>
      <el-col :span="8">
        <h4>湍流图</h4>
        <onFlow id="onflow" :dataset="flowData"></onFlow>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import onFlow from '@/components/echarts/onFlow.vue'
import polar from '@/components/echarts/polar.vue'

export default {
  name: "tower-view-panel",
  data () {
    return {
      mast: {},
      windData: {},
      energyData: {},
      flowData: {},
      dataSet: {}
    }
  },
  components: { onFlow, polar },
  props: {
    schemeVisualInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  watch: {
  },
  mounted () {
    let vm = this;
    this.dataSet = this.schemeVisualInfo.masts.filter(v => { return v.tag == vm.$store.state.project.pointName })[0]
    this.init()
  },
  methods: {
    init () {
      this.mast = this.dataSet
      this.drawFlow();
      this.drawRose()
    },
    drawRose () {
      let vm = this;
      // console.log(vm.schemeVisualInfo.masts)
      let mast = vm.dataSet
      this.windData = {
        legend: mast.windRose.dirLegend,
        series: mast.windRose.dirSeries
      }
      this.energyData = {
        legend: mast.windRose.powerLegend,
        series: mast.windRose.powerSeries
      }
    },
    drawFlow () {
      let vm = this;
      let turbulenceResult = JSON.parse(this.schemeVisualInfo.turbulenceResult)
      // console.log(turbulenceResult)
      if (turbulenceResult.iecAllLine) {
        let etm = turbulenceResult.iecAllLine.ETM
        this.flowData = {
          series: etm.series.filter(v => {
            return [vm.mast.tag, 'A', 'B', 'C'].includes(v.name)
          }),
          windSpeeds: etm.windSpeeds
        }
      } else if (turbulenceResult.originLine || turbulenceResult.series) {
        let etm = turbulenceResult.originLine
        this.flowData = {
          series: etm.series.filter(v => {
            return [vm.mast.tag, '2A', '2B'].includes(v.name)
          }),
          windSpeeds: etm.xAxis.data
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.map3d-panel {
  position: fixed;
  left: 50%;
  top: 50%;
  &.tower-view {
    width: 761px;
    height: 365px;
    margin-left: -380px;
    margin-top: -182px;
    padding: 22px 17px 29px 13px;
    background: url("@{publicPath}/images/map3d/master-view.png") no-repeat
      center / contain;
    .title {
      padding-left: 16px;
      margin-top: 0;
    }
  }
  .data-list {
    padding: 5px 30px 5px;
    width: 100%;
    overflow: hidden;
    color: @commonColor;
    display: flex;
    justify-content: space-between;
    li {
      /*width: 33.33333333%;*/
      /*float: left;*/
      margin-bottom: 5px;
      span:nth-child(2) {
        color: @highColor;
      }
    }
  }
  .chart-list {
    width: 100%;
    height: 250px;
    overflow-x: hidden;
    overflow-y: scroll;
    border: 1px solid rgba(137, 137, 137, 0.5);
    padding: 10px 0;
    h4 {
      text-align: center;
      font-size: 14px;
      color: @3dGreen;
      font-weight: normal;
    }
    .echarts {
      width: 100%;
      height: 210px;
    }
  }
}
</style>
