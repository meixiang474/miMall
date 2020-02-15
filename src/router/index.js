import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../pages/home'),
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('../pages/home/HomeIndex.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../pages/home/HomeProduct.vue')
      },
      {
        path: 'detail/:id',
        component: () => import('../pages/home/HomeDetail.vue')
      }
    ]
  },
  {
    path: '/cart',
    component: () => import('../pages/cart')
  },
  {
    path: '/order',
    component: () => import('../pages/order'),
    children: [
      {
        path: 'list',
        component: () => import('../pages/order/OrderList.vue')
      },
      {
        path: 'confirm',
        component: () => import('../pages/order/OrderConfirm.vue')
      },
      {
        path: 'pay',
        component: () => import('../pages/order/OrderPay.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../pages/login')
  }
]

const router = new VueRouter({
  routes
})

router.afterEach((to, from) => {
  window.scrollTo(0, 0)
})

export default router
