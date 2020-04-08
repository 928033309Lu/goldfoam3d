<template>
    <div class="measure-panel lineColor">
        <contain-triangle :top="true" :left="true" :length="25" :line="'two'" ></contain-triangle>
        <contain-triangle :bottom="true" :right="true" :length="25" :transform="true" :line="'two'" ></contain-triangle>
        <flat-triangle class="triangle" :top="true" :right="true" :transform="true"></flat-triangle>
        <flat-triangle class="triangle" :bottom="true" :left="true" ></flat-triangle>
        <!-- :class="!measuredDisable ? 'measuredDisable': ''" -->
        <div class="content" >
            <el-tooltip class="item" :visible-arrow="false" effect="light" content="三角测量" placement="top">
                <span @click="onChangeTool(0)" :class="{activeCol: toolActiveArr[0]}"> <i class="iconfont iconkongjianjuliceliang"></i> </span>
            </el-tooltip>
            <el-tooltip class="item" :visible-arrow="false" effect="light" content="水平测量" placement="top">
                <span @click="onChangeTool(1)" :class="{activeCol: toolActiveArr[1]}"> <i class="iconfont iconicon_changdu_px" style="font-size: 35px;"></i> </span>
            </el-tooltip>
            <el-tooltip class="item" :visible-arrow="false" effect="light" content="垂直测量" placement="top">
                <span @click="onChangeTool(2)" :class="{activeCol: toolActiveArr[2]}"> <i class="iconfont icongaodu" style="font-size: 22px;"></i> </span>
            </el-tooltip>
            <el-tooltip class="item" :visible-arrow="false" effect="light" content="面积测量" placement="top">
                <span @click="onChangeTool(3)" :class="{activeCol: toolActiveArr[3]}"> <i class="iconfont iconmianjiceliang"></i> </span>
            </el-tooltip>
            <el-tooltip class="item" :visible-arrow="false" effect="light" content="橡皮擦" placement="top">
                <span @click="onChangeTool(4)" :class="{activeCol: toolActiveArr[4]}"> <i class="iconfont iconxiangpica"></i> </span>
            </el-tooltip>
        </div>

    </div>
</template>
<script>
import containTriangle from '@/components/triangle-model/contain-triangle.vue'
import flatTriangle from '@/components/triangle-model/flat-triangle.vue'

export default {
    name: "measure-panel",
    components: {
        containTriangle,
        flatTriangle
    },
    props: {
        
    },
    data () {
        return {
            toolActiveArr: [false, false, false, false],
            measuredDisable: true  // 是否能点击
        }
    },
    computed: {

    },
    watch: {
        "$store.state.project.measuredState" (val) {
            console.log(val)
            if (!val) {
                // this.measuredDisable = false;
            } 
            else {  //测量结束触发
                // this.measuredDisable = true;
                this.toolActiveArr = [false, false, false, false];
            }
        }
    },
    beforeDestroy () {
        gwmap.mapControlManager.disactive("measure");
    },
    mounted () {
    },
    methods: {
        onChangeTool(index){
            this.toolActiveArr = [false, false, false, false];
            if(index!=4){
                this.toolActiveArr[index] = true;
            }
            this.$store.commit('project/measuredState', '');
            switch (index) {
                case 0:   //三角测量
                    gwmap.mapControlManager.active('TrangleMeasure')
                break;
                case 1:   //长度测量
                    gwmap.mapControlManager.active('measureLength')
                break;
                case 2:   //高度测量
                    gwmap.mapControlManager.active('measreHeight')
                break;
                case 3:   //面积测量
                    gwmap.mapControlManager.active('measureArea')
                break;
                case 4:   //清空测量
                    gwmap.mapControlManager.disactive("measure")
                    this.$store.commit('project/measuredState', 1);
                break;
            }
            
        }
    }
}
</script>
<style lang="less" scoped>
.measure-panel{
    width: 300px;
    height: 65px;
    background: #1D2A41;
    border-radius: 0 40px 0 40px;
    // border: 1px solid #989898;
    opacity: 0.8;
    color: #fff;
    display: flex;
    align-items: center;
    position: relative;
    top: 75px;
}
.content{
    padding: 0 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    &>span{
        display: inline-block;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        color: rgba(240,252,255,1);
        cursor: pointer;
        outline: none;
        .iconfont{
            font-size: 24px;
        }
    }
    .activeCol{
        color: #009FFF;
    }
}
.measure-panel /deep/ .triangle .two{
    top: -10px !important;
}
.measuredDisable span {
    pointer-events: none !important;
    cursor: default !important;
}
</style>