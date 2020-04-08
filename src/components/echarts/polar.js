'use strict'
import echarts from 'echarts'

const dir = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
const radarDir = clockData(dir)

function clockData(arr) {
    const newarr = Object.assign([], arr)
    newarr.reverse()
    newarr.unshift(newarr[newarr.length - 1])
    newarr.pop()
    return newarr
}

const colorDefault = ['#0022F4', '#007EFF', '#1BC4E2', '#3BF5BE', '#C3EC34', '#EC7F1F']
export default {
    initEachrts: function (o) {
        let colors = o.colors && o.colors.length > 0 && o.colors || ['#0022F4', '#007EFF', '#1BC4E2', '#3BF5BE', '#C3EC34', '#EC7F1F']
        let option = {
            colors: colors,
            angleAxis: Object.assign({
                type: 'category',
                data: dir,
                z: 0,
                boundaryGap: false,
                splitNumber: 10,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#898989',
                        type: 'solid'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#898989'
                    }
                },
                axisLabel: {
                    interval: 0,
                    color: 'rgba(255,255,255,.7)',
                    fontSize: 8
                }
            }, o.angleAxis || {}),
            radiusAxis: Object.assign({
                splitLine: {
                    lineStyle: {
                        color: 'rgba(137, 137, 137, 0.5)'
                    }
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['RGBA(248, 249, 253, 0)', 'rgba(3, 73, 114, 0)']
                    }
                },
                axisLabel: {
                    color: 'rgba(255,255,255,.7)'
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(137, 137, 137, 0.5)'
                    }
                },
            }, o.radiusAxis),
            tooltip: Object.assign({
                trigger: 'item'
            }, o.tooltip || {}),
            polar: {},
            legend: Object.assign({
                // show: o.id.startsWith('flowRose') ? false : true,
                bottom: 10,
                right: 20,
                orient: 'vertical',
                itemWidth: 18,
                itemHeight: 10,
                inactiveColor: 'rgba(43, 103, 139, .4',
                textStyle: {
                    color: 'rgba(255, 255, 255, .7)',
                    padding: [2, 0, 0, 0],
                },
                formatter: function (name) {
                    return name.slice(0, -3)
                }
            }, o.legend),
            series: o.series.map((v, k) => {
                let obj = {
                    type: 'bar',
                    coordinateSystem: 'polar',
                    stack: 'a',
                    itemStyle: {
                        normal: {
                            color: colors[k] || colors[k % colors.length]
                        }
                    }
                }
                o.id.startsWith('flowRose') && delete obj.itemStyle
                return Object.assign(obj, v)
            })
        }
        setTimeout(function () {
            let myChart = echarts.init(document.getElementById(o.id))
            myChart.setOption(option)
        }, 10)
    },
    setRadarOption: function (o) {
        let option = {
            color: '#1b7de2',
            legend: Object.assign({
                show: true,
                bottom: 10,
                right: 20,
                orient: 'vertical',
                itemWidth: 18,
                itemHeight: 10,
                // formatter: function (name) {
                //   return name.slice(0,-3)
                // }
            }, o.legend || {}),
            radar: {
                shape: 'circle',
                name: {
                    textStyle: {
                        color: 'rgba(255,255,255,.7)',
                    }
                },
                nameGap: 10,
                indicator: radarDir.map((v, k) => {
                    return {
                        name: v,
                        max: o.radar[k]
                    }
                }),
                splitArea: {
                    show: true,
                    areaStyle: o.areaStyle || {
                        color: ['RGBA(248, 249, 253, 0)', 'rgba(3, 73, 114, 0)']
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#034972',
                        type: 'solid'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#034972',
                        type: 'solid'
                    }
                },
                axisLabel: {
                    color: 'rgba(255,255,255,.7)'
                },
            },
            tooltip: {
                trigger: 'item',
                // formatter: '{b}: {c}'
                position: ['50%', '20%'],
                formatter: (params) => {
                    let str = `${params.name}m/s`;
                    let sortParams = clockData(params.value)
                    let avg = Math.ceil(sortParams.length / 2)
                    sortParams.forEach((v, k) => {
                        if (k < avg) {
                            str += `<br><p style="display: inline-block; width:40%; padding-right: 10px; margin-right: 10px;">${dir[k]}: ${v}</p>`
                            str += `<p style="display: inline-block; width:40%; padding-right: 10px; margin-right: 10px;">${dir[k + avg]}: ${sortParams[k + avg]}</p>`

                        }
                        // if(k%2==0){
                        //   str += '<br/>'
                        // }
                        // str += `<p style="display: inline-block;width:40%; padding-right: 10px; margin-right: 10px;">${dir[k]}: ${v}</p>`
                    })
                    return str;
                }
            },
            series: [{
                type: 'radar',
                data: o.series.data
            }]
        }
        o.title && (option.title = Object.assign({
            show: true,
            left: 'center',
            top: 'bottom',
            textStyle: {
                color: 'rgba(255,255,255,.7)',
                fontSize: '14'
            }
        }, o.title))
        return option;
    },
    setRadarIndicator(arr) {
        let indicator = []
        radarDir.forEach((v, k) => {
            indicator.push({
                name: v,
                max: arr[k]
            })
        })
        return indicator
    }
}
