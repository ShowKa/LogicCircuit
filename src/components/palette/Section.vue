<template>
<div class="section">
  <div class="section__box">
    <div class="section__row row">
      <div class="column">
        <!-- Display -->
        <fieldset
          v-for="display in displays"
          :key="display.key"
        >
          <Display
            v-cloneable
            :level="display.level"
            class="section__element"
            @drop="onDropDisplay"
            @startDragging="onStartDragging"
          />
        </fieldset>
      </div>
    </div>
  </div>
  <div class="section__box">
    <fieldset
      v-for="target in constants"
      :key="target.key"
    >
      <div class="section__row row">
        <div class="column">
          <Constant
            v-cloneable
            class="section__element"
            :level="target.level"
            @drop="onDropConstant"
          />
        </div>
      </div>
    </fieldset>
  </div>
  <div class="section__box">
    <div class="section__row row">
      <div class="column">
        <Gate
          v-cloneable
          class="section__element"
          gate-type="AND"
        />
      </div>
    </div>
    <div class="section__row row">
      <div class="column">
        <Gate
          v-cloneable
          class="section__element"
          gate-type="OR"
        />
      </div>
    </div>
    <div class="section__row row">
      <div class="column">
        <Gate
          v-cloneable
          class="section__element"
          gate-type="NAND"
        />
      </div>
    </div>
    <div class="section__row row">
      <div class="column">
        <Gate
          v-cloneable
          class="section__element"
          gate-type="NOR"
        />
      </div>
    </div>
    <div class="section__row row">
      <div class="column">
        <Gate
          v-cloneable
          class="section__element"
          gate-type="XOR"
        />
      </div>
    </div>
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
    // data object
    return {
      displays: [display],
      constants: [constant0, constant1]
    }
  },
  methods: {
    ...mapActions({
      pushDroppedDisplay: 'pushDroppedDisplay',
      pushDroppedConstant: 'pushDroppedConstant'
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
    onStartDragging(component) {}
  }
}
</script>
<style lang="scss" >
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
