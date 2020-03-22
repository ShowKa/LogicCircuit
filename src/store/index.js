import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  nominated: [],
  constants: [],
  supplies: [],
  displays: [],
  gates: [],
  conductors: [],
  // dropped
  droppedDisplays: [],
  droppedSupplies: [],
  droppedConstants: [],
  droppedGates: []
}

const getters = {
  nominated(state) {
    return state.nominated
  },
  constants(state) {
    return state.constants
  },
  displays(state) {
    return state.displays
  },
  supplies(state) {
    return state.supplies
  },
  gates(state) {
    return state.gates
  },
  conductors(state) {
    return state.conductors
  },
  // dropped
  droppedDisplays(state) {
    return state.droppedDisplays
  },
  droppedSupplies(state) {
    return state.droppedSupplies
  },
  droppedConstants(state) {
    return state.droppedConstants
  },
  droppedGates(state) {
    return state.droppedGates
  }
}

const mutations = {
  pushNominated(state, payload) {
    state.nominated.push(payload.component)
  },
  clearNominated(state, payload) {
    state.nominated.length = 0
  },
  pushConstant(state, payload) {
    state.constants.push(payload.component)
  },
  pushDisplay(state, payload) {
    state.displays.push(payload.component)
  },
  pushSupply(state, payload) {
    state.supplies.push(payload.component)
  },
  pushGate(state, payload) {
    state.gates.push(payload.component)
  },
  pushConductor(state, payload) {
    state.conductors.push(payload.component)
  },
  // dropped
  pushDroppedDisplay(state, payload) {
    state.droppedDisplays.push(payload.component)
  },
  clearDroppedDisplays(state, payload) {
    state.droppedDisplays.length = 0
  },
  pushDroppedSupply(state, payload) {
    state.droppedSupplies.push(payload.component)
  },
  clearDroppedSupplies(state, payload) {
    state.droppedSupplies.length = 0
  },
  pushDroppedConstant(state, payload) {
    state.droppedConstants.push(payload.component)
  },
  clearDroppedConstants(state, payload) {
    state.droppedConstants.length = 0
  },
  pushDroppedGate(state, payload) {
    state.droppedGates.push(payload.component)
  },
  clearDroppedGates(state, payload) {
    state.droppedGates.length = 0
  }
}

const actions = {
  pushNominated(context, payload) {
    context.commit('pushNominated', {
      component: payload.component
    })
  },
  clearNominated(context, payload) {
    context.commit('clearNominated')
  },
  pushConstant(context, payload) {
    context.commit('pushConstant', {
      component: payload.component
    })
  },
  pushDisplay(context, payload) {
    context.commit('pushDisplay', {
      component: payload.component
    })
  },
  pushSupply(context, payload) {
    context.commit('pushSupply', {
      component: payload.component
    })
  },
  pushGate(context, payload) {
    context.commit('pushGate', {
      component: payload.component
    })
  },
  pushConductor(context, payload) {
    context.commit('pushConductor', {
      component: payload.component
    })
  },
  // dropped
  pushDroppedDisplay(context, payload) {
    context.commit('pushDroppedDisplay', {
      component: payload.component
    })
  },
  clearDroppedDisplays(context, payload) {
    context.commit('clearDroppedDisplays')
  },
  pushDroppedSupply(context, payload) {
    context.commit('pushDroppedSupply', {
      component: payload.component
    })
  },
  clearDroppedSupplies(context, payload) {
    context.commit('clearDroppedSupplies')
  },
  pushDroppedConstant(context, payload) {
    context.commit('pushDroppedConstant', {
      component: payload.component
    })
  },
  clearDroppedConstants(context, payload) {
    context.commit('clearDroppedConstants')
  },
  pushDroppedGate(context, payload) {
    context.commit('pushDroppedGate', {
      component: payload.component
    })
  },
  clearDroppedGates(context, payload) {
    context.commit('clearDroppedGates')
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
