<template>
  <div class="gold-form" id="chart">
  </div>
</template>

<script>
import { getElevationSlicingOption } from './chart-config'
// const echarts = require('echarts')
export default {
  components: {},
  props: ['slicingData'],
  data () {
    return {
      chart: null
    }
  },
  computed: {
  },
  watch: {

    slicingData () {
      if (!this.chart) {
        this.chart = echarts.init(document.getElementById('chart'))
      }
      if (!this.slicingData) {
        this.chart.setOption({})
      } else {
        this.chart.setOption(getElevationSlicingOption(this.slicingData.distance, this.slicingData.elevation))
      }
    }

  },
  mounted () {
    window.onresize = (val) => {
      this.chart && this.chart.resize();
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>
