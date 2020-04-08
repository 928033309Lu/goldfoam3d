<template>
  <div class="risk-panel lineColor">
    <contain-triangle :top="true" :left="true" :length="25" :line="'two'"></contain-triangle>
    <contain-triangle :bottom="true" :right="true" :length="25" :transform="true" :line="'two'"></contain-triangle>
    <flat-triangle class="triangle" :top="true" :right="true" :transform="true"></flat-triangle>
    <flat-triangle class="triangle2" :bottom="true" :left="true"></flat-triangle>
    <div class="top">
      <el-checkbox v-model="windValue1" @change="change" class="checkRed">阻风</el-checkbox>
      <el-checkbox v-model="windValue2" @change="change" class="checkPurple">背风</el-checkbox>
    </div>
    <div>
      <el-checkbox v-model="telValue" @change="change" class="checkYellow">发电量偏低</el-checkbox>
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
      windValue1: true,
      windValue2: true,
      telValue: true
    }
  },
  computed: {

  },
  watch: {

  },

  mounted () {
    // this.change()
  },
  methods: {
    change () {
      this.$emit("riskChange", [this.windValue1, this.windValue2, this.telValue])
    }
  }
}
</script>

<style lang="less" scoped>
.risk-panel {
  position: fixed;
  left: 80px;
  top: 563px;
  width: 300px;
  height: 100px;
  border-radius: 0 40px 0 40px;
  background: #1d2a41;
  opacity: 0.8;
  // border: 1px solid #009fff;
  color: #fff;
  padding: 20px 40px;
  /deep/ .triangle {
    right: -1px !important;
    .two {
      top: -10px !important;
    }
  }
  /deep/ .el-checkbox {
    .el-checkbox__label {
      color: #fff !important;
    }
    .el-checkbox__input {
      .el-checkbox__inner {
        &::after {
          border-color: #fff !important;
        }
      }
    }
  }
  /deep/ .checkRed .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #be1854 !important;
  }
  /deep/ .checkPurple .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #a800ff !important;
  }
  /deep/ .checkYellow .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #ff9c00 !important;
  }
  .triangle2 {
    left: -1px !important;
    bottom: -2px !important;
  }
  .top {
    margin: 0 0 18px 0;
  }
  .checkRed {
    margin-right: 80px;
  }
}
</style>
