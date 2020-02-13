<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="javascript:;" @click="login" v-if="!username">登录</a>
          <a href="javascript:;" v-if="username">我的订单</a>
          <a
          href="javascript:;"
          class="my-cart"
          @click="goToCart">
          <span class="icon-cart"></span>购物车
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li
                class="product"
                v-for="(item, index) in phoneList"
                :key="index"
                >
                  <a
                  :href="'/#/product/'+item.id"
                  target="_blank"
                  >
                    <div class="pro-img">
                      <img :src="item.mainImage" :alt="item.subtitle">
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">

            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword">
            <a href="" ></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      phoneList: [],
      username: 'jack'
    }
  },
  methods: {
    getProductList () {
      this.axios.get('/products', {
        params: {
          categoryId: '100012'
        }
      }).then(res => {
        if (res.list.length >= 6) {
          this.phoneList = res.list.slice(0, 6)
        }
      })
    },
    goToCart () {
      this.$router.push('/cart')
    },
    login () {
      this.$router.push('/cart')
    }
  },
  filters: {
    currency (val) {
      if (!val) return '0.00'
      return '¥' + val.toFixed(2) + '元'
    }
  },
  mounted () {
    this.getProductList()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/base.scss';
@import '../../assets/scss/mixin.scss';
@import '../../assets/scss/config.scss';
  .header{
    .nav-topbar{
      height: 39px;
      line-height: 39px;
      background: #333;
      color: #b0b0b0;
      .container{
      display: flex;
      justify-content: space-between;
      align-items: center;
      a{
        display: inline-block;
        vertical-align: middle;
        color: #b0b0b0;
        margin-right: 17px;
        &.my-cart{
          width: 110px;
          background: #ff6600;
          text-align: center;
          color: #fff;
          .icon-cart{
            background: url('/imgs/icon-cart-checked.png') no-repeat center center;
            background-size: contain;
            display: inline-block;
            width: 16px;
            height: 12px;
            margin-right: 4px;
          }
        }
      }
      }
    }
    .nav-header{
      .container{
        height: 112px;
        display: flex;
        align-items: center;
         position: relative;
        .header-logo{
          flex:0 0 55px;
          display: inline-block;
          width: 55px;
          height: 55px;
          background: #ff6600;
          overflow: hidden;
          a{
            display: inline-block;
            width: 110px;
            height: 55px;
            &:before{
              content: '';
              display: inline-block;
              width: 55px;
              height: 55px;
              background: url('/imgs/mi-logo.png') no-repeat center;
              background-size: contain;
              transition: margin .2s;
            }
            &:after{
              content: '';
              display: inline-block;
              width: 55px;
              height: 55px;
              background: url('/imgs/mi-home.png') no-repeat center;
              background-size: contain;
            }
            &:hover:before{
              margin-left: -55px;
              transition: margin .2s;
            }
          }
        }
        .header-menu{
          display: inline-block;

          padding-left: 209px;
          flex: 1;
          .item-menu{
            display: inline-block;
            color: #333;
            font-weight: bold;
            font-size: 16px;
            line-height: 112px;
            margin-right: 20px;
            span{
              cursor: pointer;
            }
            &:hover{
              color: $colorA;
              .children{
                height: 220px;
                opacity: 1;
                transition: all .2s linear;
              }
            }
            .children{
              position: absolute;
              width: 1226px;
              border-top: 1px solid #e5e5e5;
              top: 112px;
              left: 0;
              box-shadow: 0 7px 6px 0 rgba(0,0,0,.11);
              height: 0;
              opacity: 0;
              overflow: hidden;
              transition: all .2s linear;
              background: #fff;
              z-index: 10;
              .product{
                position: relative;
                float: left;
                width: 16.6%;
                height: 220px;
                font-size: 12px;
                line-height: 12px;
                text-align: center;
                background: #fff;
                &:before{
                position: absolute;
                top: 28px;
                right: 0;
                border-left: 1px solid #d7d7d7;
                height: 100px;
                content: ''
              }
              &:last-child:before{
                border: none;
              }
                img{
                  width: auto;
                  height: 111px;
                  margin-top: 26px;
                }
                .pro-img{
                  height: 137px;
                }
                .pro-name{
                  font-weight: bold;
                  margin-top: 19px;
                  margin-bottom: 8px;
                  color: $colorB;
                }
                .pro-price{
                  color: $colorA;

                }
              }
            }
          }
        }
        .header-search{
          width: 319px;
          flex: 0 0 319px;
          .wrapper{
            height: 50px;
            border: 1px solid #e0e0e0;
            display: flex;
            align-items: center;
            input {
              border: none;
              border-right: 1px solid #e0e0e0;
              width: 264px;
              height: 100%;
              padding-left: 14px;
              box-sizing: border-box;
            }
            a{
              display: inline-block;
              width: 18px;
              height: 18px;
              background: url('/imgs/icon-search.png') no-repeat center;
              background-size: contain;
              margin-left: 17px;
            }
          }
        }
      }
    }
  }
</style>
