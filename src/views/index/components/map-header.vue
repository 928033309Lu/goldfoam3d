<template>
  <div class="header">
    <img :src="publicPath+'/images/logo-name.png'" alt="">
    <!--<div class="title">风匠</div>-->
    <div class="line"></div>
    <div class="name">{{projectName}}</div>
  </div>
</template>
<script>
export default {
  name: 'map-view',
  props: ['projectName']
}
</script>
<style lang="less">
.header {
  width: 100%;
  height: 40px;
  line-height: 42px;
  background: url("@{publicPath}/images/map3d/left-border.png") left top
      no-repeat,
    url("@{publicPath}/images/map3d/right-border.png") right top no-repeat;
  background-color: @headerBgColor;
  border-bottom: 1px solid rgba(152, 152, 152, 1);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    height:26px;
    margin: -2px 0px 0 16px;
  }
  .line {
    width: 1px;
    height: 16px;
    border: 1px solid rgba(212, 239, 246, 1);
    opacity: 0.6;
    margin: 0 10px 0 10px;
  }
  .title {
    font-size: 16px;
    color: #fff;
  }
  .name {
    font-size: 16px;
    color: #fff;
  }
}
</style>