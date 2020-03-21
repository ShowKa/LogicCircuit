<template>
  <div class="section">
    <div class="section__box">
      <div class="section__row row">
        <div class="column">
          <!-- Display -->
          <fieldset v-for="display in displays" :key="display.key">
            <Display
              v-droppable-on-board
              :level="display.level"
              class="section__element"
              :on-board="false"
              @drop="onDropDisplay"
            />
          </fieldset>
        </div>
      </div>
    </div>
    <div class="section__box">
      <fieldset v-for="target in constants" :key="target.key">
        <div class="section__row row">
          <div class="column">
            <Constant
              v-droppable-on-board
              class="section__element"
              :level="target.level"
              :on-board="false"
              @drop="onDropConstant"
            />
          </div>
        </div>
      </fieldset>
    </div>
    <div class="section__box">
      <fieldset v-for="target in gates" :key="target.key">
        <div class="section__row row">
          <div class="column">
            <Gate
              v-droppable-on-board
              class="section__element"
              :gate-type="target.type"
              :on-board="false"
              @drop="onDropGate"
            />
          </div>
        </div>
      </fieldset>
    </div>
  </div>
</template>
<script>
import {
  // mapState,
  mapActions
} from 'vuex'
import Gate from '../logic-circuit/Gate.vue'
import Constant from '../logic-circuit/Constant.vue'
import Display from '../logic-circuit/Display.vue'
export default {
  components: {
    Gate,
    Constant,
    Display
  },
  data() {
    // values for data
    const display = {
      key: 'display_' + new Date().getTime(),
      level: 0
    }
    const constant0 = {
      key: 'constant_0_' + new Date().getTime(),
      level: 0
    }
    const constant1 = {
      key: 'constant_1_' + new Date().getTime(),
      level: 1
    }
    const and = {
      key: 'gate_and_' + new Date().getTime(),
      type: 'AND'
    }
    const or = {
      key: 'gate_or_' + new Date().getTime(),
      type: 'OR'
    }
    const nand = {
      key: 'gate_nand_' + new Date().getTime(),
      type: 'NAND'
    }
    const nor = {
      key: 'gate_nor_' + new Date().getTime(),
      type: 'NOR'
    }
    const xor = {
      key: 'gate_xor_' + new Date().getTime(),
      type: 'XOR'
    }
    // data object
    return {
      displays: [display],
      constants: [constant0, constant1],
      gates: [and, or, nand, nor, xor]
    }
  },
  methods: {
    ...mapActions({
      pushDroppedDisplay: 'pushDroppedDisplay',
      pushDroppedConstant: 'pushDroppedConstant',
      pushDroppedGate: 'pushDroppedGate'
    }),
    onDropDisplay(display) {
      // push to Boad
      this.pushDroppedDisplay({
        component: display
      })
      this.$nextTick(function() {
        this.displays.length = 0
        // clone
        const newDisplay = {
          key: 'display_' + new Date().getTime(),
          level: 0
        }
        this.displays.push(newDisplay)
      })
    },
    onDropConstant(constant) {
      const level = constant.level
      // push to Boad
      this.pushDroppedConstant({
        component: constant
      })
      // clone
      this.$nextTick(function() {
        const newComponent = {
          key: `display_${level}_` + new Date().getTime(),
          level: level
        }
        for (var i = 0; i < this.constants.length; i++) {
          if (this.constants[i].level === level) {
            // remove and insert
            this.constants.splice(i, 1)
            this.constants.splice(i, 0, newComponent)
            break
          }
        }
      })
    },
    onDropGate(gate) {
      const type = gate.gateType
      // push to Boad
      this.pushDroppedGate({
        component: gate
      })
      // clone
      this.$nextTick(function() {
        const newComponent = {
          key: `gate_${type}_` + new Date().getTime(),
          type: type
        }
        for (var i = 0; i < this.gates.length; i++) {
          if (this.gates[i].type === type) {
            // remove and insert
            this.gates.splice(i, 1)
            this.gates.splice(i, 0, newComponent)
            break
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
.section {
  &__box {
    margin-top: 35px;
  }
  &__row {
    margin-top: 10px;
    position: relative;
  }
  &__element {
    left: 10px;
  }
}
</style>
