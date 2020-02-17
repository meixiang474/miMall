<template>
  <div class="order-list">
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <template>
          <div class="order" v-for="(order, index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{order.createTime}}
                <span>|</span>
                {{order.receiverName}}
                <span>|</span>
                订单号：{{order.orderNo}}
                <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="(item, i) in order.orderItemVoList" :key="i">
                  <div class="good-img">
                    <img v-lazy="item.productImage" alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.totalPrice+ 'X' +item.quantity}}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status === 10">
                <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;" >{{order.statusDesc}}</a>
              </div>
            </div>

          </div>
          </template>
          <el-pagination
            v-if="list.length!==0"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="handleChange"
          >
          </el-pagination>
          <no-data v-if="!loading && list.length === 0"></no-data>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from '../../components/common/Loading'
import NoData from '../../components/common/NoData'
export default {
  name: 'order-list',
  data () {
    return {
      loading: true,
      list: [],
      pageSize: 10,
      pageNum: 1,
      total: 0,
      timer: null
    }
  },
  components: {
    Loading,
    NoData
  },
  mounted () {
    this.getOrderList()
  },
  methods: {
    handleChange (pageNum) {
      this.pageNum = pageNum
      this.getOrderList()
    },
    getOrderList () {
      this.axios.get('/orders', {
        params: {
          pageNum: this.pageNum
        }
      }).then(res => {
        this.list = res.list
        this.loading = false
        this.total = res.total
        this.timer = this.setInterval()
      }).catch(() => {
        this.loading = false
      })
    },
    goPay (orderNo) {
      this.$router.push({
        path: '/order/pay',
        query: {
          orderNo
        }
      })
    },
    setInterval () {
      return setInterval(() => {
        if (document.documentElement.scrollTop === 0) {
          clearInterval(this.timer)
        }
        document.documentElement.scrollTop -= 100
      }, 10)
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/scss/base.scss';
  .order-list{
    .wrapper{
      background-color:$colorJ;
      padding-top:33px;
      padding-bottom:110px;
      .order-box{
        .order{
          @include border();
          background-color:$colorG;
          margin-bottom:31px;
          &:last-child{
            margin-bottom:0;
          }
          .order-title{
            @include height(74px);
            background-color:$colorK;
            padding:0 43px;
            font-size:16px;
            color:$colorC;
            .item-info{
              span{
                margin:0 9px;
              }
            }
            .money{
              font-size:26px;
              color:$colorB;
            }
          }
          .order-content{
            padding:0 43px;
            .good-box{
              width:88%;
              .good-list{
                display: flex;
                align-items: center;
                height:145px;
                .good-img{
                  width:112px;
                  img{
                    width:100%;
                  }
                }
                .good-name{
                  font-size:20px;
                  color:$colorB;
                }
              }
            }
            .good-state{
              @include height(145px);
              font-size: 20px;
              color:$colorA;
              a{
                color:$colorA;
              }
            }
          }
        }
        .el-pagination{
          text-align:right;
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active{
          background-color: #FF6600;
        }
        .el-button--primary{
          background-color: #FF6600;
          border-color: #FF6600;
        }
        .load-more,.scroll-more{
          text-align:center;
        }
      }
    }
  }
</style>
