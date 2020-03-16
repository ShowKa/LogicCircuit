import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  nominated: [],
  constants: [],
  displays: [],
  gates: [],
  conductors: [],
  // dropped
  droppedDisplays: []
}

const getters = {
  nominated (state) {
    return state.nominated
  },
  constants (state) {
    return state.constants
  },
  displays (state) {
    return state.displays
  },
  gates (state) {
    return state.gates
  },
  conductors (state) {
    return state.conductors
  },
  // dropped
  droppedDisplays (state) {
    return state.droppedDisplays
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
  pushDisplay (state, payload) {
    state.displays.push(payload.component)
  },
  pushGate (state, payload) {
    state.gates.push(payload.component)
  },
  pushConductor (state, payload) {
    state.conductors.push(payload.component)
  },
  // dropped
  pushDroppedDisplay (state, payload) {
    state.droppedDisplays.push(payload.component)
  },
  // clear dropped
  clearDroppedDisplay (state, payload) {
    state.droppedDisplays.length = 0
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
  pushDisplay (context, payload) {
    context.commit('pushDisplay', {
      component: payload.component
    })
  },
  pushGate (context, payload) {
    context.commit('pushGate', {
      component: payload.component
    })
  },
  pushConductor (context, payload) {
    context.commit('pushConductor', {
      component: payload.component
    })
  },
  // dropped
  pushDroppedDisplay (context, payload) {
    context.commit('pushDroppedDisplay', {
      component: payload.component
    })
  },
  // clear
  clearDroppedDisplay (context, payload) {
    context.commit('clearDroppedDisplay')
  }
}

export default new Vuex.Store({
  state, getters, mutations, actions
})
