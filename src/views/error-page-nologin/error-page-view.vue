<template>
  <div class="page">
    <p class="page_title">无法打开此页面，请确认您已登录GOLDFOAM！</p>
  </div>
</template>

<style lang="less" scoped>
.page {
  position: fixed;
  width: 100%;
  height: 100%;

  background: #303133;
  background-blend-mode: multiply, multiply;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .page_title {
    font-size: 20px;
    color: #fff;
  }
}
</style>
