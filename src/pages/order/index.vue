<template>
  <div>
    <order-header :title="title">
      <template v-slot:tip>
        <span>{{tip}}</span>
      </template>
    </order-header>
    <router-view />
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from '../../components/common/OrderHeader'
import ServiceBar from '../../components/common/ServiceBar'
import NavFooter from '../../components/common/Navfooter'
export default {
  components: {
    OrderHeader,
    ServiceBar,
    NavFooter
  },
  computed: {
    title () {
      const path = this.$route.path
      if (path === '/order/confirm') {
        return '订单确认'
      } else if (path === '/order/list') {
        return '订单列表'
      } else if (path === '/order/pay') {
        return '订单支付'
      } else {
        return '订单支付'
      }
    },
    tip () {
      const path = this.$route.path
      if (path === '/order/confirm') {
        return '请认真填写收货地址'
      } else if (path === '/order/list') {
        return '请谨防钓鱼链接或诈骗电话, 了解更多'
      } else if (path === '/order/pay') {
        return '请谨防钓鱼链接或诈骗电话, 了解更多'
      } else {
        return '请谨防钓鱼链接或诈骗电话, 了解更多'
      }
    }
  }
}
</script>

<style>

</style>
