<template>
  <div class="nav-bar" :class="{'is-fixed' : isFixed}">
    <div class="container">
      <div class="pro-title">
        {{title}}
      </div>
      <div class="pro-param">
        <a href="javascript:;">概述</a><span>|</span>
        <a href="javascript:;">参数</a><span>|</span>
        <a href="javascript:;">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isFixed: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.initHeight)
  },
  methods: {
    initHeight () {
      const scrollTop = window.pageOffsetY || document.documentElement.scrollTop || document.body.scrollTop
      this.isFixed = scrollTop > 152
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.initHeight)
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/base.scss';
.nav-bar{
  width: 100%;
  height: 70px;
  line-height: 70px;
  border-top: 1px solid $colorH;
  background-color: #fff;
  &.is-fixed{
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 0 5px 5px $colorE;
    z-index: 2;
  }
  .container{
    @include flex();
    .pro-title{
      font-size: $fontH;
      color: $colorB;
      font-weight: bold;
    }
    .pro-param{
      font-size: $fontJ;
      span{
        margin: 0 10px;
      }
      a{
        color: $colorC;
        &:last-of-type{
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
