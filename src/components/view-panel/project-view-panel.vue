<template>
    <div class="map3d-panel project-panel">
        <i class="iconfont iconguanbi" @click="$emit('closeProjectView')"></i>
        <div class="title">
            <img :src="publicPath+'/images/map3d/title-prev-logo.png'" alt="">
            <span>项目概览</span>
            <!--<i class="iconfont iconyoushuangjiantou"></i>-->
        </div>
        <div class="hours">
            <span>项目等效小时数(H) :</span>
            <span>{{schemeVisualInfo.wakedHours}}</span>
        </div>
        <div class="result">
            <label>测风结果 :</label>
            <div class="result-list">
                <el-row>
                    <el-col :span="column" v-for="(mast, index) in schemeVisualInfo.masts" :key="mast.tag">
                        <h4><span>{{mast.freeSpeed}}</span>米/秒 [{{mast.tag}}]</h4>
                        <!--<div :id="'rose'+index" class="grid-content bg-purple"></div>-->
                        <polar :id="'rose'+index" :windSet="windData[index]" class="grid-content bg-purple"></polar>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="models">
            <label>选用机型 :</label>
            <div class="models-table">
                <ul class="labels">
                    <li></li>
                    <li>机型</li>
                    <li>轮毂高度(米)</li>
                    <li>机组台数</li>
                </ul>
                <ul class="model" v-for="(item,index) in modelArr">
                    <li>{{'机组配置'+(modelArr.length==1?'':(index+1))}}</li>
                    <li>{{item.modelType}}</li>
                    <li>{{gethubHeightList(item.list)}}</li>
                    <li>{{item.num}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import polar from '@/components/echarts/polar.vue'

    export default {
        name: "project-view-panel",
        data() {
            return {
                windData: [],
                // column: 8
                modelArr:[]
            }
        },
        props: ['schemeVisualInfo'],
        components: {polar},
        computed: {
            column() {
                let L = this.schemeVisualInfo.masts && this.schemeVisualInfo.masts.length
                return (L >= 3 && 8 || L == 2 && 12 || 24)
            }
        },
        mounted() {
            this.drawRose();
            this.modelArr = this.groupArr(this.schemeVisualInfo.wts, 'modelType');
            this.modelArr.forEach((item,index)=>{
                let obj = {};
                this.modelArr[index].num = this.modelArr[index].list.length;
                this.modelArr[index].list = this.modelArr[index].list.reduce((item, next) => {
                    obj[next.hubHeight] ? '' : obj[next.hubHeight] = true && item.push(next)
                    return item
                }, [])
            })
        },
        methods: {
            drawRose() {
                let vm = this;
                let masts = this.schemeVisualInfo.masts
                masts && masts.length && masts.forEach((v, k) => {
                    vm.windData.push({
                        legend: v.windRose.powerLegend,
                        series: v.windRose.powerSeries
                    })
                })
            },
            gethubHeightList(list){
                let arr = [];
                list.forEach(item=>{
                    arr.push(item.hubHeight);
                })
                return arr.join(',');
            },
            groupArr(list, field) {
                var obj = {};
                for (let i = 0; i < list.length; i++) {
                    for (let item in list[i]) {
                        if (item == field) {
                            obj[list[i][item]] = {
                                list: obj[list[i][field]] ? obj[list[i][field]].list : [],
                                modelType: list[i].modelType
                            };
                        }
                    }
                    obj[list[i][field]].list.push(list[i])
                }
                var att = [];
                for (let item in obj) {
                    att.push({
                        list: obj[item].list,
                        modelType: obj[item].modelType,
                    })
                }
                return att;
            }
        }
    }
</script>

<style lang="less" scoped>
    .map3d-panel {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 800px;
        height: 495px;
        padding: 0 20px;
        color: @commonColor;
        background: url("@{publicPath}/images/map3d/overView-bg1.png") no-repeat center;
        background-size:100% 100%;
        &.project-panel {
            .title {
                margin-top: 15px;
            }
            > i {
                top: 20px;
            }
        }
        .hours {
            line-height: 1;
            margin: 10px 0;
            display: flex;
            flex-direction: row;
            align-content: flex-end;
            span:nth-child(1) {
                /*width: 76px;*/
                line-height:20px;
                margin-right:10px;
            }
            span:nth-child(2) {
                color: #1FEAB2;
                font-size: 20px;
            }
        }
        .result,
        .models {
            display: flex;
            flex-direction: row;
            margin-bottom: 11px;
            label {
                width: 76px;
                line-height: 1;
            }
            .result-list {
                flex: 1;
                height: 265px;
                overflow-x: hidden;
                overflow-y: scroll;
                border: 1px solid rgba(137, 137, 137, 0.5);
                .el-row,
                .el-col,
                .grid-content {
                    height: 215px;
                }
                h4 {
                    text-align: center;
                    font-size: 12px;
                    color: @whiteColor;
                    font-weight: normal;
                    vertical-align: text-bottom;
                    padding-top: 20px;
                    span {
                        font-size: 18px;
                        color: @highColor;
                    }
                }
            }
            .models-table {
                flex: 1;
                height: 124px;
                display: flex;
                flex-direction: row;
                border: 1px solid rgba(137, 137, 137, 0.5);
                .labels {
                    width: 120px;
                    color: @highColor;
                    li {
                        padding-left: 26px;
                    }
                }
                .model {
                    flex: 1;
                    text-align:center;
                }
                ul {
                    li {
                        height: 28px;
                        line-height: 28px;
                        border-bottom: 1px solid rgba(137, 137, 137, 0.5);
                        &:last-child {
                            border: none;
                        }
                    }
                    li:nth-child(1) {
                        height: 40px;
                        line-height: 40px;
                    }
                }
            }
        }
    }
</style>
