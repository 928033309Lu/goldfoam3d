<template>
  <div style="width: 100%;height: 100%;" v-loading="computing">
    <elevation-slicing-chart id="chart" :slicingData="requestResult" :style="showContent?'width:65%;':'width:100%;'"></elevation-slicing-chart>
    <div id="content" v-if="showContent">
      <div>
        <div class="gold-window-text slicing-text"><span>起点：</span> <span>{{startPoint}}</span></div>
        <div class="gold-window-text slicing-text"><span>终点：</span> <span>{{endPoint}}</span></div>
        <div class="gold-window-text slicing-text"><span>横跨距离：</span> <span>{{startEndDistance}}</span></div>
        <div class="gold-window-text slicing-text"><span>最大海拔落差：</span> <span>{{maxHeightDiff?(maxHeightDiff+'米'):''}}</span></div>
        <div class="gold-window-text slicing-text"><span>起止点海拔落差：</span> <span>{{startEndHeightDiff?(startEndHeightDiff+'米'):''}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/utils'
import request from '@/api'
import ElevationSlicingChart from './elevation-slicing-chart.vue'
export default {
  components: { ElevationSlicingChart },
  props: {
    "showContent": {
      default: false
    }
  },
  data () {
    return {
      requestResult: null,
      startPoint: null,
      endPoint: null,
      startEndDistance: null,
      startEndHeightDiff: null,
      maxHeightDiff: null,
      computing: false
    }
  },
  computed: {
  },
  watch: {
  },
  mounted () {
  },
  methods: {

    setData (data) {
      if (!data) return
      this.clear()
      if (!data || !data.hasOwnProperty('length') || data.length < 2) return
      // section服务中的坐标不支持[x,y,z]形式
      data.forEach(item => {
        if (item && item.length === 3) {
          item.splice(2, 1)
        }
      })
      const geojson = {
        'type': 'Feature',
        'geometry': {
          'type': 'LineString',
          'coordinates': data
        }
      }
      this.computing = true
      request.map('section', [JSON.stringify(geojson)], (res) => {
        this.computing = false
        if (res.code !== '1' || !res.data.result) {
          this.$message.error('获取高程剖面数据出错。')
          return
        }
        const result = res.data.result
        result.startPoint = util.formater.formatCoordinate(data[0]).toString()
        result.endPoint = util.formater.formatCoordinate(data[data.length - 1]).toString()
        if (result.distance && result.distance.length !== 0) {
          result.distance[result.distance.length - 1] = Number(result.distance[result.distance.length - 1].toFixed(2))
          this.startEndDistance = result.distance[result.distance.length - 1]
        }
        this.requestResult = result

        this.startEndHeightDiff = result.elevation[result.elevation.length - 1] - result.elevation[0]
        this.maxHeightDiff = Math.max(...result.elevation) - Math.min(...result.elevation)
        this.startPoint = result.startPoint
        this.endPoint = result.endPoint
      })



    },
    clear () {
      this.requestResult = null
      this.startEndDistance = null
      this.startEndHeightDiff = null
      this.maxHeightDiff = null
      this.startPoint = null
      this.endPoint = null
      this.computing = false
    }
  }
}
</script>

<style lang="less" scoped>
.slicing-text {
  padding: 5px 10px !important;
  text-align: unset !important;
}
#chart {
  display: inline-block;
  padding: 5px 10px;
  height: 161px;
  width: 400px;
  background: white;
  //background: rgba(52, 52, 57, 1);
}
#content {
  position: absolute;
  display: inline-block;
  top: 40px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(240, 240, 240, 1);
  padding: 5px 10px;
  width: 35%;
  & > div {
    background: rgba(52, 52, 57, 1);
    height: 137px;
    width: 100%;
    border: 1px solid rgba(108, 108, 108, 0.8);
  }
  .slicing-text {
    padding: 0 !important;
    border-bottom: 1px solid rgba(108, 108, 108, 0.8);
    & > span:first-child {
      padding: 5px 0;
      display: inline-block;
      width: 140px;
      text-align: right;
      border-right: 1px solid rgba(108, 108, 108, 0.8);
    }
    & > span:last-child {
      padding-left: 30px;
    }
  }
  .slicing-text:last-child {
    border: none;
  }
}
</style>
