<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="">
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="javascript:;">我的主页</a><span>|</span>
      <a href="javascript:;">我的主页</a><span>|</span>
      <a href="javascript:;">我的主页</a><span>|</span>
      <a href="javascript:;">我的主页</a>
    </div>
    <div class="copyright">
      Copyright ©2019 <span class="domain">mi.futurefe.com</span> All Rights Reserved.
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.footer{
  height: 234px;
  border-top: 4px solid #ff6600;
  background: #333;
  color: #999;
  font-size: 16px;
  text-align: center;
  .footer-logo{
    margin: 46px 0 31px;
    img{
      width: 53px;
      margin-bottom: 13px;
    }
  }
  .footer-link{
    a{
      color: #999;
      display: inline-block;
    }
    span{
        margin: 0 10px;
    }
  }
  .copyright{
    margin-top: 13px;
    .domain{
      color: #ff6600;
    }
  }
}

</style>
