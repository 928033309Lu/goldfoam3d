<template>
  <div class="map3d-panel">
    <i class="iconfont iconguanbi" @click="$emit('close');$emit('update:componentName',null)"></i>
    <div class="title">
      <img :src="publicPath+'/images/map3d/title-prev-logo.png'" alt="">
      <span>{{dataSet.tag}} 风机</span>
      <!--<i class="iconfont iconyoushuangjiantou"></i>-->
    </div>
    <ul class="data-list">
      <li>
        <span>机型：</span>
        <span>{{dataSet.modelType}}</span>
      </li>
      <li>
        <span>轮毂高度：</span>
        <span>{{dataSet.h}} m</span>
      </li>
      <li>
        <span>海拔：</span>
        <span>{{dataSet.z}} m</span>
      </li>
      <li>
        <span>平均风速：</span>
        <span>{{dataSet.freeSpeed}} m/s</span>
      </li>
      <li>
        <span>风切变：</span>
        <span>{{dataSet.windShearExponentAvg && Number(dataSet.windShearExponentAvg.toFixed(2))}}</span>
      </li>
      <li>
        <span>尾流后风速：</span>
        <span>{{dataSet.wakedSpeed}} m/s</span>
      </li>
      <li>
        <span>尾流损失：</span>
        <span>{{dataSet.wakedReductionRatio && Number(dataSet.wakedReductionRatio.toFixed(1))}} %</span>
      </li>
      <li>
        <span>尾流后等效小时数：</span>
        <span>{{dataSet.wakedHours}} h</span>
      </li>
    </ul>
    <div class="chart-list">
      <el-row>
        <el-col :span="12">
          <h4>风向玫瑰图</h4>
          <polar id="windDirection1" :windSet="windData" class="grid-content bg-purple"></polar>
        </el-col>
        <el-col :span="12">
          <h4>风能玫瑰图</h4>
          <polar id="windEnergy1" :windSet="energyData" class="grid-content bg-purple-light"></polar>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import polar from '@/components/echarts/polar.vue'

export default {
  name: "fan-view-panel",
  data () {
    return {
      dataSet: {},
      windData: {},
      energyData: {}
    }
  },
  props: {
    schemeVisualInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // dataSet: {
    //   type: Object,
    //   default: () => {
    //     return {}
    //   }
    // },
  },
  watch: {
    '$store.state.project.pointName' (wtTag) {
      this.dataSet = this.schemeVisualInfo.wts.filter(v => { return v.tag == wtTag })[0]
      this.init()
    }
  },
  components: { polar },
  mounted () {
    console.log('mounted')
    let vm = this;
    this.dataSet = this.schemeVisualInfo.wts.filter(v => { return v.tag == vm.$store.state.project.pointName })[0]
    this.init()
  },
  methods: {
    init () {
      let vm = this;
      let wt = this.schemeVisualInfo.wts.filter(v => { return v.tag == vm.dataSet.tag })[0]
      this.windData = {
          id:'windDirection1',
        legend: wt.windRose.dirLegend,
        series: wt.windRose.dirSeries
      }
      this.energyData = {
          id:'windEnergy1',
        legend: wt.windRose.powerLegend,
        series: wt.windRose.powerSeries
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
  transform: translate(-50%, -50%);
  width: 600px;
  height: 415px;
  background: url("@{publicPath}/images/map3d/overView-bg2.png") no-repeat
    center;
  background-size: 100% 100%;
  .title {
    padding-left: 20px;
    margin-top: 15px;
  }
  .data-list {
    padding: 5px 20px 5px;
    width: 100%;
    overflow: hidden;
    color: @commonColor;
    li {
      width: 50%;
      float: left;
      margin-bottom: 5px;
      span:nth-child(2) {
        color: @highColor;
      }
    }
  }
  .chart-list {
    width: calc(100% - 40px);
    height: 250px;
    margin: 5px 20px 0;
    padding: 10px 0;
    overflow-x: hidden;
    overflow-y: scroll;
    border: 1px solid rgba(137, 137, 137, 0.5);
    .el-row {
      padding: 0 15px;
    }
    .grid-content {
      width: 210px;
      height: 210px;
      margin: 5px auto 0;
    }
    h4 {
      text-align: center;
      font-size: 13px;
      color: @3dGreen;
      font-weight: normal;
    }
  }
}
</style>
