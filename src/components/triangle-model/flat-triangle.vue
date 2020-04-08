<template>
    <div class="flat-triangle"
    :style="{
        top: top ? '-1px' : 'initial',
        left: left ? '0px' : 'initial',
        right: right ? '0px' : 'initial',
        bottom: bottom ? '-1px' : 'initial',
        transform: transform ? 'rotate(180deg)' : 'initial'
    }">
       <div class="one flatColor"></div>
       <div class="two flatColor"></div>
       <div class="line flatColor">
           <!-- <span class="sp1"></span><span class="sp2"></span> -->
        </div>
    </div>
</template>

<script>
    export default {
        components: {

        },
        // 父元素要设置  border-radius: 0 40px 0 40px;
        //background: #1D2A41 ; opacity: 0.8; border: 1px solid #009FFF;
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
            "transform":{
                type: Boolean,
                default: false
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
.flat-triangle{
    position: absolute;
    .one{
        width: 10px;
        height: 25px;
        border-left: 1px solid #009FFF;
        border-radius: 0 0 0 6px;
        background: #1D2A41;
        position: absolute;
        top: -42px;
        left: 0;
        z-index: 1;
    }
    .two{
        width: 22px;
        height: 10px;
        border-bottom: 1px solid #009FFF;
        background: #1D2A41;
        position: absolute;
        top: -11px;
        left: 17px;
        border-radius: 0 0 0 6px;
        z-index: 1;
    }
    .line{
        width: 27px;
        height: 13px;
        border-bottom: 1.1px solid #009FFF;
        background: #1D2A41;
        position: absolute;
        top: -22px;
        left: 0px;
        transform: rotate(45deg);
        border-radius: 1px;
        z-index: 2;
        &>span{
            display: inline-block;
            width: 0;
            height: 3px;
            border-left: 0.5px solid #009FFF;
            position: absolute;
        }
        .sp1{
            bottom: -1px;
            left: 27px;
            z-index: 4;
            transform: rotate(40deg);
        }
        .sp2{
            bottom: -1px;
            left: 1px;
            z-index: 4;
            transform: rotate(135deg);
        }
    }
}
</style>
