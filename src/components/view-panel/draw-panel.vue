<template>
  <div class="draw-panel lineColor">
    <contain-triangle :top="true" :left="true" :length="25" :line="'two'"></contain-triangle>
    <contain-triangle :bottom="true" :right="true" :length="25" :transform="true" :line="'two'"></contain-triangle>
    <flat-triangle class="triangle" :top="true" :right="true" :transform="true"></flat-triangle>
    <flat-triangle :bottom="true" :left="true"></flat-triangle>

    <div class="content">
      <div class="tool">
        <el-tooltip class="item" :visible-arrow="false" effect="light" content="绘制点" placement="top">
          <span @click="onChangeDraw(0)" :class="{activeCol: drawActiveArr[0]}"> <i class="iconfont icondingwei2"></i> </span>
        </el-tooltip>
        <el-tooltip class="item" :visible-arrow="false" effect="light" content="绘制线" placement="top">
          <span @click="onChangeDraw(1)" :class="{activeCol: drawActiveArr[1]}"> <i class="iconfont iconweibiaoti2" style="font-size: 27px;"></i> </span>
        </el-tooltip>
        <el-tooltip class="item" :visible-arrow="false" effect="light" content="绘制面" placement="top">
          <span @click="onChangeDraw(2)" :class="{activeCol: drawActiveArr[2]}"> <i class="iconfont iconduobianxing"></i> </span>
        </el-tooltip>
        <el-tooltip class="item" :visible-arrow="false" effect="light" content="绘制箭头" placement="top">
          <span @click="onChangeDraw(3)" :class="{activeCol: drawActiveArr[3]}"> <i class="iconfont iconpaixu"></i> </span>
        </el-tooltip>
        <el-tooltip class="item" :visible-arrow="false" effect="light" content="清空标绘" placement="top">
          <span @click="onChangeDraw(4)" :class="{activeCol: drawActiveArr[4]}"> <i class="iconfont iconxiangpica"></i> </span>
        </el-tooltip>
      </div>
      <div class="tool-color">
        <div class="label">颜色</div>：
        <div class="divCol">
          <div @click="onChangeColor('rgba(255,0,0,1)' ,0)" :class="{redActive: colorActiveArr[0]}" class="red"></div>
          <div @click="onChangeColor('rgba(255,0,216,1)' ,1)" :class="{pinkActive: colorActiveArr[1]}" class="pink"></div>
          <div @click="onChangeColor('rgba(255,234,0,1)' ,2)" :class="{yellowActive: colorActiveArr[2]}" class="yellow"></div>
          <div @click="onChangeColor('rgba(0,174,255,1)' ,3)" :class="{blueActive: colorActiveArr[3]}" class="blue"></div>
          <div @click="onChangeColor('rgba(0,255,42,1)' ,4)" :class="{greenActive: colorActiveArr[4]}" class="green"></div>
        </div>
      </div>
      <div class="tool-opacity">
        <div>透明度：</div>
        <el-slider @change="sliderChange" v-model="value" :min="0" :max="100" :show-input-controls="false" :show-tooltip="false" input-size="mini" :disabled="disabledSlider" show-input>
        </el-slider>
        <span class="danwei">%</span>
      </div>
    </div>
  </div>
</template>
<script>
import containTriangle from '@/components/triangle-model/contain-triangle.vue'
import flatTriangle from '@/components/triangle-model/flat-triangle.vue'
import envConfig from '@/config/env-config'
// import aloneTriangle from '@/components/triangle-model/alone-triangle.vue'
// import polygonTriangle from '@/components/triangle-model/polygon-triangle.vue'
export default {
  name: "draw-panel",
  components: {
    containTriangle,
    flatTriangle
  },
  props: {

  },
  data () {
    return {
      disabledSlider: false,
      drawActiveArr: [false, false, false, false, false],
      colorActiveArr: [false, false, false, false, false],
      value: 0,
      drawOptions: {},
      nextTabObj: {
        color: "",
        opacity: 0,
        name: ""
      }
    }
  },
  computed: {

  },
  watch: {
    "$store.state.project.drawState" (val) {
      // console.log(val)
      if (!val) {
      } else {
        //绘制结束触发
        this.drawActiveArr = [false, false, false, false ,false];
      }
    },
    nextTabObj: {
      deep: true,
      handler (newVal, oldVal) {
        if (newVal.name && newVal.color ) {
          //半透明
          // console.log(this.value)
          if(this.value!=0){
            var opaCol = (100-this.value) / 100 ;
            // console.log(opaCol)
            var num = "," + opaCol;
            var opacityColor = newVal.color.replace(/,1/, num);
            this.drawOptions.color = opacityColor;
          }else{
            this.drawOptions.color = newVal.color;
          }
          // console.log(this.drawOptions.color)
          //图片
          if (this.nextTabObj.color == "rgba(255,0,0,1)") {
            this.drawOptions.url = envConfig.publicPath + "/images/draw/red.png";
          } else if (this.nextTabObj.color == "rgba(255,0,216,1)") {
            this.drawOptions.url = envConfig.publicPath + "/images/draw/purpel.png";
          } else if (this.nextTabObj.color == "rgba(255,234,0,1)") {
            this.drawOptions.url = envConfig.publicPath + "/images/draw/yellow.png";
          } else if (this.nextTabObj.color == "rgba(0,174,255,1)") {
            this.drawOptions.url = envConfig.publicPath + "/images/draw/blue.png";
          } else if (this.nextTabObj.color == "rgba(0,255,42,1)") {
            this.drawOptions.url = envConfig.publicPath + "/images/draw/green.png";
          }
          //绘制事件
          if (newVal.name == "dian") {
            gwmap.mapControlManager.active("drawBillboard", this.drawOptions);
          }
          else if (newVal.name == "xian") {
            gwmap.mapControlManager.active("drawTerrianPolyline", this.drawOptions);
          }
          else if (newVal.name == "mian") {
            gwmap.mapControlManager.active("drawTerrianPolygon", this.drawOptions);
          }
          else if (newVal.name == "jiantou") {
            gwmap.mapControlManager.active("drawTerrianStriaghtArrow", this.drawOptions);
          }
          else if (newVal.name == "clear") {
            gwmap.mapControlManager.disactive("draw");
            this.init();
          }
        }
      }
    }
  },
  beforeDestroy () {
    gwmap.mapControlManager.disactive("draw");
  },
  mounted () {
  },
  methods: {
    init () {
      this.nextTabObj = {
        color: "",
        opacity: 0,
        name: ""
      }
      this.value = 0;
    },
    detaultColor () {
      this.nextTabObj.color = "rgba(255,0,0,1)";
      this.colorActiveArr = [true, false, false, false, false];
    },
    onChangeDraw (index) {
      this.$store.commit('project/drawState', '');
      this.drawActiveArr = [false, false, false, false, false];
      if (index >= 4) {
        this.colorActiveArr = [false, false, false, false, false];
      } else {
        this.drawActiveArr[index] = true;
      }
      this.nextTabObj.name = "";
      this.disabledSlider = false;
      this.detaultColor();

      switch (index) {
        case 0:   //点
          this.value = 0;
          this.disabledSlider = true;
          this.nextTabObj.name = "dian";
          this.drawOptions = {
            url: envConfig.publicPath + '/images/draw/red.png',
            scale: 1,
            color: 'rgba(110,220,235,0.5)'
          }
          break;
        case 1:   //线
          this.nextTabObj.name = "xian";
          this.drawOptions = {
            color: 'rgba(110,220,235,0.5)',
            width: 3
          }
          break;
        case 2:   //面
          this.nextTabObj.name = "mian";
          this.drawOptions = {
            color: 'rgba(110,220,235,0.5)',
          }
          break;
        case 3:   //箭头
          this.nextTabObj.name = "jiantou";
          this.drawOptions = {
            color: 'rgba(110,220,235,0.5)',
          }
          break;
        case 4:   //橡皮
          this.nextTabObj.name = "clear";
          this.$store.commit('project/drawState', 1);
          break;
      }
    },
    //选择颜色
    onChangeColor (typeColor, index) {
      this.colorActiveArr = [false, false, false, false, false];
      this.colorActiveArr[index] = true;
      this.nextTabObj.color = typeColor;
    },
    //选择透明度
    sliderChange (val) {
      // console.log(val)
      this.nextTabObj.opacity = val;
    }
  }

}
</script>
<style lang="less" scoped>
.draw-panel {
  width: 300px;
  height: 140px;
  background: #1d2a41;
  border-radius: 0 40px 0 40px;
  // border-radius: 0 30px 30px 0;
  // border: 1px solid #989898;
  opacity: 0.8;
  color: #fff;
}
.tool-opacity /deep/ .el-input-number.is-without-controls .el-input__inner {
  background: rgba(25, 28, 54, 1) !important;
  color: #f0f0f0 !important;
  padding: 0 !important;
  border: none !important;
  height: 20px !important;
  width: 35px !important;
  line-height: 20px;
}
.tool-opacity /deep/ .el-slider__input {
  width: 33px !important;
}
.tool-opacity /deep/ .el-slider {
  width: 165px !important;
  position: absolute;
  top: -1px;
  left: 55px;
}
.tool-opacity /deep/ .el-slider__runway.show-input {
  margin-right: 50px !important;
}
.tool-opacity /deep/ .el-slider__runway,
.tool-opacity /deep/ .el-slider__bar {
  height: 3px !important;
  background-color: rgba(211, 239, 247, 0.3) !important;
}
.tool-opacity /deep/ .el-slider__button {
  width: 0px;
  height: 0px;
  background: rgba(240, 240, 240, 0);
  border: none;
  color: none;
  position: relative;
  top: -2px;
}
.tool-opacity /deep/ .el-slider__button {
  position: relative;
  float: left;
  transform: scale(1) !important;
  outline: none !important;
}
.tool-opacity /deep/ .el-slider__button-wrapper {
  outline: none !important;
}
.tool-opacity /deep/ .el-slider__button:before {
  content: "";
  width: 0px;
  height: 0px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 18px solid #d3eff7;
  border-radius: 3px;
  position: absolute;
  top: 6px;
  left: 1px;
}
.tool-opacity /deep/ .el-slider__button:after {
  content: "";
  width: 0px;
  height: 0px;
  border-left: 11px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 18px solid #009fff;
  border-radius: 3px;
  position: absolute;
  top: 6px;
  left: 0px;
  z-index: -1;
}

.content {
  padding: 20px 20px 20px 30px;
  font-size: 13px;
  width: 100%;
  height: 100%;
  .tool {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 0 30px 0 0;
    .iconfont {
      font-size: 22px;
    }
    & > span:nth-of-type(4) {
      transform: rotate(-135deg);
    }
  }
  .tool-color {
    display: flex;
    height: 45px;
    line-height: 45px;
    .label {
      width: 39px;
      text-align: justify;
      vertical-align: top;
      position: relative;
      left: 1px;
      &::after {
        display: inline-block;
        width: 100%;
        content: "";
        height: 0;
      }
    }
    .divCol {
      width: 165px;
      padding: 0 1px 0 3px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
  .tool-opacity {
    position: relative;
    height: 30px;
    line-height: 30px;
    .danwei {
      position: absolute;
      right: 10px;
      top: 1px;
    }
  }
}
.red {
  background: #ff0000;
}
.pink {
  background: #ff00d8;
}
.yellow {
  background: #ffea00;
}
.blue {
  background: #00aeff;
}
.green {
  background: #00ff2a;
}
.activeCol {
  color: #009fff;
}
.redActive {
  border: 3px solid #ff0000;
  background: #091125;
}
.pinkActive {
  border: 3px solid #ff00d8;
  background: #091125;
}
.yellowActive {
  border: 3px solid #ffea00;
  background: #091125;
}
.blueActive {
  border: 3px solid #00aeff;
  background: #091125;
}
.greenActive {
  border: 3px solid #00ff2a;
  background: #091125;
}
.draw-panel /deep/ .triangle .two {
  top: -11.5px !important;
}
</style>