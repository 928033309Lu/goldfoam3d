<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    };
  },
  methods: {

  }
}
</script>

<style lang="less">
//全局自定义线和三角的颜色
.lineColor{
  border: 1px solid #989898;
}
.flatColor{
  border-color: #989898 !important;
}
//全局文字提示样式
.el-tooltip__popper{
  background:rgba(220,241,247,0.6) !important;
  color:#000 !important;
  border: none !important;
  border-radius:1px !important;
  height:18px !important;
  line-height:15px;
  font-size:12px;
  padding: 2px 5px !important;
  margin: 0 0 5px 0 !important;
}

.map-status-bar {
  width: 100%;
  height: 25px;
  line-height: 25px;
  bottom: 0;
  left: 0;
  text-align: right;
  background: rgba(0, 0, 0, 0.3);
  padding: 0 10px;
  span {
    margin: 0 0 0 10px;
  }
}
#north{
  position: absolute;
  top: -103px;
  left: 11px;
  font-size: 13px;
  font-weight: bold;
  color: rgba(249,250,253,0.9);
}
.compass-outer-ring{
  fill: #898989 !important;
}
.compass-gyro-background{
  border: 1px solid #898989 !important;
}
.navigation-control-icon-reset svg{
  opacity: 0;
}
.navigation-control-icon-reset{
  background-image: url("@{publicPath}/images/dizhi.png") !important;
  background-size: 100% 100%;
}
.navigation-control {
  border: none !important;
}
.navigation-controls {
  border: none !important;
  & > div {
    background: url("@{publicPath}/images/homeBg.png") !important;
    background-size: 100% 100% !important;
    border-radius: 2px !important;
  }
}
.navigation-controls-position>div:nth-of-type(1){
    background: url("@{publicPath}/images/homeBg.png") !important;
    background-size: 100% 100% !important;
    border-radius: 2px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    // border: 1px solid #263238;
    &>div{
      background: url("@{publicPath}/images/esc.png") !important;
      background-size: 100% 100% !important;
      width: 20px;
      height: 20px;
      box-sizing: border-box;
      transform: rotate(90deg);
      opacity: 0.9;
    }
  }
</style>
