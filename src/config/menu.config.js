const map3dMenus = [{
  name: '项目概览',
  icon: 'iconfont iconi-xm',
  size: '32px'
  // fn: 'viewAction',
  // component: 'project-view-panel'
}, {
  name: '风机',
  icon: 'iconfont iconfengji2',
  size: '40px',
  children: [{
    name: '风参表',
    icon: 'iconfont iconbiaoge',
    fn: 'showFanGrid',
    component: 'fan-list-panel'
  }, {
    name: '尾流效果',
    icon: 'iconfont iconwake',
    fn: 'wakeFlow',
    component: 'wake-flow-panel'
  }, {
    name: '风险区',
    icon: 'iconfont iconfx',
    fn: 'risk',
    component: 'risk-panel'
  }, {
    name: '噪音',
    icon: 'iconfont iconzaoyin',
    fn: 'noise',
    component: 'noise-panel'
  }, {
    name: '遮挡分析',
    icon: 'iconfont icondimian',
    fn: 'visualAnalyse',
    component: 'visual-analyse-panel'
  }]
}, {
  name: '测风塔',
  size: '32px',
  icon: 'iconfont icondianta1',
  children: [{
    name: '汇总信息',
    icon: 'iconfont iconbiaoge',
    fn: 'showTowerGrid',
    component: 'tower-data-panel'
  }, {
    name: '置信度',
    icon: 'iconfont icon11farendaibiaotongyong',
    fn: 'credit',
    component: 'credit-panel'
  }]
},
  // {
  //   name: '限制性<br>区域',
  //   size: '36px',
  //   icon: 'iconfont iconmianjiceliang',
  //   children: []
  // },
{
  name: '风图谱',
  size: '30px',
  icon: 'iconfont iconmap',
  children: []
}, {
  name: '测量',
  icon: 'iconfont iconceliang',
  children: []
}, {
  name: '标绘',
  size: '28px',
  icon: 'iconfont iconsheji1',
  children: []
}
]
export {
  map3dMenus
}
