<template>

  <div class="label-switcher" :style="labelVisible?'background: rgba(0, 159, 255, 0.5);':'background: rgba(51, 59, 76, 0.4);'">
    <span class="switcher-text" v-if="!labelVisible" style="left: 11px;">OFF</span>
    <span class="switcher-text" v-if="labelVisible" style="left: 35px;">ON</span>
    <!-- <el-tooltip :content="labelVisible?'隐藏风机标签':'显示风机标签'" placement="bottom"> -->
    <div class="switcher-btn" @click="change" :style="labelVisible?'left: 0px;':'left: 40px;'">
      <i class="switcher-icon iconfont iconfengji" :style="labelVisible?'color: rgba(0, 159, 255, 1);':'color:#333B4C;'" />
    </div>
    <!-- </el-tooltip> -->
  </div>
</template>
<script>

export default {
  data () {
    return {
      labelVisible: true
    }
  },
  watch: {
  },
  mounted () {

  },
  methods: {

    change () {
      this.labelVisible = !this.labelVisible
      gwmap.dataManager.showHideTurbineLabels(this.labelVisible)
    }
  }
}
</script>
<style lang="less" scoped>
.label-switcher {
  width: 65px;
  height: 30px;
  border: 1px solid rgba(214, 215, 220, 1);
  border-radius: 15px;
}
.switcher-btn {
  position: relative;
  top: -21px;
  width: 30px;
  height: 30px;
  background: rgba(249, 250, 253, 1);
  box-shadow: 0px 4px 10px 0px rgba(99, 91, 85, 0.32);
  border-radius: 15px;
  cursor: pointer;
}
.switcher-text {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(249, 250, 253, 1);
  line-height: 20px;
  position: relative;
  top: 5px;
  left: 9px;
}
.switcher-icon {
  font-size: 16px;
  position: relative;
  padding: 5px 7px;
  color: rgba(25, 33, 46, 1);
}
</style>