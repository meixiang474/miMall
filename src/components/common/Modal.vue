<template>
  <transition name="fade">
    <div class="modal" v-show="showModal">
      <div class="mask"></div>
      <transition name="slide">
        <div class="modal-dialog" v-show="showModal">
          <div class="modal-header">
            <span>{{title}}</span>
            <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <a href="javascript:;" class="btn" v-if="btnType === '1'" @click="$emit('submit')">{{sureText}}</a>
            <a href="javascript:;" class="btn" v-else-if="btnType === '2'" @click="$emit('cancel')">{{cancelText}}</a>
            <div class="btn-group" v-else>
              <a href="javascript:;" class="btn" @click="$emit('submit')">{{sureText}}</a>
              <a href="javascript:;" class="btn btn-default"  @click="$emit('cancel')">{{cancelText}}</a>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    // 弹框类型 小, 中, 大, 表单
    modalType: {
      type: String,
      default: 'form'
    },
    // 弹框的标题
    title: String,
    // 按钮类型 1. 确定 2. 取消 3. 都有
    btnType: String,
    sureText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    showModal: Boolean
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/base.scss';
.modal{
  @include position(fixed);
  z-index: 10;
  transition: top .5s;
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active{
    transition: all .5s;
  }
  &.fade-enter-to{
    opacity: 1;
  }
  &.fade-leave{
    opacity: 1;
  }
  &.fade-leave-active{
    transition: all .5s;
  }
  &.fade-leave-to{
    opacity: 0;
  }
  .mask{
    @include position(fixed);
    background-color: #000;
    opacity: .5;
  }
  .modal-dialog{
    @include position(absolute, 40%, 50%, 660px, auto);
    background-color: $colorG;
    transform: translate(-50%, -50%);
    &.slide-enter, &.slide-leave-to{
      top: -100%;
    }
    &.slide-enter-to, &.slide-leave{
      top: 40%;
    }
    &.slide-enter-active, &.slide-leave-active{
      transition: all .5s;
    }
    .modal-header{
      height: 60px;
      background-color: $colorJ;
      padding: 0 25px;
      line-height: 60px;
      font-size: $fontI;
      .icon-close{
        @include positionImg(absolute, 23px, 25px, 14px, 14px, '/imgs/icon-close.png');
        transition: transform .3s;
        &:hover{
          transform: scale(1.5);
          transition: transform .3s;
        }
      }
    }
    .modal-body{
      padding: 42px 40px 54px;
      font-size: 14px;
    }
    .modal-footer{
      height: 82px;
      line-height: 82px;
      text-align: center;
      background-color: #f5f5f5;
    }
  }
}
</style>
