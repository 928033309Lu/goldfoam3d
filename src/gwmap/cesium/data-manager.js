import electricLayer from './electric-layer'
import envConfig from '@/config/env-config'

const RiskColor = ['#E2032D', '#A800FF'] // 风机风险类型颜色[窝风颜色,背风颜色]
const DefaultHighLightColor = '#00fffc'

const dataManager = {}

let visualAnalyseModule = null
let visualAnalyseOpen = false // 通视分析是否打开
let visualAnalyseOptions = false // 通视分析设置
let riskOpen = false // 风险区是否打开
let riskShowWoFeng = false // 是否显示窝风
let riskShowBeiFeng = false // 是否显示背风

let wakeFlowModuele = null // 尾流
let wakeFlowOpen = false // 尾流是否打开

let turbineModule = null
let mastModule = null
let currentHighlightModel = null // 当前高亮数据 {type,id}

let turbinesData = [] // 风机数据
dataManager.currentShowDetailItem = null
dataManager.turbinesLocationOptions = null // 风机图层缩放设置
dataManager.turbinesRiskData = null // 风机风险数据
dataManager.sectionData = null // 扇区数据

dataManager.featureClicked = null // 要素点击选中回调函数
// 将选中数据设为高亮
dataManager.setFeatureHighLight = function (type, id, highlight = true) {
  dataManager.clearHighLight()
  id = String(id)
  switch (type) {
    case 'turbine':
      turbineModule && turbineModule.setModelHighLight(id, highlight)
      break
    case 'mast':
      mastModule && mastModule.setModelHighLight(id, highlight)
      break
  }
  if (highlight) {
    currentHighlightModel = {
      type,
      id
    }
  }
}
// 清空高亮样式
dataManager.clearHighLight = function () {
  if (!currentHighlightModel) return
  const id = currentHighlightModel.id
  const type = currentHighlightModel.type
  currentHighlightModel = null
  dataManager.setFeatureHighLight(type, id, false)
}

// 缩放到指定图层
dataManager.locat2Layer = function (type) {
  switch (type) {
    case 'turbine':
    default:
      turbineModule && turbineModule.layerLocation(dataManager.turbinesLocationOptions)
      break
    case 'mast':
      mastModule && mastModule.layerLocation({
        duration: 0
      })
      break
  }
}

// 缩放到指定要素
// ids 要素数据id数组 如“['1','2']”
dataManager.locat2FeatureByIds = function (type, ids) {
  switch (type) {
    case 'turbine':
      turbineModule && turbineModule.modelLocation(ids, {
        duration: 0.1
      })
      break
    case 'mast':
      mastModule && mastModule.modelLocation(ids, {
        duration: 0.1
      })
      break
  }
}

// 设置扇区数据
dataManager.setSectionData = function (sections) {
  dataManager.sectionData = []
  if (!sections) return

  const halfAngle = 360 / sections.length / 2
  sections.forEach(section => {
    dataManager.sectionData.push({
      centerAngleValue: Number(section),
      centerAngle: section,
      startAngle: Number(section) - halfAngle,
      endAngle: Number(section) + halfAngle
    })
  })
}

// 开启 风机通视分析功能
dataManager.openVisualAnalyse = function (opacity, radius) {
  if (visualAnalyseOpen) return
  visualAnalyseOpen = true
  if (!visualAnalyseModule) {
    visualAnalyseModule = new WindEarth.VisualAnalyseModule(gwmap.viewer)
  }
  dataManager.changeVisualDomain(opacity, radius)
}

// 关闭 风机通视分析功能
dataManager.closeVisualAnalyse = function () {
  if (!visualAnalyseOpen) return
  visualAnalyseOpen = false
  visualAnalyseModule && visualAnalyseModule.removeAll(false)
}

// 设置 风机通视分析功能 参数
dataManager.changeVisualDomain = function (opacity, radius) {
  console.log(opacity)
  visualAnalyseOptions = {
    opacity,
    radius: radius || 1
  }
  visualAnalyseModule && visualAnalyseModule.changeVisualDomain({
    opacity: visualAnalyseOptions.opacity,
    radius: computeTurbineRadius(visualAnalyseOptions.radius)
  })
}

// 开启 尾流功能
dataManager.openWakeFlow = function (opacity, radius) {
  if (wakeFlowOpen) return
  wakeFlowOpen = true
  if (!wakeFlowModuele) {
    wakeFlowModuele = new WindEarth.WakeFlowModule(gwmap.viewer)
    wakeFlowModuele.defaultStyle.fillColor = 'rgba(46,243,255,0.1)'
  }
}

// 关闭 尾流功能
dataManager.closeWakeFlow = function () {
  if (!wakeFlowOpen) return
  wakeFlowOpen = false
  wakeFlowModuele && wakeFlowModuele.removeAll(false)
  dataManager.updateTurbinesAngle() // 恢复风机朝向
}

// 设置 尾流功能 参数
dataManager.changeWakeFlow = function (section) {
  if (!wakeFlowModuele || !turbineModule) return
  wakeFlowModuele.removeAll(false)

  turbineModule.modelLayer.entities.values.forEach((entity) => {
    const turbine = getTurbineDataByTag(entity.id)
    if (!turbine.sectionWake || !turbine.sectionWake[section.centerAngle] || !turbine.sectionWake[section.centerAngle].affectRange) return
    const coord = entity.coord
    // wakeFlowModuele.createWakeFlow(`综合尾流：/t${Number(turbine.wakedReductionRatio).toFixed(2)}%/n${section.centerAngleValue}°尾流：/t${Number(turbine.sectionWake[section.centerAngle].affectRadio).toFixed(2)}% `, {
    wakeFlowModuele.createWakeFlow(`综合尾流：/t${Number(turbine.wakedReductionRatio).toFixed(2)}% `, {
      id: entity.id,
      positions: [coord[0], coord[1], coord[2] + 90],
      radius: turbine.sectionWake[section.centerAngle].affectRange,
      startAngle: section.startAngle + 180,
      endAngle: section.endAngle + 180
    })
  })

  dataManager.updateTurbinesAngle(section.centerAngleValue) // 修改风机朝向
}

// 是否已经加载了 风机
dataManager.turbinesLoaded = function () {
  return turbineModule !== null
}
// 添加风机
dataManager.addTurbines = function (turbines) {
  if (!turbines) return
  if (!turbineModule) {
    turbineModule = new WindEarth.ModelWithBillboardModule(gwmap.viewer)
    turbineModule._defaultStyle.labelStyle.width = 140
    turbineModule.labelOffsetHeight = 90
    turbineModule._hideHeight = 25000
    turbineModule.highLightColor = DefaultHighLightColor
    turbineModule.modelClickChanged.addEventListener(function (event) {
      if (dataManager.currentShowDetailItem) {
        dataManager.featureClicked && dataManager.featureClicked('turbine', null)
        dataManager.currentShowDetailItem = null
      }

      if (currentHighlightModel && riskOpen) {
        const turbine = getTurbineRiskDataByTag(currentHighlightModel.id)
        if (turbine) {
          if (turbine.isMainDirectInBlock) {
            turbineModule.changeModelColor(turbine.tag, RiskColor[0], !riskShowWoFeng)
          } else if (turbine.isMainDirectInLea) {
            turbineModule.changeModelColor(turbine.tag, RiskColor[1], !riskShowBeiFeng)
          }
        }
        currentHighlightModel = null
      }
      if (!event.feature) return
      currentHighlightModel = {
        type: 'turbine',
        id: event.feature[0]
      }
      // 开启风险区、透视分析时关闭featureClicked
      if (!riskOpen && !visualAnalyseOpen && dataManager.featureClicked) {
        dataManager.featureClicked('turbine', event.feature[0])
        dataManager.currentShowDetailItem = event.feature[0]
      }
      // 开启风险区时，缩放到风机
      if (riskOpen) {
        turbineModule.modelLocation([event.feature[0]], {
          duration: 0.1
        })
      }
      // 透视分析
      if (visualAnalyseOpen && event.coord) {
        visualAnalyseModule.createrVisualDomain({
          positions: [event.coord[0], event.coord[1], event.coord[2] + 90], // 透视面使用风机 轮毂高度 hubHeight
          opacity: visualAnalyseOptions.opacity,
          radius: computeTurbineRadius(visualAnalyseOptions.radius)
        }, true)
      }
    }, this)
  }
  dataManager.removeTurbines()
  turbinesData = turbines

  let maxX = 0
  let minX = Number.MAX_VALUE
  gwmap.getPositionByXYZ(turbines, () => {
    turbines.forEach((item) => {
      // const position = gwmap.proj4To84(item.x, item.y)
      // position.push(item.z)
      console.log(`${item.tag}  ${item.z}  ${item._position[2]}`)
      turbineModule.loadModelWithBillboard({
        id: item.tag,
        name: item.tag,
        positions: item._position,
        url: envConfig.publicPath + '/models/205-3.gltf',
        angle: item.mainWindDirection
      })
      maxX = maxX < item.x ? item.x : maxX
      minX = minX > item.x ? item.x : minX
    })
    dataManager.turbinesLocationOptions = {
      duration: 0,
      offset: new WindEarth.HeadingPitchRange(0, -0.17, (maxX - minX) * 1.33)
    }
    turbineModule.layerLocation(dataManager.turbinesLocationOptions)
  })
}

// 修改风机朝向角度
dataManager.updateTurbinesAngle = function (angle = null) {
  if (!turbineModule || !turbinesData) return
  if (angle === null || isNaN(angle)) {
    turbinesData.forEach((item) => {
      turbineModule.changeModelProperty(item.tag, {
        angle: item.mainWindDirection
      })
    })
  } else {
    turbinesData.forEach((item) => {
      turbineModule.changeModelProperty(item.tag, {
        angle: angle
      })
    })
  }
}
// 显示或隐藏 风机图层
dataManager.showHideTurbines = function (visible) {
  turbineModule && turbineModule.setModelVisible(visible)
}
// 显示或隐藏 风机标签
dataManager.showHideTurbineLabels = function (visible) {
  turbineModule && turbineModule.setLableVisible(visible)
}
// 移除风机图层
dataManager.removeTurbines = function () {
  turbineModule && turbineModule.removeAll(false)
  turbinesData = []
}

// 显示风机风险状态
// showWoFeng 显示窝风
// showBeiFeng 显示背风
// showLower 显示发电量低标签
dataManager.showTurbineRisk = function (showWoFeng, showBeiFeng, showLower) {
  riskOpen = true
  riskShowWoFeng = showWoFeng
  riskShowBeiFeng = showBeiFeng
  if (!turbinesData || !dataManager.turbinesRiskData || !turbineModule) return
  dataManager.turbinesRiskData.forEach(item => {
    if (item.isMainDirectInBlock) {
      turbineModule.changeModelColor(item.tag, RiskColor[0], !showWoFeng)
      return
    }
    if (item.isMainDirectInLea) {
      turbineModule.changeModelColor(item.tag, RiskColor[1], !showBeiFeng)
    }
  })

  // 显示或关闭发电量标签
  if (showLower) {
    const lowerTrubines = []
    dataManager.turbinesRiskData.forEach(turbine => {
      if (!turbine.isElectric) {
        return
      }
      const temp = turbinesData.find(item => item.tag === turbine.tag)
      if (temp) {
        lowerTrubines.push(temp)
      }
    })
    electricLayer.load(lowerTrubines)
  } else {
    electricLayer.remove()
  }
}

// 关闭风机风险状态
dataManager.closeTurbineRisk = function () {
  gwmap.dataManager.showTurbineRisk(false, false, false)
  electricLayer.remove()
  riskOpen = false
}

// 是否已经加载了 测风塔
dataManager.mastsLoaded = function () {
  return mastModule !== null
}
// 添加测风塔
dataManager.addMasts = function (masts) {
  if (!masts) return
  if (!mastModule) {
    mastModule = new WindEarth.ModelWithBillboardModule(gwmap.viewer)
    mastModule._defaultStyle.labelStyle.width = 140
    mastModule._defaultStyle.labelStyle.fillColor = '#ff9c00'
    mastModule._defaultStyle.modelStyle.scale = 0.5
    mastModule.labelOffsetHeight = 150
    mastModule._hideHeight = 25000
    mastModule.highLightColor = DefaultHighLightColor
    mastModule.modelClickChanged.addEventListener(function (event) {
      if (!event.feature) return
      currentHighlightModel = {
        type: 'mast',
        id: event.feature[0]
      }
      if (dataManager.featureClicked) {
        dataManager.featureClicked('mast', event.feature[0])
        dataManager.currentShowDetailItem = event.feature[0]
      }
    }, this)
  }
  dataManager.removeMasts()
  gwmap.getPositionByXYZ(masts, () => {
    masts.forEach((item) => {
      // const position = gwmap.proj4To84(item.x, item.y)
      // position.push(item.z)
      mastModule.loadModelWithBillboard({
        id: item.tag,
        name: item.tag,
        positions: item._position,
        url: envConfig.publicPath + '/models/04.gltf'
      })
    })
  })
}
// 显示或隐藏 测风塔图层
dataManager.showHideMasts = function (visible) {
  mastModule && mastModule.setModelVisible(visible)
}
// 移除测风塔图层
dataManager.removeMasts = function () {
  mastModule && mastModule.removeAll(false)
}

export default dataManager

// 计算用于透视分析的半径
// radius 风机半径设置 单位为D 如3D、5D
function computeTurbineRadius (radius) {
  if (!currentHighlightModel) return radius
  const turbineData = getTurbineDataByTag(currentHighlightModel.id)
  if (!turbineData) return radius
  return turbineData.rotorDiameter * radius
}

function getTurbineDataByTag (tag) {
  if (!tag || !turbinesData) return null
  return turbinesData.find(item => item.tag === tag)
}

function getTurbineRiskDataByTag (tag) {
  if (!tag || !dataManager.turbinesRiskData) return null
  return dataManager.turbinesRiskData.find(item => item.tag === tag)
}
