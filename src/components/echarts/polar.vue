<template>
  <div :id="id" class="echarts"></div>
</template>
<style lang="less">
  .echarts,
  .echarts-full{
    position: relative;
    .device-select{
      position: absolute;
      left: 10px;
      top: 10px;
      width: 100px;
      z-index: 1;
      .el-input__inner{
        background-color: transparent;
        border: none;
      }
    }
  }
</style>
<script>
  import echarts from 'echarts'
  import polarEcharts from "./polar"
  export default {
    data() {
      return {
        curDevice: '',
        options: [],
      }
    },
    props: ['id','windSet'],
    mounted() {},
    methods: {
      initData(d){
        polarEcharts.initEachrts({
          id: this.id,
          legend: {
            show: false
          },
          angleAxis: {
            axisTick: {
              show: true
            },
          },
          radiusAxis: {
            // splitLine: {
            //     color: 'red'
            // },
            // splitArea: {
            //   //show: true
            // },
            //   axisLine: {
            //       show: true,
            //       lineStyle: {
            //           color: 'rgba(137, 137, 137, 0.5)'
            //       }
            //   },
          },
          series: d.legend.map((k)=>{
            return {
              data: d.series[k].map(m=>{
                return m.toFixed(2)
              }),
              name: k+'m/s',
            }
          })
        })
      }
    },
    watch: {
      windSet: function(cur){
        this.$nextTick(()=>{
          this.initData(cur)
        })
      }
    }

  }
</script>
