<template>
  <div class="noise-panel lineColor">
    <contain-triangle :top="true" :left="true" :length="25" :line="'two'"></contain-triangle>
    <contain-triangle :bottom="true" :right="true" :length="25" :transform="true" :line="'two'"></contain-triangle>
    <flat-triangle class="triangle" :top="true" :right="true" :transform="true"></flat-triangle>
    <flat-triangle class="triangle" :bottom="true" :left="true"></flat-triangle>

    <div class="slider-input">
      <div>透明度：</div>
      <el-slider v-model="opacity" :show-input-controls="false" :show-tooltip="false" input-size="mini" show-input :max="100" :min="0" @change="change"></el-slider>
      <span class="danwei">%</span>
    </div>
    <div class="noiseImg">
      <div class="imgsBox">
        <img :src="publicPath+'/images/noise.png'" alt="" />
        <div class="legend">
          <p>&nbsp; <small><small> 0 ~30</small></small></p>
          <p>&nbsp; <small><small> 30~35</small></small></p>
          <p>&nbsp; <small><small> 35~40</small></small></p>
          <p>&nbsp; <small><small> 40~45</small></small></p>
          <p>&nbsp; <small><small> 45~50</small></small></p>
          <p>&nbsp; <small><small> 50~55</small></small></p>
          <p>&nbsp; <small><small> 55~60</small></small></p>
          <p>&nbsp; <small><small> 60~65</small></small></p>
          <p>&nbsp; <small><small> 65~70</small></small></p>
          <p>&nbsp; <small><small> 70~75</small></small></p>
          <p>&nbsp; <small><small> 75~80</small></small></p>
          <p>&nbsp; <small><small> 80~85</small></small></p>
          <p>&nbsp; <small><small> ≥85 &nbsp;&nbsp;</small></small></p>
        </div>
      </div>
      <div class="bottom tri_top">
        噪音(分贝)
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
      opacity: 50
    }
  },
  computed: {

  },
  watch: {

  },

  mounted () {
    this.change()
  },
  methods: {
    change () {
      this.$emit('noiseChange', (100 - this.opacity) / 100)
    }
  }
}
</script>

<style lang="less" scoped>
.noiseImg {
  position: fixed;
  right: 120px;
  top: 490px;
  z-index: 9;
  color: #fff;
  width: 80px;
  height: 214px;
  border: 1px solid rgba(211, 219, 228, 0.8);
  font-size: 13px;
  text-align: center;
  .imgsBox {
    height: 182px;
    display: flex;
    justify-content: center;
    padding: 8px 0 0 0;
    img {
      display: inline-block;
      height: 165px;
    }
    .legend {
      p {
        padding: 0;
        margin: 0;
        font-size: 8px;
        height: 12.5px;
        line-height: 13px;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: rgba(25, 33, 46, 1);
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .tri_top:before {
    content: "";
    width: 0px;
    height: 0px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #ff2e76;
    position: absolute;
    bottom: 0px;
    right: -4px;
    transform: rotate(135deg);
  }
}
.noise-panel {
  position: fixed;
  left: 80px;
  top: 592px;
  width: 300px;
  height: 70px;
  border-radius: 0 40px 0 40px;
  background: #1d2a41;
  opacity: 0.8;
  // border: 1px solid #989898;
  color: #fff;
  padding: 0 30px;
  display: flex;
  align-items: center;
  /deep/ .triangle .two {
    top: -10px !important;
  }
  /deep/ .triangle .one {
    left: -1px !important;
  }
  .slider-input {
    display: flex;
    align-items: center;
    position: relative;
  }
  .danwei {
    position: absolute;
    right: -18px;
    top: 9px;
  }
}
.noise-panel /deep/ .el-slider {
  width: 160px !important;
}
.noise-panel /deep/ .el-input__inner {
  height: 25px !important;
  line-height: 25px !important;
  width: 120px !important;
  background: rgba(0, 0, 0, 0) !important;
  border-radius: inherit !important;
  padding: 0 0 0 10px !important;
  border: 1px solid rgba(240, 240, 240, 0.8) !important;
  color: rgba(240, 240, 240, 1) !important;
}
.noise-panel /deep/ .el-input__inner::placeholder {
  font-size: 13px;
}
.noise-panel /deep/ .el-input__icon {
  line-height: 25px !important;
}
</style>
