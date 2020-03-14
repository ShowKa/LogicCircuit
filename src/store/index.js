import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  nominated: [],
  constants: [],
  elements: [],
  conductors: []
}

const getters = {
  nominated (state) {
    return state.nominated
  },
  constants (state) {
    return state.constants
  },
  elements (state) {
    return state.elements
  },
  conductors (state) {
    return state.conductors
  }
}

const mutations = {
  pushNominated (state, payload) {
    state.nominated.push(payload.component)
  },
  clearNominated (state, payload) {
    state.nominated.length = 0
  },
  pushConstant (state, payload) {
    state.constants.push(payload.component)
  },
  pushElement (state, payload) {
    state.elements.push(payload.component)
  },
  pushConductor (state, payload) {
    state.conductors.push(payload.component)
  }
}

const actions = {
  pushNominated (context, payload) {
    context.commit('pushNominated', {
      component: payload.component
    })
  },
  clearNominated (context, payload) {
    context.commit('clearNominated')
  },
  pushConstant (context, payload) {
    context.commit('pushConstant', {
      component: payload.component
    })
  },
  pushElement (context, payload) {
    context.commit('pushElement', {
      component: payload.component
    })
  },
  pushConductor (context, payload) {
    context.commit('pushConductor', {
      component: payload.component
    })
  }
}

export default new Vuex.Store({
  state, getters, mutations, actions
})
