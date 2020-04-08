<template>
  <div class="atils-panel lineColor">
    <contain-triangle :top="true" :left="true" :length="25" :line="'two'"></contain-triangle>
    <contain-triangle class="contain" :bottom="true" :right="true" :length="25" :transform="true" :line="'two'"></contain-triangle>
    <flat-triangle class="triangle" :top="true" :right="true" :transform="true"></flat-triangle>
    <flat-triangle :bottom="true" :left="true"></flat-triangle>

    <div class="content">
      <div class="height">
        <div class="label">高度</div>：
        <el-select v-model="height" @change="changeHeight" placeholder="请选择">
          <el-option v-for="(item, index) of options" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <span class="mi">米</span>
      </div>
      <div class="opta slider-input">
        <div class="optaName">透明度：</div>
        <el-slider @change="opacityChange" v-model="sliderValue" :min="0" :max="100" :show-input-controls="false" :show-tooltip="false" input-size="mini" show-input>
        </el-slider>
        <span class="danwei">%</span>
      </div>
    </div>
    <!-- //图例 -->
    <div class="atilsBox">
      <span class="num num-top">{{max && max.toFixed(1)}}</span>
      <span class="num num-bottom">{{min && min.toFixed(1)}}</span>
      <div class="imgs"><img :src="publicPath+'/images/noise1.jpg'" alt="" /></div>
      <div class="bottom tri_top">
        风图谱
      </div>
    </div>
  </div>

</template>
<script>
import { mapState, mapActions } from "vuex"
import containTriangle from '@/components/triangle-model/contain-triangle.vue'
import flatTriangle from '@/components/triangle-model/flat-triangle.vue'
import envConfig from '@/config/env-config'
export default {
  name: "atils-panel",
  components: {
    containTriangle,
    flatTriangle
  },
  props: {

  },
  data () {
    return {
      options: [],
      height: '',
      sliderValue: 60,
      alldata: null,
      windMapObj: {
        url: '',
        positions: '',
        height: 0
      },
      defaultHeight: {
        height: [],
        url: [],
        pos_xy: []
      },
      pos_xy: []
    }
  },
  computed: {
    min () {
      return this.$store.state.project.windMapMinMax && this.$store.state.project.windMapMinMax.min
    },
    max () {
      return this.$store.state.project.windMapMinMax && this.$store.state.project.windMapMinMax.max
    }
  },
  created () {
    gwmap.windMap.loadWindMap();
    //图谱接口
    this.getWindMapData({
      callback: res => {
        // console.log(res)
        this.alldata = res;
        setTimeout(() => {
          this.getWindMap(this.alldata);
        }, 500)
      }
    })
  },
  beforeDestroy () {
    gwmap.windMap.remove();
  },
  mounted () {

  },
  methods: {
    ...mapActions('project', ['getWindMapData']),
    changeHeight (val) {
      // console.log(val)
      this.windMapObj.url = val[1];
      if (val[0].indexOf('-') != -1){
        var arr = val[0].split('-')
        this.windMapObj.height = Number(arr[0]);
        let num = arr[1] - 1;
        let obj = this.pos_xy[num];
        let centerPosi = gwmap.proj4To84(obj.xc, obj.yc)
        this.windMapObj.positions = centerPosi;
        this.windMapObj.positions.push(0);
      } else{
        let obj = this.pos_xy[0];
        let centerPosi = gwmap.proj4To84(obj.xc, obj.yc)
        this.windMapObj.positions = centerPosi;
        this.windMapObj.positions.push(0);
        this.windMapObj.height = Number(val[0]);
      }
      let opa = (100-this.sliderValue) / 100;
      
      console.log(this.windMapObj)
      gwmap.windMap.loadWindMap(opa);
      gwmap.windMap.addWindMap(this.windMapObj)

    },
    opacityChange (val) {
      let opa = ((100-val) / 100 + 0.01);
      // console.log(opa)
      gwmap.windMap.loadWindMap(opa);
      gwmap.windMap.addWindMap(this.windMapObj);
    },
    getWindMap (alldata) {
      if (!alldata || !alldata.vtkResults) return;
      
      let height = 0;
      this.init();
      this.pos_xy = alldata.refinesCenter;
      for (let i in alldata.vtkResults) {
        this.getHeight(i, this.reverUrl(alldata.vtkResults[i]));
      }
      //排序
      let _this = this
      this.options = this.options.sort(function(a,b){
        return _this.reverCodeNum(a.label) - _this.reverCodeNum(b.label);
      })

      // 默认选中
      this.height = this.options[0].label;
      height = this.options[0].label;
      this.windMapObj.url = this.options[0].value[1];
      if (height.indexOf('-') != -1){
        var arr = height.split('-')
        this.windMapObj.height = Number(arr[0]);
        let num = arr[1] - 1;
        let obj = this.pos_xy[num];
        let centerPosi = gwmap.proj4To84(obj.xc, obj.yc)
        this.windMapObj.positions = centerPosi;
        this.windMapObj.positions.push(0);
      } else{
        let obj = this.pos_xy[0];
        let centerPosi = gwmap.proj4To84(obj.xc, obj.yc)
        this.windMapObj.positions = centerPosi;
        this.windMapObj.positions.push(0);
        this.windMapObj.height = Number(height);
      }
      gwmap.windMap.addWindMap(this.windMapObj);
     
    },
    reverCodeNum (item){
      if (item.indexOf('-') != -1){
        let arr = item.split('-')
        return Number(arr[0]) + Number(arr[1])
      } else{
        return item
      }
    },
    reverUrl (item) {
      return envConfig.s3Path +'/'+ item;
    },
    getHeight (item, url) {
      // console.log(item, url)
      this.defaultHeight.height.push(item);
      this.defaultHeight.url.push(url);
      this.options.push({
        label: item,
        value: [item,url]
      })
    },
    init(){
      this.defaultHeight = {
        height: [],
        url: [],
        pos_xy: []
      }
    }
  }
}
</script>
<style lang="less" scoped>
.atilsBox {
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
  .num {
    position: absolute;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 11px;
  }
  .num-top {
    right: 5px;
    top: 0;
  }
  .num-bottom {
    right: 5px;
    bottom: 30px;
  }
  .imgs {
    height: 182px;
    padding: 11px 0;
    img {
      height: 160px;
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
.atils-panel {
  width: 300px;
  height: 110px;
  border-radius: 0 40px 0 40px;
  background: #1d2a41;
  opacity: 0.8;
  // border: 1px solid #989898;
  font-size: 13px;
  position: relative;
  top: 42px;
  /deep/ .triangle .two {
    top: -10px !important;
  }
  /deep/ .contain .lines-two {
    right: -5px !important;
  }
}
.content {
  color: #fff;
  padding: 30px;
  height: 100%;
  .height,
  .opta {
    display: flex;
    position: relative;
  }
  .mi {
    padding: 2px 17px;
  }
  .danwei {
    position: absolute;
    right: -8px;
    top: 11px;
  }
  .optaName {
    width: 60px;
    line-height: 31px;
  }
}
.content /deep/ .el-slider {
  width: 170px !important;
}
.content .height /deep/ .el-input,
.content /deep/ .el-select {
  width: 120px !important;
}
.content /deep/ .el-select {
  margin-left: 5px;
  margin-top: -3px;
}
.content .height /deep/ .el-input__inner {
  height: 22px !important;
  line-height: 22px !important;
  width: 120px !important;
  background: rgba(0, 0, 0, 0) !important;
  border-radius: inherit !important;
  padding: 0 0 0 10px !important;
  border: 1px solid rgba(240, 240, 240, 0.7) !important;
  color: rgba(240, 240, 240, 1) !important;
  font-size: 13px !important;
}
.content .height /deep/ .el-input__inner::placeholder {
  font-size: 13px !important;
}
.content .height /deep/ .el-input__icon {
  line-height: 22px !important;
}
.label {
  width: 42px;
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
.atils-panel /deep/ .flat-triangle {
  .one{
    left: -1px;
  }
  .two{
    top: -10px;
  }
}
</style>