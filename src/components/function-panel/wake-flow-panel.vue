<template>
  <div class="wake-flow-panel lineColor">
    <contain-triangle :top="true" :left="true" :length="25" :line="'two'"></contain-triangle>
    <contain-triangle :bottom="true" :right="true" :length="25" :transform="true" :line="'two'"></contain-triangle>
    <flat-triangle class="triangle" :top="true" :right="true" :transform="true"></flat-triangle>
    <flat-triangle class="triangle2" :bottom="true" :left="true"></flat-triangle>
    <!-- <div class="distance slider-input">
      <div class="label">起始角度：</div>
      <el-slider v-model="startAngle" :show-input-controls="false" :show-tooltip="false" input-size="mini" show-input :max="360" :min="0" @change="change"></el-slider>
      <span class="danwei">°</span>
    </div>
    <div class="distance slider-input">
      <div class="label">截止角度：</div>
      <el-slider v-model="endAngle" :show-input-controls="false" :show-tooltip="false" input-size="mini" show-input :max="360" :min="0" @change="change"></el-slider>
      <span class="danwei">°</span>
    </div>
    <div class="slider-input">
      <div>尾流半径：</div>
      <el-slider v-model="radius" :show-input-controls="false" :show-tooltip="false" input-size="mini" show-input :max="1000" :min="10" @change="change"></el-slider>
      <span class="danwei">m</span>
    </div> -->
    <span>{{currentItem.centerAngleValue}}°</span>
    <div id="flowContent">
      <div v-for="(item,index) in wakeFolwData" :key="'wake'+index" :class="index===currentIndex?'flow-item selected-flow-item':'flow-item'" :style="'transform: rotate('+item.startAngle+'deg) skewY('+skewY+'deg);'" @click="changeWake(item,index)"></div>
      <div id="innerCircle">
        <div id="centerCircle">
          <img id="centerLine" :src="publicPath+'/images/dir_line.png'" :style="'transform: rotate('+lineDir+'deg);'" />
          <div id="centerPoint">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import containTriangle from '@/components/triangle-model/contain-triangle.vue'
import flatTriangle from '@/components/triangle-model/flat-triangle.vue'
export default {
  components: {
    containTriangle,
    flatTriangle
  },
  props: {

  },
  data () {
    return {
      // startAngle: 30,
      // endAngle: 90,
      // radius: 200,
      wakeFolwData: [],
      currentIndex: -1,
      currentItem: {}
    }
  },
  computed: {
    wakeSlice () {
      return 360 / this.wakeFolwData.length
    },
    skewY () {
      return this.wakeSlice - 90
    },
    lineDir () {
      return this.currentIndex * this.wakeSlice
    }
  },
  watch: {

  },

  mounted () {
    this.wakeFolwData = gwmap.dataManager.sectionData
    if (!this.wakeFolwData || this.wakeFolwData.length === 0) return
    this.changeWake(this.wakeFolwData[0], 0)
  },
  methods: {
    changeWake (item, index) {
      this.currentItem = item
      this.currentIndex = index
      this.$emit("wake-flow-change", item)
    }
  }
}
</script>

<style lang="less" scoped>
.wake-flow-panel {
  position: fixed;
  left: 80px;
  top: 488px;
  width: 175px;
  height: 175px;
  border-radius: 0 40px 0 40px;
  background: #1d2a41;
  opacity: 0.8;
  // border: 1px solid #989898;
  color: #fff;
  padding: 5px 0 0px 21px;
  & > span {
    position: relative;
    top: 13px;
  }
  /deep/ .triangle {
    right: -1px !important;
    .two {
      top: -10px !important;
    }
  }

  .triangle2 {
    left: -1px !important;
    bottom: -2px !important;
  }

  & > div {
    display: flex;
    align-items: center;
  }
  .distance {
    height: 30px;
  }
  .slider-input {
    position: relative;
  }
}
.danwei {
  position: absolute;
  right: 5px;
  top: 9px;
}
.wake-flow-panel /deep/ .el-slider {
  width: 160px !important;
}
.wake-flow-panel /deep/ .el-input__inner {
  height: 25px !important;
  line-height: 25px !important;
  width: 120px !important;
  background: rgba(0, 0, 0, 0) !important;
  border-radius: inherit !important;
  padding: 0 0 0 10px !important;
  border: 1px solid rgba(240, 240, 240, 0.8) !important;
  color: rgba(240, 240, 240, 1) !important;
}
.wake-flow-panel /deep/ .el-input__inner::placeholder {
  font-size: 13px;
}
.wake-flow-panel /deep/ .el-input__icon {
  line-height: 25px !important;
}
.label {
  width: 76px;
  text-align: justify;
  vertical-align: top;
  position: relative;
  left: 1px;
  top: 8px;
  &::after {
    display: inline-block;
    width: 100%;
    content: "";
    height: 0;
  }
}

#flowContent {
  position: absolute;
  margin: 5px;
  padding: 0;
  width: 122px;
  height: 122px;
  border-radius: 50%;
  list-style: none;
  overflow: hidden;
  border: 1px rgba(224, 224, 224, 0.4) solid;
  .flow-item {
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 50%;
    transform-origin: 0% 100%;
    border-left: 1px solid rgba(211, 219, 228, 1);
    background: rgba(211, 219, 228, 0.2);
    &:hover {
      background: rgba(224, 224, 224, 0.65);
      cursor: pointer;
      border-left: 1px rgba(224, 224, 224, 0.65) solid;
      border-right: 1px rgba(224, 224, 224, 0.65) solid;
    }
  }

  .selected-flow-item {
    background: rgba(224, 224, 224, 0.65);
    cursor: pointer;
    border-left: 1px rgba(224, 224, 224, 0.65) solid;
    border-right: 1px rgba(224, 224, 224, 0.65) solid;
  }
  #innerCircle {
    z-index: 1;
    background: rgba(25, 33, 46, 1);
    border: 1px solid rgba(211, 219, 228, 1);
    border-radius: 50%;
    margin: 19px;
    width: 82px;
    height: 82px;
    #centerCircle {
      background: rgba(211, 219, 228, 0.3);
      border: 1px solid rgba(211, 219, 228, 1);
      border-radius: 50%;
      margin: 15px;
      width: 50px;
      height: 50px;
      #centerPoint {
        background: rgba(54, 153, 255, 1);
        border: 1px solid rgba(170, 170, 170, 1);
        border-radius: 50%;
        margin: 20px;
        width: 9px;
        height: 9px;
      }
      #centerLine {
        height: 50px;
        width: 20px;
        position: absolute;
        left: 50px;
      }
    }
  }
}
</style>
