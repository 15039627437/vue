import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {
    aaa: (state, callback) => {
      console.log(callback)
      return callback, state
      // console.log('aaa', state, callback)
    }
  },
  actions: {},
  modules: {}
})
