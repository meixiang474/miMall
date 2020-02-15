import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './action'

Vue.use(Vuex)

const state = {
  username: '',
  cartCount: 0
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters: {
    username: state => state.username,
    cartCount: state => state.cartCount
  }
})
