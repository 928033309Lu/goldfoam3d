export function getProj4Def (epsg) {
  if (!CrsDef.hasOwnProperty('EPSG:' + epsg)) {
    console.log('警告：没有找到参考系EPSG:' + epsg + '，已改用默认的WGS84进行坐标转换。')
    return
  }
  return CrsDef['EPSG:' + epsg]
}

export function proj4From84 (toEpsg, coordinates, lonlat = true) {
  return proj4ByEpsg('4326', toEpsg, coordinates, lonlat)
}
export function proj4To84 (fromEpsg, coordinates, lonlat = true) {
  return proj4ByEpsg(fromEpsg, '4326', coordinates, lonlat)
}
export function proj4ByEpsg (fromEpsg, toEpsg, coordinates, lonlat = true) {
  const fromProj = getProj4Def(fromEpsg)
  const toProj = getProj4Def(toEpsg)
  return proj4ByDef(fromProj, toProj, coordinates, lonlat)
}
export function proj4From84WithArray (toEpsg, coordinatesArray, lonlat = true) {
  return proj4ByEpsgWithArray('4326', toEpsg, coordinatesArray, lonlat)
}
export function proj4To84WithArray (fromEpsg, coordinatesArray, lonlat = true) {
  return proj4ByEpsgWithArray(fromEpsg, '4326', coordinatesArray, lonlat)
}
export function proj4ByEpsgWithArray (fromEpsg, toEpsg, coordinatesArray, lonlat = true) {
  const fromProj = getProj4Def(fromEpsg)
  const toProj = getProj4Def(toEpsg)
  if (!fromEpsg || !toProj || !coordinatesArray || !coordinatesArray.hasOwnProperty('length')) {
    return null
  }
  const result = []
  coordinatesArray.forEach(coordinates => {
    result.push(proj4ByDef(fromProj, toProj, coordinates, lonlat))
  })
  return result
}

function proj4ByDef (fromProj, toProj, coordinates, lonlat = true) {
  if (!fromProj || !toProj || !coordinates || !coordinates.hasOwnProperty('length') || coordinates.length !== 2) {
    return null
  }
  /* eslint-disable */
  if (lonlat) {
    return proj4(fromProj, toProj, [Number(coordinates[0]), Number(coordinates[1])])
  } else {
    let temp = proj4(fromProj, toProj, [Number(coordinates[1]), Number(coordinates[0])])
    return [temp[1], temp[0]]
  }
  /* eslint-enable */
}

const CrsDef = {
  'EPSG:4326': '+proj=longlat +datum=WGS84 +no_defs',
  // # Xian 1980 / Gauss-Kruger zone 13
  'EPSG:2327': '+proj=tmerc +lat_0=0 +lon_0=75 +k=1.000000 +x_0=13500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / Gauss-Kruger zone 14
  'EPSG:2328': '+proj=tmerc +lat_0=0 +lon_0=81 +k=1.000000 +x_0=14500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / Gauss-Kruger zone 15
  'EPSG:2329': '+proj=tmerc +lat_0=0 +lon_0=87 +k=1.000000 +x_0=15500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / Gauss-Kruger zone 16
  'EPSG:2330': '+proj=tmerc +lat_0=0 +lon_0=93 +k=1.000000 +x_0=16500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / Gauss-Kruger zone 17
  'EPSG:2331': '+proj=tmerc +lat_0=0 +lon_0=99 +k=1.000000 +x_0=17500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / Gauss-Kruger zone 18
  'EPSG:2332': '+proj=tmerc +lat_0=0 +lon_0=105 +k=1.000000 +x_0=18500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / Gauss-Kruger zone 19
  'EPSG:2333': '+proj=tmerc +lat_0=0 +lon_0=111 +k=1.000000 +x_0=19500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / Gauss-Kruger zone 20
  'EPSG:2334': '+proj=tmerc +lat_0=0 +lon_0=117 +k=1.000000 +x_0=20500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / Gauss-Kruger zone 21
  'EPSG:2335': '+proj=tmerc +lat_0=0 +lon_0=123 +k=1.000000 +x_0=21500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / Gauss-Kruger zone 22
  'EPSG:2336': '+proj=tmerc +lat_0=0 +lon_0=129 +k=1.000000 +x_0=22500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / Gauss-Kruger zone 23
  'EPSG:2337': '+proj=tmerc +lat_0=0 +lon_0=135 +k=1.000000 +x_0=23500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / Gauss-Kruger CM 75E
  'EPSG:2338': '+proj=tmerc +lat_0=0 +lon_0=75 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / Gauss-Kruger CM 81E
  'EPSG:2339': '+proj=tmerc +lat_0=0 +lon_0=81 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / Gauss-Kruger CM 87E
  'EPSG:2340': '+proj=tmerc +lat_0=0 +lon_0=87 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / Gauss-Kruger CM 93E
  'EPSG:2341': '+proj=tmerc +lat_0=0 +lon_0=93 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / Gauss-Kruger CM 99E
  'EPSG:2342': '+proj=tmerc +lat_0=0 +lon_0=99 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / Gauss-Kruger CM 105E
  'EPSG:2343': '+proj=tmerc +lat_0=0 +lon_0=105 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / Gauss-Kruger CM 111E
  'EPSG:2344': '+proj=tmerc +lat_0=0 +lon_0=111 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / Gauss-Kruger CM 117E
  'EPSG:2345': '+proj=tmerc +lat_0=0 +lon_0=117 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / Gauss-Kruger CM 123E
  'EPSG:2346': '+proj=tmerc +lat_0=0 +lon_0=123 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / Gauss-Kruger CM 129E
  'EPSG:2347': '+proj=tmerc +lat_0=0 +lon_0=129 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / Gauss-Kruger CM 135E
  'EPSG:2348': '+proj=tmerc +lat_0=0 +lon_0=135 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger zone 25
  'EPSG:2349': '+proj=tmerc +lat_0=0 +lon_0=75 +k=1.000000 +x_0=25500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger zone 26
  'EPSG:2350': '+proj=tmerc +lat_0=0 +lon_0=78 +k=1.000000 +x_0=26500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger zone 27
  'EPSG:2351': '+proj=tmerc +lat_0=0 +lon_0=81 +k=1.000000 +x_0=27500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger zone 28
  'EPSG:2352': '+proj=tmerc +lat_0=0 +lon_0=84 +k=1.000000 +x_0=28500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger zone 29
  'EPSG:2353': '+proj=tmerc +lat_0=0 +lon_0=87 +k=1.000000 +x_0=29500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger zone 30
  'EPSG:2354': '+proj=tmerc +lat_0=0 +lon_0=90 +k=1.000000 +x_0=30500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger zone 31
  'EPSG:2355': '+proj=tmerc +lat_0=0 +lon_0=93 +k=1.000000 +x_0=31500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger zone 32
  'EPSG:2356': '+proj=tmerc +lat_0=0 +lon_0=96 +k=1.000000 +x_0=32500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger zone 33
  'EPSG:2357': '+proj=tmerc +lat_0=0 +lon_0=99 +k=1.000000 +x_0=33500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger zone 34
  'EPSG:2358': '+proj=tmerc +lat_0=0 +lon_0=102 +k=1.000000 +x_0=34500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger zone 35
  'EPSG:2359': '+proj=tmerc +lat_0=0 +lon_0=105 +k=1.000000 +x_0=35500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger zone 36
  'EPSG:2360': '+proj=tmerc +lat_0=0 +lon_0=108 +k=1.000000 +x_0=36500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger zone 37
  'EPSG:2361': '+proj=tmerc +lat_0=0 +lon_0=111 +k=1.000000 +x_0=37500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger zone 38
  'EPSG:2362': '+proj=tmerc +lat_0=0 +lon_0=114 +k=1.000000 +x_0=38500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger zone 39
  'EPSG:2363': '+proj=tmerc +lat_0=0 +lon_0=117 +k=1.000000 +x_0=39500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger zone 40
  'EPSG:2364': '+proj=tmerc +lat_0=0 +lon_0=120 +k=1.000000 +x_0=40500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger zone 41
  'EPSG:2365': '+proj=tmerc +lat_0=0 +lon_0=123 +k=1.000000 +x_0=41500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger zone 42
  'EPSG:2366': '+proj=tmerc +lat_0=0 +lon_0=126 +k=1.000000 +x_0=42500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger zone 43
  'EPSG:2367': '+proj=tmerc +lat_0=0 +lon_0=129 +k=1.000000 +x_0=43500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger zone 44
  'EPSG:2368': '+proj=tmerc +lat_0=0 +lon_0=132 +k=1.000000 +x_0=44500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger zone 45
  'EPSG:2369': '+proj=tmerc +lat_0=0 +lon_0=135 +k=1.000000 +x_0=45500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger CM 75E
  'EPSG:2370': '+proj=tmerc +lat_0=0 +lon_0=75 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger CM 78E
  'EPSG:2371': '+proj=tmerc +lat_0=0 +lon_0=78 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger CM 81E
  'EPSG:2372': '+proj=tmerc +lat_0=0 +lon_0=81 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger CM 84E
  'EPSG:2373': '+proj=tmerc +lat_0=0 +lon_0=84 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger CM 87E
  'EPSG:2374': '+proj=tmerc +lat_0=0 +lon_0=87 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger CM 90E
  'EPSG:2375': '+proj=tmerc +lat_0=0 +lon_0=90 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger CM 93E
  'EPSG:2376': '+proj=tmerc +lat_0=0 +lon_0=93 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger CM 96E
  'EPSG:2377': '+proj=tmerc +lat_0=0 +lon_0=96 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger CM 99E
  'EPSG:2378': '+proj=tmerc +lat_0=0 +lon_0=99 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger CM 102E
  'EPSG:2379': '+proj=tmerc +lat_0=0 +lon_0=102 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger CM 105E
  'EPSG:2380': '+proj=tmerc +lat_0=0 +lon_0=105 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger CM 108E
  'EPSG:2381': '+proj=tmerc +lat_0=0 +lon_0=108 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger CM 111E
  'EPSG:2382': '+proj=tmerc +lat_0=0 +lon_0=111 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger CM 114E
  'EPSG:2383': '+proj=tmerc +lat_0=0 +lon_0=114 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger CM 117E
  'EPSG:2384': '+proj=tmerc +lat_0=0 +lon_0=117 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger CM 120E
  'EPSG:2385': '+proj=tmerc +lat_0=0 +lon_0=120 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger CM 123E
  'EPSG:2386': '+proj=tmerc +lat_0=0 +lon_0=123 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger CM 126E
  'EPSG:2387': '+proj=tmerc +lat_0=0 +lon_0=126 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger CM 129E
  'EPSG:2388': '+proj=tmerc +lat_0=0 +lon_0=129 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger CM 132E
  'EPSG:2389': '+proj=tmerc +lat_0=0 +lon_0=132 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Xian 1980 / 3-degree Gauss-Kruger CM 135E
  'EPSG:2390': '+proj=tmerc +lat_0=0 +lon_0=135 +k=1.000000 +x_0=500000 +y_0=0 +a=6378140 +b=6356755.288157528 +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger zone 13
  'EPSG:21413': '+proj=tmerc +lat_0=0 +lon_0=75 +k=1.000000 +x_0=13500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger zone 14
  'EPSG:21414': '+proj=tmerc +lat_0=0 +lon_0=81 +k=1.000000 +x_0=14500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger zone 15
  'EPSG:21415': '+proj=tmerc +lat_0=0 +lon_0=87 +k=1.000000 +x_0=15500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger zone 16
  'EPSG:21416': '+proj=tmerc +lat_0=0 +lon_0=93 +k=1.000000 +x_0=16500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger zone 17
  'EPSG:21417': '+proj=tmerc +lat_0=0 +lon_0=99 +k=1.000000 +x_0=17500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger zone 18
  'EPSG:21418': '+proj=tmerc +lat_0=0 +lon_0=105 +k=1.000000 +x_0=18500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger zone 19
  'EPSG:21419': '+proj=tmerc +lat_0=0 +lon_0=111 +k=1.000000 +x_0=19500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger zone 20
  'EPSG:21420': '+proj=tmerc +lat_0=0 +lon_0=117 +k=1.000000 +x_0=20500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger zone 21
  'EPSG:21421': '+proj=tmerc +lat_0=0 +lon_0=123 +k=1.000000 +x_0=21500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger zone 22
  'EPSG:21422': '+proj=tmerc +lat_0=0 +lon_0=129 +k=1.000000 +x_0=22500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger zone 23
  'EPSG:21423': '+proj=tmerc +lat_0=0 +lon_0=135 +k=1.000000 +x_0=23500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger CM 75E
  'EPSG:21453': '+proj=tmerc +lat_0=0 +lon_0=75 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger CM 81E
  'EPSG:21454': '+proj=tmerc +lat_0=0 +lon_0=81 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger CM 87E
  'EPSG:21455': '+proj=tmerc +lat_0=0 +lon_0=87 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger CM 93E
  'EPSG:21456': '+proj=tmerc +lat_0=0 +lon_0=93 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger CM 99E
  'EPSG:21457': '+proj=tmerc +lat_0=0 +lon_0=99 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger CM 105E
  'EPSG:21458': '+proj=tmerc +lat_0=0 +lon_0=105 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger CM 111E
  'EPSG:21459': '+proj=tmerc +lat_0=0 +lon_0=111 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger CM 117E
  'EPSG:21460': '+proj=tmerc +lat_0=0 +lon_0=117 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger CM 123E
  'EPSG:21461': '+proj=tmerc +lat_0=0 +lon_0=123 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger CM 129E
  'EPSG:21462': '+proj=tmerc +lat_0=0 +lon_0=129 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger CM 135E
  'EPSG:21463': '+proj=tmerc +lat_0=0 +lon_0=135 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger 13N
  'EPSG:21473': '+proj=tmerc +lat_0=0 +lon_0=75 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger 14N
  'EPSG:21474': '+proj=tmerc +lat_0=0 +lon_0=81 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger 15N
  'EPSG:21475': '+proj=tmerc +lat_0=0 +lon_0=87 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger 16N
  'EPSG:21476': '+proj=tmerc +lat_0=0 +lon_0=93 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger 17N
  'EPSG:21477': '+proj=tmerc +lat_0=0 +lon_0=99 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger 18N
  'EPSG:21478': '+proj=tmerc +lat_0=0 +lon_0=105 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger 19N
  'EPSG:21479': '+proj=tmerc +lat_0=0 +lon_0=111 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger 20N
  'EPSG:21480': '+proj=tmerc +lat_0=0 +lon_0=117 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger 21N
  'EPSG:21481': '+proj=tmerc +lat_0=0 +lon_0=123 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger 22N
  'EPSG:21482': '+proj=tmerc +lat_0=0 +lon_0=129 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / Gauss-Kruger 23N
  'EPSG:21483': '+proj=tmerc +lat_0=0 +lon_0=135 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger zone 25
  'EPSG:2401': '+proj=tmerc +lat_0=0 +lon_0=75 +k=1.000000 +x_0=25500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger zone 26
  'EPSG:2402': '+proj=tmerc +lat_0=0 +lon_0=78 +k=1.000000 +x_0=26500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger zone 27
  'EPSG:2403': '+proj=tmerc +lat_0=0 +lon_0=81 +k=1.000000 +x_0=27500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger zone 28
  'EPSG:2404': '+proj=tmerc +lat_0=0 +lon_0=84 +k=1.000000 +x_0=28500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger zone 29
  'EPSG:2405': '+proj=tmerc +lat_0=0 +lon_0=87 +k=1.000000 +x_0=29500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger zone 30
  'EPSG:2406': '+proj=tmerc +lat_0=0 +lon_0=90 +k=1.000000 +x_0=30500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger zone 31
  'EPSG:2407': '+proj=tmerc +lat_0=0 +lon_0=93 +k=1.000000 +x_0=31500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger zone 32
  'EPSG:2408': '+proj=tmerc +lat_0=0 +lon_0=96 +k=1.000000 +x_0=32500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger zone 33
  'EPSG:2409': '+proj=tmerc +lat_0=0 +lon_0=99 +k=1.000000 +x_0=33500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger zone 34
  'EPSG:2410': '+proj=tmerc +lat_0=0 +lon_0=102 +k=1.000000 +x_0=34500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger zone 35
  'EPSG:2411': '+proj=tmerc +lat_0=0 +lon_0=105 +k=1.000000 +x_0=35500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger zone 36
  'EPSG:2412': '+proj=tmerc +lat_0=0 +lon_0=108 +k=1.000000 +x_0=36500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger zone 37
  'EPSG:2413': '+proj=tmerc +lat_0=0 +lon_0=111 +k=1.000000 +x_0=37500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger zone 38
  'EPSG:2414': '+proj=tmerc +lat_0=0 +lon_0=114 +k=1.000000 +x_0=38500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger zone 39
  'EPSG:2415': '+proj=tmerc +lat_0=0 +lon_0=117 +k=1.000000 +x_0=39500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger zone 40
  'EPSG:2416': '+proj=tmerc +lat_0=0 +lon_0=120 +k=1.000000 +x_0=40500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger zone 41
  'EPSG:2417': '+proj=tmerc +lat_0=0 +lon_0=123 +k=1.000000 +x_0=41500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger zone 42
  'EPSG:2418': '+proj=tmerc +lat_0=0 +lon_0=126 +k=1.000000 +x_0=42500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger zone 43
  'EPSG:2419': '+proj=tmerc +lat_0=0 +lon_0=129 +k=1.000000 +x_0=43500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger zone 44
  'EPSG:2420': '+proj=tmerc +lat_0=0 +lon_0=132 +k=1.000000 +x_0=44500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger zone 45
  'EPSG:2421': '+proj=tmerc +lat_0=0 +lon_0=135 +k=1.000000 +x_0=45500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger CM 75E
  'EPSG:2422': '+proj=tmerc +lat_0=0 +lon_0=75 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger CM 78E
  'EPSG:2423': '+proj=tmerc +lat_0=0 +lon_0=78 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger CM 81E
  'EPSG:2424': '+proj=tmerc +lat_0=0 +lon_0=81 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger CM 84E
  'EPSG:2425': '+proj=tmerc +lat_0=0 +lon_0=84 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger CM 87E
  'EPSG:2426': '+proj=tmerc +lat_0=0 +lon_0=87 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger CM 90E
  'EPSG:2427': '+proj=tmerc +lat_0=0 +lon_0=90 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger CM 93E
  'EPSG:2428': '+proj=tmerc +lat_0=0 +lon_0=93 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger CM 96E
  'EPSG:2429': '+proj=tmerc +lat_0=0 +lon_0=96 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger CM 99E
  'EPSG:2430': '+proj=tmerc +lat_0=0 +lon_0=99 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger CM 102E
  'EPSG:2431': '+proj=tmerc +lat_0=0 +lon_0=102 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger CM 105E
  'EPSG:2432': '+proj=tmerc +lat_0=0 +lon_0=105 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger CM 108E
  'EPSG:2433': '+proj=tmerc +lat_0=0 +lon_0=108 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger CM 111E
  'EPSG:2434': '+proj=tmerc +lat_0=0 +lon_0=111 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger CM 114E
  'EPSG:2435': '+proj=tmerc +lat_0=0 +lon_0=114 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger CM 117E
  'EPSG:2436': '+proj=tmerc +lat_0=0 +lon_0=117 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger CM 120E
  'EPSG:2437': '+proj=tmerc +lat_0=0 +lon_0=120 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger CM 123E
  'EPSG:2438': '+proj=tmerc +lat_0=0 +lon_0=123 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger CM 126E
  'EPSG:2439': '+proj=tmerc +lat_0=0 +lon_0=126 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger CM 129E
  'EPSG:2440': '+proj=tmerc +lat_0=0 +lon_0=129 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger CM 132E
  'EPSG:2441': '+proj=tmerc +lat_0=0 +lon_0=132 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # Beijing 1954 / 3-degree Gauss-Kruger CM 135E
  'EPSG:2442': '+proj=tmerc +lat_0=0 +lon_0=135 +k=1.000000 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs  no_defs',
  // # CGCS2000 / Gauss-Kruger zone 13
  'EPSG:4491': '+proj=tmerc +lat_0=0 +lon_0=75 +k=1 +x_0=13500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / Gauss-Kruger zone 14
  'EPSG:4492': '+proj=tmerc +lat_0=0 +lon_0=81 +k=1 +x_0=14500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / Gauss-Kruger zone 15
  'EPSG:4493': '+proj=tmerc +lat_0=0 +lon_0=87 +k=1 +x_0=15500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / Gauss-Kruger zone 16
  'EPSG:4494': '+proj=tmerc +lat_0=0 +lon_0=93 +k=1 +x_0=16500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / Gauss-Kruger zone 17
  'EPSG:4495': '+proj=tmerc +lat_0=0 +lon_0=99 +k=1 +x_0=17500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / Gauss-Kruger zone 18
  'EPSG:4496': '+proj=tmerc +lat_0=0 +lon_0=105 +k=1 +x_0=18500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / Gauss-Kruger zone 19
  'EPSG:4497': '+proj=tmerc +lat_0=0 +lon_0=111 +k=1 +x_0=19500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / Gauss-Kruger zone 20
  'EPSG:4498': '+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=20500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / Gauss-Kruger zone 21
  'EPSG:4499': '+proj=tmerc +lat_0=0 +lon_0=123 +k=1 +x_0=21500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / Gauss-Kruger zone 22
  'EPSG:4500': '+proj=tmerc +lat_0=0 +lon_0=129 +k=1 +x_0=22500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / Gauss-Kruger zone 23
  'EPSG:4501': '+proj=tmerc +lat_0=0 +lon_0=135 +k=1 +x_0=23500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / Gauss-Kruger CM 75E
  'EPSG:4502': '+proj=tmerc +lat_0=0 +lon_0=75 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / Gauss-Kruger CM 81E
  'EPSG:4503': '+proj=tmerc +lat_0=0 +lon_0=81 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / Gauss-Kruger CM 87E
  'EPSG:4504': '+proj=tmerc +lat_0=0 +lon_0=87 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / Gauss-Kruger CM 93E
  'EPSG:4505': '+proj=tmerc +lat_0=0 +lon_0=93 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / Gauss-Kruger CM 99E
  'EPSG:4506': '+proj=tmerc +lat_0=0 +lon_0=99 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / Gauss-Kruger CM 105E
  'EPSG:4507': '+proj=tmerc +lat_0=0 +lon_0=105 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / Gauss-Kruger CM 111E
  'EPSG:4508': '+proj=tmerc +lat_0=0 +lon_0=111 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / Gauss-Kruger CM 117E
  'EPSG:4509': '+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / Gauss-Kruger CM 123E
  'EPSG:4510': '+proj=tmerc +lat_0=0 +lon_0=123 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / Gauss-Kruger CM 129E
  'EPSG:4511': '+proj=tmerc +lat_0=0 +lon_0=129 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / Gauss-Kruger CM 135E
  'EPSG:4512': '+proj=tmerc +lat_0=0 +lon_0=135 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger zone 25
  'EPSG:4513': '+proj=tmerc +lat_0=0 +lon_0=75 +k=1 +x_0=25500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger zone 26
  'EPSG:4514': '+proj=tmerc +lat_0=0 +lon_0=78 +k=1 +x_0=26500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger zone 27
  'EPSG:4515': '+proj=tmerc +lat_0=0 +lon_0=81 +k=1 +x_0=27500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger zone 28
  'EPSG:4516': '+proj=tmerc +lat_0=0 +lon_0=84 +k=1 +x_0=28500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger zone 29
  'EPSG:4517': '+proj=tmerc +lat_0=0 +lon_0=87 +k=1 +x_0=29500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger zone 30
  'EPSG:4518': '+proj=tmerc +lat_0=0 +lon_0=90 +k=1 +x_0=30500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger zone 31
  'EPSG:4519': '+proj=tmerc +lat_0=0 +lon_0=93 +k=1 +x_0=31500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger zone 32
  'EPSG:4520': '+proj=tmerc +lat_0=0 +lon_0=96 +k=1 +x_0=32500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger zone 33
  'EPSG:4521': '+proj=tmerc +lat_0=0 +lon_0=99 +k=1 +x_0=33500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger zone 34
  'EPSG:4522': '+proj=tmerc +lat_0=0 +lon_0=102 +k=1 +x_0=34500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger zone 35
  'EPSG:4523': '+proj=tmerc +lat_0=0 +lon_0=105 +k=1 +x_0=35500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger zone 36
  'EPSG:4524': '+proj=tmerc +lat_0=0 +lon_0=108 +k=1 +x_0=36500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger zone 37
  'EPSG:4525': '+proj=tmerc +lat_0=0 +lon_0=111 +k=1 +x_0=37500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger zone 38
  'EPSG:4526': '+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=38500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger zone 39
  'EPSG:4527': '+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=39500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger zone 40
  'EPSG:4528': '+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=40500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger zone 41
  'EPSG:4529': '+proj=tmerc +lat_0=0 +lon_0=123 +k=1 +x_0=41500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger zone 42
  'EPSG:4530': '+proj=tmerc +lat_0=0 +lon_0=126 +k=1 +x_0=42500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger zone 43
  'EPSG:4531': '+proj=tmerc +lat_0=0 +lon_0=129 +k=1 +x_0=43500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger zone 44
  'EPSG:4532': '+proj=tmerc +lat_0=0 +lon_0=132 +k=1 +x_0=44500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger zone 45
  'EPSG:4533': '+proj=tmerc +lat_0=0 +lon_0=135 +k=1 +x_0=45500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger CM 75E
  'EPSG:4534': '+proj=tmerc +lat_0=0 +lon_0=75 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger CM 78E
  'EPSG:4535': '+proj=tmerc +lat_0=0 +lon_0=78 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger CM 81E
  'EPSG:4536': '+proj=tmerc +lat_0=0 +lon_0=81 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger CM 84E
  'EPSG:4537': '+proj=tmerc +lat_0=0 +lon_0=84 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger CM 87E
  'EPSG:4538': '+proj=tmerc +lat_0=0 +lon_0=87 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger CM 90E
  'EPSG:4539': '+proj=tmerc +lat_0=0 +lon_0=90 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger CM 93E
  'EPSG:4540': '+proj=tmerc +lat_0=0 +lon_0=93 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger CM 96E
  'EPSG:4541': '+proj=tmerc +lat_0=0 +lon_0=96 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger CM 99E
  'EPSG:4542': '+proj=tmerc +lat_0=0 +lon_0=99 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger CM 102E
  'EPSG:4543': '+proj=tmerc +lat_0=0 +lon_0=102 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger CM 105E
  'EPSG:4544': '+proj=tmerc +lat_0=0 +lon_0=105 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger CM 108E
  'EPSG:4545': '+proj=tmerc +lat_0=0 +lon_0=108 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger CM 111E
  'EPSG:4546': '+proj=tmerc +lat_0=0 +lon_0=111 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger CM 114E
  'EPSG:4547': '+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger CM 117E
  'EPSG:4548': '+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger CM 120E
  'EPSG:4549': '+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger CM 123E
  'EPSG:4550': '+proj=tmerc +lat_0=0 +lon_0=123 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger CM 126E
  'EPSG:4551': '+proj=tmerc +lat_0=0 +lon_0=126 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger CM 129E
  'EPSG:4552': '+proj=tmerc +lat_0=0 +lon_0=129 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger CM 132E
  'EPSG:4553': '+proj=tmerc +lat_0=0 +lon_0=132 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs ',
  // # CGCS2000 / 3-degree Gauss-Kruger CM 135E
  'EPSG:4554': '+proj=tmerc +lat_0=0 +lon_0=135 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs '
}
