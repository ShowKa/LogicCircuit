import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  name: 'Tanaka'
}

export default new Vuex.Store({
  state
})
