export default class ImageLayerGroup {
  constructor (viewer, options) {
    this.viewer = viewer
    this.options = options

    this._layerArray = []
  }
  hasLayer (imageLayer) {
    // return this.viewer.imageryLayers.contains(imageLayer)
    return this._layerArray.indexOf(imageLayer) >= 0
  }
  addLayer (imageLayer) {
    if (!imageLayer) return
    this.viewer.imageryLayers.add(imageLayer)
    this._layerArray.push(imageLayer)
  }
  removeLayer (imageLayer) {
    if (!imageLayer || !this.hasLayer(imageLayer)) return
    this.viewer.imageryLayers.remove(imageLayer, true)
    this._layerArray.splice(this._layerArray.indexOf(imageLayer), 1)
  }
  clearLayers () {
    this._layerArray.forEach(imageLayer => {
      this.viewer.imageryLayers.remove(imageLayer, true)
    })
    this._layerArray = []
  }
  bringToBack () {
    // 将图层组所有图层保持上下顺序依次调整到最底层
    for (let i = this._layerArray.length - 1; i >= 0; i--) {
      this.viewer.imageryLayers.lowerToBottom(this._layerArray[i])
    }
  }

  /**
     * 将图层组中的指定的图层 移到 图层组中所有图层的最顶层
     * @param {*} imageLayer
     */
  bringLayerToFront (imageLayer) {
    if (!this.hasLayer(imageLayer)) return
    let layerIndex = this.viewer.imageryLayers.indexOf(imageLayer)
    let maxIndex = -1
    this._layerArray.forEach(item => {
      maxIndex = this.viewer.imageryLayers.indexOf(item)
    })
    if (maxIndex <= layerIndex) return
    while (maxIndex !== layerIndex) {
      this.viewer.imageryLayers.raise(imageLayer)
      layerIndex++
    }
    this._layerArray.splice(this._layerArray.indexOf(imageLayer), 1)
    this._layerArray.push(imageLayer)
  }
}
