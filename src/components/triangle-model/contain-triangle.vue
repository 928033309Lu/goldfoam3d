<template>
    <div class="contain-triangle"
    :style="{
        top: top ? '1px' : 'initial',
        left: left ? '1px' : 'initial',
        right: right ? '1px' : 'initial',
        bottom: bottom ? '1px' : 'initial',
        transform: transform ? 'rotate(180deg)' : 'initial'
    }">
        <div class="one" 
        :style="{
            width: length ? (length+5)+'px' : 'initial',
            height: width ? width+'px' : 'initial'
        }">
            <span class="lines lines-one" v-if="line=='one'"
            :style="{
                right: lineLength ? (0-lineLength)+'px' : 'initial',
                width: lineLength ? lineLength+'px' : 'initial'
            }"></span>

           
        </div>
        <div class="two" 
        :style="{
            height: length ? (length)+'px' : 'initial',
            width: width ? width+'px' : 'initial'
        }">

             <span class="lines lines-two" v-if="line=='two'"
            ></span>
        </div>
    </div>
</template>

<script>
    export default {
        components: {

        },
        // 父元素要设置  border: 1px solid #009FFF;
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
            "transform":{   //trur 右下角  false 左上角
                type: Boolean,
                default: false
            },
            "line":{      //三角框旁边的小线 one,two
                type: String,
                default: "-1"  
            },
            "lineLength":{      //小线长度
                type: Number,   //这个取非默认值的话，需自己微调定位
                default: 15  
            },
            "length":{   //调蓝色三角边框的长度
                type: Number,
                default: 20
            },
            "width":{   //调蓝色三角边框的宽度, 改变了的话调下top
                type: Number,
                default: 4.5
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
.contain-triangle{
    position: absolute;
    z-index: 2222;
    .one,.two{
        position: absolute;
        background: #009FFF;
        border-radius: 0 0 3px 0;
    }
    .one{
        top: -2px;
        left: -2px;
        height: 5px;
        width: 30px;
    }
    .two{
        top: 2px;
        left: -2px;
        height: 25px;
        width: 5px;
    }
    .lines{
        position: absolute;
        width: 7px;
        border-bottom: 1.5px solid #009FFF;
    }
    .lines-one{
        top: 0.5px;
    }
    .lines-two{
        bottom: -7px;
        right: -4px;
        transform: rotate(90deg);
        width: 15px;
    }
}
.contain-triangle:before{
    content: "";
    width: 0px;
    height: 0px;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid #FF2E76;
    position: absolute;
    top: 1px;
    left: 5px;
    transform: rotate(45deg);
}
</style>
