<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  mounted () {
    this.getUser()
    this.getCartCount()
  },
  methods: {
    getUser () {
      this.axios.get('/user').then(res => {
      })
    },
    getCartCount () {
      this.axios.get('/carts/products/sum').then(() => {

      })
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/base.scss';
</style>
