/**
 * 高程剖面chart配置
 */
const ElevationSlicingOption = {
  legend: {
    data: ['高程(米)'],
    x: 'right',
    y: '-3'
    // textStyle: {
    //   color: '#a3a7b8',
    //   fontFamily: 'PingFangSC-Regular',
    //   fontSize: 13
    // }
  },
  grid: {
    left: '40',
    right: '25',
    top: '20',
    bottom: '25'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    },
    formatter: '距离{b0}<br />高程{c0}'
  },
  //   toolbox: {
  //     feature: {
  //       dataZoom: {
  //         yAxisIndex: 'none'
  //       },
  //       restore: {},
  //       saveAsImage: {}
  //     }
  //   },
  xAxis: {
    type: 'category',
    boundaryGap: false
    // axisLabel: {
    //   color: '#a3a7b8',
    //   fontFamily: 'PingFangSC-Regular',
    //   fontSize: 13,
    //   showMaxLabel: true,
    //   showMinLabel: true
    // },
    // axisLine: {
    //   lineStyle: {
    //     color: 'rgba(93,93,97,1)'
    //   }
    // }
    // data: [0, 30, 60, 90, 120]
  },
  yAxis: {
    type: 'value',
    min: 'dataMin'
    // axisLabel: {
    //   color: '#a3a7b8',
    //   fontFamily: 'PingFangSC-Regular',
    //   fontSize: 13,
    //   showMaxLabel: true,
    //   showMinLabel: true
    // },
    // axisLine: {
    //   lineStyle: {
    //     color: 'rgba(93,93,97,1)'
    //   }
    // },
    // splitLine: {
    //   lineStyle: {
    //     color: 'rgba(93,93,97,1)'
    //   }
    // }
  },
  series: [{
    name: '高程(米)',
    type: 'line',
    smooth: true,
    // label: {
    //   normal: {
    //     show: true,
    //     position: 'top'
    //   }
    // },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(25,185,172,1)'
        },
        {
          offset: 1,
          color: 'rgba(25,185,172,0.1)'
        }
        ],
        global: false
      }
    },
    lineStyle: {
      width: 1,
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(25,185,172,1)'
        }],
        global: false
      }
    },
    itemStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(25,185,172,1)'
        }],
        global: false
      }
    }
    // data: [122, 123, 156, 565, 200]
  }]
}

/**
 * 获取高程剖面chart配置
 * @param {Array} distanceArr
 * @param {Array} elevationArr
 */
export function getElevationSlicingOption (distanceArr, elevationArr) {
  const option = Object.assign(ElevationSlicingOption, {
    xAxis: {
      data: distanceArr
    },
    series: [
      Object.assign(ElevationSlicingOption.series[0], {
        data: elevationArr
      })
    ]
  })
  return option
}
