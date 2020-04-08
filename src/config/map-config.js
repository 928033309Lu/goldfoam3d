/**
 * 三维地图基础设置
 */
export const CesiumConfig = {
  // terrainUrl: 'https://goldlink.goldwind.com.cn/gwmapapi/tilesets/china_mesh',
  terrainUrl: 'http://52.82.2.121:8000/tilesets/srtm_china_terrain',
  imageMapUrl: 'http://52.82.2.121/gmap/vt/lyrs=s&x={x}&y={y}&z={z}'
  // defaultView: {
  //   east: 106.48,
  //   west: 106.33,
  //   north: 37.45,
  //   south: 37.35
  // }
}
/**
 * 置信度图例
 */
export const CreditLegends = [{
  value: 0.1,
  color: 'rgb(0, 0, 255)'
},
{
  value: 0.2,
  color: 'rgb(54, 97, 255)'
},
{
  value: 0.3,
  color: 'rgb(56, 172, 255)'
},
{
  value: 0.4,
  color: 'rgb(0, 255, 255)'
},
{
  value: 0.5,
  color: 'rgb(145, 255, 180)'
},
{
  value: 0.6,
  color: 'rgb(210, 255, 105)'
},
{
  value: 0.7,
  color: 'rgb(255, 255, 0)'
},
{
  value: 0.8,
  color: 'rgb(255, 183, 0)'
},
{
  value: 0.9,
  color: 'rgb(255, 111, 0)'
},
{
  value: '1.0',
  color: 'rgb(255, 0, 0)'
}
]
