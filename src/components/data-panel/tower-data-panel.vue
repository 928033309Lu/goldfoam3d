<template>
  <div class="map3d-panel tower">
    <div class="title">
      <img :src="publicPath+'/images/map3d/title-prev-logo.png'" alt="">
      <span>测风塔汇总信息</span>
      <!--<i class="iconfont iconyoushuangjiantou"></i>-->
    </div>
    <el-table :data="tableList" height="208" class="table-list table-3d" @row-click="rowClick">
      <el-table-column label="测风塔编号" prop="tag" min-width="80"></el-table-column>
      <el-table-column label="高度(m)" prop="h"></el-table-column>
      <el-table-column label="风速(m/s)" prop="freeSpeed"></el-table-column>
      <el-table-column label="测风时间" prop="time" width="180px">
        <!--<template slot-scope="scope">-->
        <!--{{scope.row.time}}-->
        <!--</template>-->
      </el-table-column>
    </el-table>
    <i class="iconfont iconchazi1" @click="$emit('update:componentName',null)"></i>
  </div>
</template>

<script>
export default {
  name: "tower-data-panel",
  data () {
    return {
      tableList: [
        { tag: 'M23124', h: 90, freeSpeed: 3.54, startTime: new Date().getTime(), endTime: new Date().getTime() },
      ]
    }
  },
  props: {
    schemeVisualInfo: {
      type: Object,
      default: () => { return {} }
    },
  },
  mounted () {
    this.tableList = this.schemeVisualInfo.masts
  },
  methods: {
    rowClick (row, column) {
      // 高亮
      this.$store.dispatch("map/setFeatureHighLight", { type: "mast", id: row.tag })
      // 定位到要素
      this.$store.dispatch("map/locat2Feature", { type: "mast", ids: [String(row.tag)] })
      //   this.$emit('update:componentName', 'tower-view-panel')
      //   this.$emit('update:dataSet', row)
    }
  }
}
</script>

<style lang="less">
.map3d-panel {
  &.tower {
    position: fixed;
    left: 75px;
    top: 388px;
    width: 468px;
    height: 274px;
    padding: 0 20px;
    background: url("@{publicPath}/images/map3d/tower-bg.png") no-repeat center /
      contain;
    background-size:100% 100%;
    >i{
      font-size:16px;
      top:15px;
    }
    .title{
      margin-top:15px;
    }
    .el-table {
      tr {
        cursor: pointer;
      }
      .cell {
        padding: 0 4px !important;
      }
    }
  }
}
</style>
