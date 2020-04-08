<template>
  <div class="map3d-panel root lineColor">
    <contain-triangle :top="true" :left="true" :length="25" :line="'two'"></contain-triangle>
    <contain-triangle :bottom="true" :right="true" :length="25" :transform="true" :line="'two'"></contain-triangle>
    <flat-triangle class="triangle" :top="true" :right="true" :transform="true"></flat-triangle>
    <flat-triangle class="triangle2" :bottom="true" :left="true"></flat-triangle>
    <div class="tip-text">提示：点击风机查看遮挡分析</div>
    <div class="distance slider-input">
      <div class="label">距离</div>：
      <el-slider v-model="distance" :show-input-controls="false" :show-tooltip="false" input-size="mini" show-input :max="11" :min="2" @change="change"></el-slider>
      <span class="danwei">D</span>
    </div>
    <div class="slider-input">
      <div>透明度：</div>
      <el-slider v-model="opacity" :show-input-controls="false" :show-tooltip="false" input-size="mini" show-input :max="100" :min="0" @change="change"></el-slider>
      <span class="danwei">%</span>
    </div>
  </div>
</template>

<script>
import containTriangle from '@/components/triangle-model/contain-triangle.vue'
import flatTriangle from '@/components/triangle-model/flat-triangle.vue'
export default {
  name: "visual-analyse-panel",
  components: {
    containTriangle,
    flatTriangle
  },
  data () {
    return {
      distance: 5,
      opacity: 50
    }
  },
  props: {

  },
  mounted () {
    this.change()
  },
  methods: {

    change () {
      // 将透明度转为 不透明度，取值范围为0-1
      const opacity = (100 - this.opacity) / 100
      this.$emit("visual-analyse-change", { distance: this.distance, opacity })
    }
  }
}
</script>

<style lang="less" scoped>
.map3d-panel {
  &.root {
    position: fixed;
    left: 80px;
    top: 531px;
    width: 300px;
    height: 132px;
    padding: 10px 25px 0 35px;
    border-radius: 0 40px 0 40px;
    background: #1d2a41;
    opacity: 0.8;
    // border: 1px solid #009fff;
    color: #fff;
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
    /deep/ .triangle {
      right: -1px !important;
      .two {
        top: -10px !important;
      }
    }
    .triangle2 {
      left: -1px !important;
      bottom: -2px !important;
      .one {
        left: -1px !important;
      }
    }
  }
}
.danwei {
  position: absolute;
  right: 5px;
  top: 9px;
}
.map3d-panel /deep/ .el-slider {
  width: 160px !important;
}
.map3d-panel /deep/ .el-input__inner {
  height: 25px !important;
  line-height: 25px !important;
  width: 120px !important;
  background: rgba(0, 0, 0, 0) !important;
  border-radius: inherit !important;
  padding: 0 0 0 10px !important;
  border: 1px solid rgba(240, 240, 240, 0.8) !important;
  color: rgba(240, 240, 240, 1) !important;
}
.map3d-panel /deep/ .el-input__inner::placeholder {
  font-size: 13px;
}
.map3d-panel /deep/ .el-input__icon {
  line-height: 25px !important;
}
.label {
  width: 42px;
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
.tip-text {
  font-weight: 300;
  color: rgba(31, 234, 178, 1);
  line-height: 38px;
}
</style>
