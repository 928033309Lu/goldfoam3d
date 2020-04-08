<template>
  <div class="login-view" @click="$router.replace('/')">
    登录页面
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
  },
  mounted () {

  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.login-view {
  position: fixed;
  width: 100%;
  height: 100%;
  background: black;
  color: white;
}
</style>
