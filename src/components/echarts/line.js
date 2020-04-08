'use strict'
import echarts from 'echarts';

export default {
  initEachrts: function (o) {
    let option = {
      title: {
        text: o.name || ''
      },
      legend: Object.assign({
        bottom: 15,
        icon: 'roundRect',
        itemWidth: 14,
        itemHeight: 14,
        lineHeight: 14,
        borderWidth: 0,
        padding: 0,
        textStyle: {
          color: 'rgba(255, 255, 255, .7)',
          padding: [2, 0, 0, 0],
        }
      }, o.legend || {}),
      tooltip: Object.assign({
        trigger: 'axis',
        axisPointer: Object.assign({
          type: 'cross',
          label: {
            backgroundColor: '#666666',
            formatter: (v)=>{return typeof(v.value) == 'number' && parseFloat(String(v.value).replace(',','')).toFixed(1) || v.value}
          }
        }, o.tooltip && o.tooltip.axisPointer || {}),
        formatter: (params)=>{
          let str = `${params[0].name}<br/>`;
          params.forEach((v, k)=>{
            str += `${v.marker}${v.seriesName}: ${o.series[k].pre || ''}${v.value}${o.series[k].unit || ''} ${(k < (params.length-1))?'<br/>': ''}`
          })
          return str;
        }
      },o.tooltip || {}),
      grid: Object.assign({
        top: 50,
        bottom: 50,
        left: 40,
        right: 70,
        containLabel: true //决定的是包括了坐标轴标签在内的所有内容所形成的矩形的位置。
      },o.grid || {}),
      xAxis: (o.xAxis && o.xAxis.length>0 && o.xAxis.map((v)=>{
        return Object.assign({
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: '#034972'
            }
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, .7)'
          },
          nameTextStyle: {
            color: 'rgba(255, 255, 255, .7)'
          }
        },v)
      })) || [],
      yAxis: (o.yAxis && o.yAxis.length>0 && o.yAxis.map((v)=>{
        return Object.assign({
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: '#034972',
              type: 'solid'
            },
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, .7)',
            formatter: (v)=>{
              return (String(v).replace(',', ''))
            }
          },
          axisLine: {
            lineStyle: {
              color: '#034972'
            }
          },
          nameTextStyle: {
            color: 'rgba(255, 255, 255, .7)'
          }
        }, v)
      }))|| [],
      series: (o.series && o.series.length>0 && o.series.map((v)=>{
        return Object.assign({
          type: 'line',
          showSymbol: false,
        },v)
      })) || []
    };
    o.color && (option.color = o.color)
    o.dataZoomInsideShow && (option.dataZoom = [
      Object.assign({type: 'inside', start: 0, end: 45,zoomLock:o.zoomLock?true:false},o.dataZoomInside||{}),
      Object.assign({
        show: o.dataZoomShow || false,
        type: 'slider',
        start: 0, //数据窗口范围的起始百分比。范围是：0 ~ 100。
        end: 45,   //数据窗口范围的结束百分比。范围是：0 ~ 100。
        textStyle: {
          color: 'rgba(255, 255, 255, .7)'
        },
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      }, o.dataZoomPos || {})
    ])
    setTimeout(function () {
      let myChart = echarts.init(document.getElementById(o.id))
      myChart.setOption(option);
    },10)
  }
}
