<template>
  <div class="ali-pay">
    <div class="form" v-html="content"></div>
    <loading v-if="loading"></loading>
  </div>
</template>

<script>
import Loading from '../../components/common/Loading'
export default {
  components: {
    Loading
  },
  data () {
    return {
      orderId: this.$route.query.orderId,
      content: '',
      loading: true
    }
  },
  mounted () {
    this.paySubmit()
  },
  methods: {
    paySubmit () {
      this.axios.post('/pay', {
        orderId: this.orderId,
        orderName: 'vue小米商城',
        amount: 0.01,
        payType: 1
      }).then(res => {
        this.content = res.content
        setTimeout(() => {
          document.forms[0].submit()
        }, 100)
      })
    }
  }
}
</script>

<style>

</style>
