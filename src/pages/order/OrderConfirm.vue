<template>

  <div class="order-confirm">
    <div class="container">
      <div class="address-wrapper">
        <div class="address-header">收货地址</div>
        <div class="address-body">
          <div class="address-item" v-for="(item, index) in list" :key="index" @click="checked=index" :class="checked===index?'checked':''">
            <div class="username">{{item.receiverName}}</div>
            <div class="userinfo">
              <div class="phone">{{item.receiverMobile}}</div>
              <div class="address-info">{{item.receiverProvince+' '+item.receiverCity+' '+item.receiverDistrict+' '+item.receiverAddress}}</div>
            </div>
            <div class="icon">
              <i class="iconfont icon-delete" @click="delAddress(item)"></i>
              <i class="iconfont icon-edit" @click="editAddressModal(item)"></i>
            </div>
          </div>
          <div class="address" @click="openAddressModal">
            <div class="icon"></div>
            <div class="text">添加新地址</div>
          </div>
        </div>
      </div>
      <div class="products">
        <div class="products-header">商品</div>
        <div class="products-body">
          <div class="products-item" v-for="(item, index) in cartList" :key="index">
            <div class="products-desc">
              <div class="products-pic">
                <img v-lazy="item.productMainImage" alt="">
              </div>
              <div class="products-name">{{item.productName+' '+item.productSubtitle}}</div>
            </div>
            <div class="number">
              {{item.productPrice+'元×'+item.quantity}}
            </div>
            <div class="products-sum">
              {{item.productTotalPrice}}元
            </div>
          </div>
        </div>
      </div>
      <div class="dispatch">
        <div class="dispatch-method">
          <span class="left">配送方式</span>
          <span class="right">包邮</span>
        </div>
        <div class="paper">
          <span class="left">发票</span>
          <div class="right">
            <span class="text">电子发票</span>
            <span class="text">个人</span>
            <span class="text">商品明细</span>
          </div>
        </div>
      </div>
      <div class="order-info">
        <div class="left">
          <span>商品件数:</span>
          <span>商品总价:</span>
          <span>优惠活动:</span>
          <span>运费:</span>
        </div>
        <div class="right">
          <span>{{count}}件</span>
          <span>{{cartTotalPrice}}元</span>
          <span>0元</span>
          <span>0元</span>
        </div>
      </div>
      <div class="sum">
        <div class="left">应付总额:</div>
        <div class="right"><span>{{cartTotalPrice}}</span>元</div>
      </div>
      <div class="button-wrapper">
        <div class="back"><a href="/#/cart">返回购物车</a></div>
        <div class="confirm" @click="orderSubmit">去结算</div>
      </div>
    </div>
    <modal
      title="删除确认"
      btnType="1"
      :showModal="showDelModal"
      @cancel="showDelModal=false"
      @submit="submitAddress"
    >
      <template v-slot:body>
          <p>您确认要删除此地址吗</p>
      </template>
    </modal>
    <modal
      title="新增地址"
      btnType="1"
      :showModal="showEditModal"
      @cancel="showEditModal=false"
      @submit="submitAddress"
    >
      <template v-slot:body>
        <div class="edit-wrap">
          <div class="item">
            <input v-model="checkedItem.receiverName" type="text" class="input" placeholder="姓名">
            <input v-model="checkedItem.receiverMobile" type="text" class="input" placeholder="手机号">
          </div>
          <div class="item">
            <select name="province" v-model="checkedItem.receiverProvince">
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="河北">河北</option>
            </select>
            <select name="city" v-model="checkedItem.receiverCity">
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="石家庄">石家庄</option>
            </select>
            <select name="district" v-model="checkedItem.receiverDistrict">
              <option value="北京">昌平区</option>
              <option value="天津">海淀区</option>
              <option value="河北">东城区</option>
              <option value="河北">西城区</option>
              <option value="河北">海淀区</option>
              <option value="河北">顺义区</option>
              <option value="河北">房山区</option>
            </select>
          </div>
          <div class="item">
            <textarea name="street" v-model="checkedItem.receiverAddress"></textarea>
          </div>
          <div class="item">
            <input v-model="checkedItem.receiverZip" type="text" class="input" placeholder="邮编">
          </div>
        </div>
      </template>
    </modal>
  </div>

</template>

<script>
import Modal from '../../components/common/Modal'
export default {
  components: {
    Modal
  },
  data () {
    return {
      list: [],
      cartList: [],
      cartTotalPrice: 0,
      count: 0,
      checked: 0,
      checkedItem: {},
      userAction: '',
      showDelModal: false,
      showEditModal: false
    }
  },
  mounted () {
    this.getCartList()
    this.getAddressList()
  },
  methods: {
    getAddressList () {
      this.axios.get('/shippings').then(res => {
        this.list = res.list
      })
    },
    getCartList () {
      this.axios.get('/carts').then(res => {
        const list = res.cartProductVoList
        this.cartTotalPrice = res.cartTotalPrice
        this.cartList = list.filter(item => item.productSelected)
        this.cartList.forEach(item => {
          this.count += item.quantity
        })
      })
    },
    delAddress (item) {
      this.checkedItem = item
      this.userAction = 2
      this.showDelModal = true
    },
    submitAddress () {
      const { checkedItem, userAction } = this
      let method
      let url
      let params = {}
      if (userAction === 0) {
        method = 'post'
        url = '/shippings'
      } else if (userAction === 1) {
        method = 'put'
        url = '/shippings/' + checkedItem.id
      } else {
        method = 'delete'
        url = '/shippings/' + checkedItem.id
      }
      if (userAction === 0 || userAction === 1) {
        const { receiverName, receiverMobile, receiverProvince, receiverCity, receiverDistrict, receiverAddress, receiverZip } = checkedItem
        let errorMsg
        if (!receiverName) {
          errorMsg = '请输入收货人名称'
        } else if (!receiverMobile || !/^\d{11}$/.test(receiverMobile)) {
          errorMsg = '请输入正确的手机号'
        } else if (!receiverProvince) {
          errorMsg = '请选择省份'
        } else if (!receiverCity) {
          errorMsg = '请选择城市'
        } else if (!receiverDistrict) {
          errorMsg = '请选择区域'
        } else if (!receiverZip || !/^\d{6}$/.test(receiverZip)) {
          errorMsg = '请输入正确的邮编'
        } else if (!receiverAddress) {
          errorMsg = '请输入详细地址'
        }
        if (errorMsg) {
          this.$message.error(errorMsg)
          return
        }
        params = {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip
        }
      }
      this.axios[method](url, params).then(res => {
        this.closeModal()
        this.getAddressList()
        this.$message.success('操作成功')
      })
    },
    closeModal () {
      this.checkedItem = {}
      this.userAction = ''
      this.showDelModal = false
      this.showEditModal = false
    },
    openAddressModal () {
      this.showEditModal = true
      this.userAction = 0
      this.checkedItem = {}
    },
    editAddressModal (item) {
      this.userAction = 1
      this.checkedItem = item
      this.showEditModal = true
    },
    orderSubmit () {
      const item = this.list[this.checked]
      if (!item) {
        return this.$$message.error('请选择收货地址')
      }
      this.axios.post('/orders', {
        shippingId: item.id
      }).then((res) => {
        this.$router.push({
          path: '/order/pay',
          query: {
            orderNo: res.orderNo
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/base.scss';
.order-confirm{
  background-color: #F7F5F6;
  border-top: 2px solid #E27126;
  overflow: hidden;
  .container {
    margin-bottom: 204px;
    margin-top: 32px;
    background-color: #fff;
    box-shadow: 0 0 2px 0 rgba(0,0,0,.1);
    padding: 38px 0 90px 63px;
    .address-wrapper {
      margin-right: 82px;
      .address-header{
        font-size: 20px;
        margin-bottom: 21px;
      }
      .address-body{
        display: flex;
        flex-wrap: wrap;
        margin-left: -20px;
        padding-bottom: 44px;
        border-bottom: 1px solid #e5e5e5;
        .address-item{
          cursor: pointer;
          flex: 0 0 271px;
          width: 271px;
          height: 180px;
          box-sizing: border-box;
          border: 1px solid #e4e4e4;
          margin-left: 20px;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          padding: 20px;
          color: #333;
          font-weight: 300;
          &.checked{
            border-color: #ff6700;
          }
          .username{
            font-size: 18px;
            margin-bottom: 10px;
          }
          .userinfo{
            font-size: 14px;
            line-height: 1.5;
            .address-info{
              height: 50px;
            }
          }
          .icon{
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            .iconfont{
              font-size: 24px;
              &:hover{
                color: #ff6700;
              }
            }
          }
        }
        .address{
          flex: 0 0 271px;
          width: 271px;
          height: 180px;
          box-sizing: border-box;
          border: 1px solid #E4E4E4;
          margin-left: 20px;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          .icon{
            background: url('/imgs/icon-add.png') no-repeat center;
            width: 30px;
            height: 30px;
            background-color: #E1E1E1;
            border-radius: 50%;
            background-size: 50%;
          }
          .text{
            font-size: 14px;
            color: #D5D5D5;
            font-weight: bold;
            margin-top: 10px;
          }
        }
      }
    }
    .products{
      margin-right: 40px;
      padding-bottom: 50px;
      margin-top: 20px;
      border-bottom: 1px solid #e5e5e5;
      .products-header{
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .products-body{
        .products-item{
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          .products-desc{
            flex: 2;
            display: flex;
            align-items: center;
            .products-pic{
              width: 30px;
              height: 30px;
              img{
                width: 30px;
              }
            }
            .products-name{
              font-size:16px;
              color:#333;
            }
          }
          .number{
            flex: 1;
            font-size:16px;
            color:#333;
            text-align: right;
          }
          .products-sum{
            flex: 1;
            font-size: 16px;
            color: #ff6700;
            text-align: right;
          }
        }
      }

    }
    .dispatch{
      margin-top: 31px;
      margin-bottom: 50px;
      .dispatch-method{
        display: flex;
        align-items: center;
        margin-bottom: 48px;
        .left{
          font-size: 20px;
          color: #333;
          margin-right: 71px;
        }
        .right{
          font-size: 16px;
          color: #ff6700;
          font-weight: bold;
        }
      }
      .paper{
        display: flex;
        align-items: center;
        .left{
          font-size: 20px;
          color: #333;
          margin-right: 71px;
        }
        .right{
          font-size: 16px;
          color: #ff6700;
          font-weight: bold;
          .text{
            margin-right: 23px;
          }
        }
      }
    }
    .order-info{
      display: flex;
      justify-content: flex-end;
      margin-right: 24px;
      .left{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-size: 16px;
        color: #666;
        span{
          margin-bottom: 11px;
        }
      }
      .right{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        font-size: 16px;
        color: #ff6700;
        margin-left:50px;
        margin-right: 43px;
        span{
          margin-bottom: 11px;
        }
      }
    }
    .sum{
      display: flex;
      justify-content: flex-end;
      font-size: 16px;
      align-items: center;
      margin-right: 24px;
      padding-bottom:33px;
      border-bottom: 1px solid #e5e5e5;
      .left{
        margin-right: 20px;
        color: #666;
      }
      .right{
        color: #ff6700;
        margin-right: 43px;
        span{
          font-size: 25px;
        }
      }
    }
    .button-wrapper{
      display: flex;
      justify-content: flex-end;
      font-size: 18px;
      margin-top: 37px;
      .back{
        width: 200px;
        height: 48px;
        border: 1px solid #e5e5e5;
        text-align: center;
        line-height: 48px;
        cursor: pointer;
        a{
          color: #999;
        }
      }
      .confirm{
        width: 202px;
        height: 48px;
        text-align: center;
        line-height: 48px;
        cursor: pointer;
        background-color: #ff6700;
        margin-left:20px;
        color: #fff;
      }
    }
  }
  .edit-wrap{
    font-size: 14px;
    .item{
      margin-bottom: 15px;
      .input{
        display: inline-block;
        width: 283px;
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        border: 1px solid #e5e5e5;
        &:last-child{
          margin-left: 14px;
        }
        &:first-child{
          margin-left: 0;
        }
      }
      select{
        height: 40px;
        line-height: 40px;
        border: 1px solid #e5e5e5;
        margin-right: 15px;
      }
      textarea{
        height: 62px;
        width: 100%;
        padding: 13px 15px;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
        resize: none;
      }
    }
  }
}
</style>
