import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  nominated: []
}

const getters = {
  nominated (state) {
    return state.nominated
  }
}

const mutations = {
  pushNominated (state, payload) {
    state.nominated.push(payload.element)
  },
  clearNominated (state, payload) {
    state.nominated.length = 0
  }
}

const actions = {
  pushNominated (context, payload) {
    context.commit('pushNominated', {
      element: payload.element
    })
  },
  clearNominated (context, payload) {
    context.commit('clearNominated')
  }
}

export default new Vuex.Store({
  state, getters, mutations, actions
})
