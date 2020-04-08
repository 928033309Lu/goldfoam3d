<template>
    <div class="polygon-triangle"
    :style="{
        top: top ? '2px' : 'initial',
        left: left ? '0px' : 'initial',
        right: right ? '-4px' : 'initial',
        bottom: bottom ? '0px' : 'initial',
        transform: transform ? 'rotateX(180deg)' : 'initial'
    }">
       <div class="one"
       :style="{
           height: width+'px'
       }">
            <span v-if="line=='one'" class="sp1"
            :style="{
                right: (lineLength-2)+'px',
                 width: lineLength+'px'
            }"></span>
       </div>
       <div class="two"
        :style="{
           height: width+'px'
       }"></div>
       <div class="three"
       :style="{
           width: width+'px'
       }">
            <span v-if="line=='two'" class="sp2"
            :style="{
                top: lineLength+'px',
                width: lineLength+'px'
            }"></span>
       </div>
    </div>
</template>

<script>
    export default {
        components: {

        },
        props: {
            "top":{
                type: Boolean,
                default: false
            },
            "left":{
                type: Boolean,
                default: false
            },
            "right":{
                type: Boolean,
                default: false
            },
            "bottom":{
                type: Boolean,
                default: false
            },
            "transform":{   //trur 右下角  false 右上角,其他位置自己加样式
                type: Boolean,
                default: false
            },
            "width":{   //调边框的宽度
                type: Number,
                default: 4.5
            },
            "line":{   //旁边的小线   one ,two
                type: String,
                default: "null"
            },
            "lineLength":{   //旁边的小线
                type: Number,
                default: 20
            }
        },
        data () {
            return {

            }
        },
        computed: {

        },
        watch: {

        },

        mounted () {
        },
        methods: {

        }
    }
</script>

<style lang="less" scoped>
.polygon-triangle{
    position: absolute;
    transform-origin: center center;
    z-index: 2222;
    .one{
        width: 15px;
        height: 5px;
        background: #009FFF;
        position: absolute;
        right: 20px;
        top: -3px;
        border-radius: 2px 0 0 2px;
    }
    .two{
        width: 25px;
        height: 4.5px;
        background: #009FFF;
        position: absolute;
        right: 0px;
        top: 5px;
        
        transform: rotate(45deg);
    }
    .three{
        width: 4.5px;
        height: 15px;
        background: #009FFF;
        position: absolute;
        right: 2px;
        top: 14px;
        border-radius: 0 2px 2px 0;
    }
    .sp1,.sp2{
        display: inline-block;
        width: 15px;
        border-bottom: 1.5px solid #009FFF;
        position: absolute;
    }
    .sp1{
        right: 13px;
    }
    .sp2{
        top: 20px;
        left: -6px;
        transform: rotate(90deg);
    }
}

</style>
