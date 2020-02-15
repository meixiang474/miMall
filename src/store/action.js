export default {
  saveUserName ({ commit }, username) {
    return commit('SAVE_USERNAME', username)
  },
  saveCartCount ({ commit }, cartCount) {
    return commit('SAVE_CARTCOUNT', cartCount)
  }
}
