<template>
  <div class="map3d-panel fan">
    <i class="iconfont iconguanbi" @click="$emit('update:componentName',null)"></i>
    <div class="title">
      <img :src="publicPath+'/images/map3d/title-prev-logo.png'" alt="">
      <span>风参表</span>
      <!--<i class="iconfont iconyoushuangjiantou"></i>-->
    </div>
    <div class="fan-list">
      <el-table :data="schemeVisualInfo.wts" class="table-list table-3d" style="width: 100%" max-height="230" :default-sort = "{prop: 'z', order: 'descending'}" @row-click="rowClick" :highlight-current-row="true">
        <el-table-column align='center' prop="tag" label="风机编号" min-width="80px">
        </el-table-column>
        <el-table-column align='center' prop="modelType" label="机型" min-width="80px">
        </el-table-column>
        <el-table-column align='center' prop="h" label="轮毂高度(m)" min-width="80px">
        </el-table-column>
        <el-table-column align='center' prop="z" sortable label="海拔(m)" min-width="80px">
        </el-table-column>
        <el-table-column align='center' prop="freeSpeed" sortable label="平均风速(m/s)" min-width="100px">
        </el-table-column>
        <el-table-column align='center' prop="windShearExponentAvg" sortable label="风切变" min-width="80px">
          <template slot-scope="scope">
            {{scope.row.windShearExponentAvg && Number(scope.row.windShearExponentAvg.toFixed(2))}}
          </template>
        </el-table-column>
        <el-table-column align='center' prop="wakedReductionRatio" sortable label="尾流损失(%)" min-width="100px">
          <template slot-scope="scope">
            {{scope.row.wakedReductionRatio && Number(scope.row.wakedReductionRatio.toFixed(1))}}
          </template>
        </el-table-column>
        <el-table-column align='center' prop="wakedSpeed" sortable label="尾流后风速(m/s)" min-width="120px">
        </el-table-column>
        <el-table-column align='center' prop="wakedHours" sortable label="尾流后等效小时数(h)" min-width="120px">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "fan-list-panel",
  props: ['schemeVisualInfo'],
  data () {
    return {
      tableList: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  mounted () {
    this.tableList = this.schemeVisualInfo.wts
  },
  methods: {
    rowClick (row, column) {
      // 高亮
      this.$store.dispatch("map/setFeatureHighLight", { type: "turbine", id: row.tag })
      // 定位到要素
      this.$store.dispatch("map/locat2Feature", { type: "turbine", ids: [String(row.tag)] })
      // this.$emit('update:componentName', 'fan-view-panel')
      // this.$emit('update:dataSet', row)
    }
  }
}
</script>

<style lang="less" scoped>
.map3d-panel {
  position: fixed;
  left: 80px;
  bottom: 24px;
  z-index: 9;
  width: calc(100% - 90px);
  max-height: 300px;
  overflow: hidden;
  background: url("@{publicPath}/images/map3d/fan-list-bg.png") no-repeat center;
  background-size: 100% 100%;
  padding: 0 20px;
  &.fan {
    > i {
      top: 15px;
    }
    .title{
      margin-top:15px;
    }
  }
  .fan-list {
    /*border: 1px solid rgba(137, 137, 137, 0.5);*/
    margin: 10px 0 20px;
    /deep/ .el-table {
      color: @commonColor;
      background: transparent !important;
      &::before {
        display: none;
      }
      &.table-list i + i{
        margin:0;
      }
      thead {
        color: @highColor;
      }
      th{
        background: transparent !important;
      }
      td,
      th {
        border-color: rgba(137, 137, 137, 0.5)!important;
        padding: 0;
      }
      .cell {
        height: 27px;
        line-height: 27px;
      }
      .el-table__body tr {
        cursor: pointer;
        /*&:hover > td {*/
          /*background: transparent !important;*/
        /*}*/
      }
    }
  }
}
</style>
