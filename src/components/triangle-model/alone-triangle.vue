<template>
    <div class="alone-triangle"
    :style="{
        top: top ? '0' : 'initial',
        left: left ? '0' : 'initial',
        right: right ? '0' : 'initial',
        bottom: bottom ? '0' : 'initial',
        transform: transform ? 'rotate(180deg)' : 'initial'
    }">
        <div class="one" 
        :style="{
            width: length ? (length+4)+'px' : 'initial',
            height: width ? width+'px' : 'initial'
        }"></div>
        <div class="two" 
        :style="{
            height: length ? length+'px' : 'initial',
            width: width ? width+'px' : 'initial'
        }"></div>
        
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
            // 与上面四个参数关联
            //true 右下角  false 左上角  ,其他位置要自己加样式
            "transform":{   
                type: Boolean,
                default: false
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
.alone-triangle{
    position: absolute;
    z-index: 2222;
    .one,.two{
        position: absolute;
        background: #009FFF;
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
    
}

</style>
