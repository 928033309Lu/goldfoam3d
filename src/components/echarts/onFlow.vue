<template>
  <div :id="id" class="echarts"></div>
</template>
<script>
  import echarts from 'echarts'
  import lineEcharts from "@/components/echarts/line.js"
  export default {
    data() {
      return {
      }
    },
    props: ['dataset', 'id'],
    mounted() {
    },
    methods: {
      drawEchart(o) {
        let vm = this;
        vm.color = {}
        let option = {
          animation: false,
          id: vm.id,
          color: o && o.series.map((v, k)=>{
            let color = ''
            if(['A', '2A'].includes(v.name)){
              color = '#1B7DE2'
            }else if(['B', '2B'].includes(v.name)){
              color = '#1CD7BC'
            }else if(v.name === 'C'){
              color = '#FF2E76'
            }else {
              // color =  `rgb(${vm.hslToRgb.apply(this,vm.hslArray[k])})`
              color =  `#895FDE`
            }
            return color
          }) || [],
          xAxis: [{
            name: '风速（m/s）',
            data: o && o.windSpeeds.slice(0, 23),
            markline: {},
            boundaryGap: false,
            nameLocation: 'center',
            nameTextStyle: {
              color: 'rgba(255, 255, 255, .7)',
              padding: [10, 10, 0, 150]
            },
          }],
          grid: {
            right: 10,
            left: 10,
            bottom: 20
          },
          legend: {
            // type: 'scroll',
            // orient: 'vertical',
            // right: 40,
            // top: 20,
            bottom: 0,
            icon: 'roundRect',
            itemWidth:14,
            inactiveColor: 'rgba(43, 103, 139, .4)',
            show: false
          },
          tooltip: {
            formatter: (params)=>{
              let col = Math.ceil(params.length/10)
              let str = `${params[0].name}m/s<br/>`;
              params.forEach((v, k)=>{
                str += `<p style="display: inline-block; width:${100/col}%">${v.marker}${v.seriesName}: ${o.series[k].pre || ''}${v.value.toFixed(3)}${o.series[k].unit || ''}</p> ${((k+1)%col == 0)?'<br/>': ''}`
              })
              return str;
            }
          },
          yAxis: [{
            name: '湍流强度',
            min: 0,
          }],
          series: o && o.series || []
        }
        lineEcharts.initEachrts(option)
      },
    },
    watch: {
      dataset(v){
        this.$nextTick(()=>{
          this.drawEchart(v)
      })
      }
    }
  }
</script>
