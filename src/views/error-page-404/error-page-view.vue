<template>
  <div class="page">
    <p class="page_title">404:无此页面哦</p>
    <!-- <el-button class="d2-mt" @click="$router.replace({ path: '/' })">
      返回首页
    </el-button> -->
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
