<template>
  <div class="map-side-bar" :class="disabledAtils ? 'disabledAtils':''">
    <div class="menu" v-for="(item,index) in menus" :key="`menu${index}`" :class="{'active':activeIndex==index}">
      <div class="icon-box" @click="listenCall(item,index)">
        <i :class="item.icon" :style="{'font-size':item.size}"></i>
      </div>
      <img class="bg" :src="publicPath+'/images/map3d/menu-active.png'" alt=""  @click="listenCall(item,index)">
      <p v-html="item.name" @click="listenCall(item,index)"></p>
      <ul class="item-list" v-if="item.children && item.children.length>0 && activeIndex==index">
        <li v-for="(son,idx) in item.children" :key="`son${index}${idx}`" @click="listenSonCall(son,index,`${index}${idx}`)" :class="{'active':(!disableMenus||disableMenus.indexOf(son.fn)<0)&&activeSonIndex===`${index}${idx}`,'disabled':disableMenus&&disableMenus.indexOf(son.fn)>=0}">
          <i :class="son.icon"></i>
          <span>{{ son.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { map3dMenus } from '@/config/menu.config'
import { mapState, mapActions } from "vuex"

export default {
  name: "side-bar",
  data () {
    return {
      activeIndex: null,
      activeSonIndex: null,
      menus: [],
      disabledAtils: false,
      disableMenus: []
    }
  },
  watch: {
    activeIndex (n) {
      this.$emit('update:componentName', null);
      this.$emit('clickPopout', n);
    }
  },
  mounted () {
    this.menus = map3dMenus;
    //没图谱数据至灰图谱按钮
    this.getWindMapData({
      callback: res => {
        if (res) {
          if (!res || !res.vtkResults) {
            this.disabledAtils = true;
          } else {
            this.disabledAtils = false;
          }
        }
      }
    })
  },
  methods: {
    ...mapActions('project', ['getWindMapData']),
    initIndex () {
      this.activeIndex = null;
    },
      initSonIndex () {
      this.activeSonIndex = null;
    },
    listenCall (item, index, arg) {
      event.stopPropagation();

      setTimeout(() => {
        if (item)
          this.$emit('action', item);

      }, 0);
      //再次点击取消选中
      if (this.activeIndex == index) {
        this.activeIndex = null;
        return;
      }
      this.activeIndex = index;
    },
    listenSonCall (item, index, sonIndex) {
      event.stopPropagation();

      setTimeout(() => {
        if (item)
          this.$emit('action_son', item);

      }, 0);
      //再次点击取消选中
      if (this.activeSonIndex == sonIndex) {
        this.activeSonIndex = null;
        return;
      }

      this.activeIndex = index;
      this.activeSonIndex = sonIndex
    },
  }
}
</script>
<style lang="less">
.map-side-bar {
  width: 66px;
  height: 563px;
  padding: 10px 0 15px;
  background: url("@{publicPath}/images/map3d/11.png") no-repeat center;
  background-size: 100% 100%;
  position: fixed;
  left: 0px;
  top: 50%;
  transform: translate(0,calc(-50% + 7px));
  display: flex;
  flex-direction: column;

  .menu {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    .bg{
      width:100%;
      opacity: 0;
      transition: opacity .5s;
      position:absolute;
      right:-2px;
      top:-5px;
      z-index:-1;
    }
    &.active {
      //background: url("@{publicPath}/images/map3d/menu-active.png") no-repeat
        //center -15px;
      .bg{
        opacity: 1;
      }
    }
    &:nth-child(2) {
      .icon-box {
        margin-bottom: 5px;
      }
    }
    .icon-box {
      width: 71px;
      height: 40px;
      margin: 7px auto 0;
      text-align: center;
      line-height: 45px;
      i {
        font-size: 34px;
        color: @commonColor;
      }
    }
    > p {
      width: 55px;
      text-align: center;
      font-size: 13px;
      color: @commonColor;
      margin-top: 3px;
    }
    .item-list {
      position: absolute;
      left: 70px;
      top: 10px;
      width: 90px;
      overflow: hidden;
      background: rgba(25, 33, 46, 0.6);
      border: 1px solid rgba(118, 118, 118, 1);
      border-radius: 4px;
      padding-bottom: 6px;
      li {
        height: 27px;
        line-height: 27px;
        text-align: left;
        cursor: pointer;
        &.active,
        &:hover {
          background: rgba(25, 33, 46, 1);
        }
        &.disabled {
          pointer-events: none !important;
          cursor: default !important;
          opacity: 0.5 !important;
        }
        i {
          width: 17px;
          font-size: 17px;
          color: @highColor;
          margin: 0 6px;
        }
        span {
          font-size: 13px;
          color: @commonColor;
        }
      }
    }
  }
}
.disabledAtils .menu:nth-of-type(4) {
  pointer-events: none;
  cursor: default !important;
  opacity: 0.5;
}
</style>