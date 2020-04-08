<template>
  <div class="data-panel">
    fan
    <i class="iconfont iconchazi1" @click="$emit('update:componentName',null)"></i>
  </div>
</template>

<script>
export default {
  name: "fan-data-panel"
}
</script>

<style lang="less" scoped>
.data-panel {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  > i {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
  }
}
</style>
