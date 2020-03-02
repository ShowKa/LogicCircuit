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
  }
}

const actions = {
  pushNominated (context, payload) {
    context.commit('pushNominated', {
      element: payload.element
    })
  }
}

export default new Vuex.Store({
  state, getters, mutations, actions
})
