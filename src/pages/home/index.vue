<template>
<div>
  <nav-header></nav-header>
  <router-view />
  <nav-footer></nav-footer>
</div>
</template>

<script>
import NavHeader from '../../components/common/NavHeader'
import NavFooter from '../../components/common/Navfooter'

export default {
  components: {
    NavHeader,
    NavFooter

  }
}
</script>

<style>

</style>
