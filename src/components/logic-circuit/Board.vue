<template>
<div class="board">
  <button @click="addConstant(0)">
    0
  </button>
  <button @click="addConstant(1)">
    1
  </button>
  <button @click="addGate('AND')">
    AND
  </button>
  <button @click="addGate('OR')">
    OR
  </button>
  <!-- Constant -->
  <fieldset
    v-for="constant in constants"
    :key="constant.key"
  >
    <Constant
      ref="constants"
      v-draggable
      :level="constant.level"
      @dragging="onDragging"
    />
  </fieldset>
  <!-- Gate -->
  <fieldset
    v-for="gate in gates"
    :key="gate.key"
  >
    <Gate
      ref="gates"
      v-draggable
      :gate-type="gate.type"
      @dragging="onDragging"
    />
  </fieldset>
  <!-- Display -->
  <fieldset
    v-for="display in displays"
    :key="display.key"
  >
    <Display
      ref="displays"
      v-draggable
      :level="display.level"
      @dragging="onDragging"
    />
  </fieldset>
  <!-- Conductor -->
  <fieldset
    v-for="conductor in conductors"
    :key="conductor.key"
  >
    <Conductor
      ref="conductors"
      class="board__conductor"
      v-bind="conductor"
    />
  </fieldset>
</div>
</template>
<script>
// imports
import {
  mapState,
  mapActions
} from 'vuex'
import Gate from './Gate.vue'
import Constant from './Constant.vue'
import Display from './Display.vue'
import Conductor from './Conductor.vue'
// component
export default {
  components: {
    Gate,
    Display,
    Constant,
    Conductor
  },
  data() {
    return {
      constants: [],
      displays: [],
      gates: [],
      conductors: []
    }
  },
  computed: {
    ...mapState({
      nominated: 'nominated',
      gatesInState: 'gates',
      conductorInState: 'conductors',
      // dropped
      droppedDisplays: 'droppedDisplays'
    })
  },
  watch: {
    droppedDisplays(newValue, oldValue) {
      // add new component into Board
      const display = newValue[0]
      this.displays.push({
        level: display.level,
        key: 'display_' + new Date().getTime()
      })
      // position
      const coord = this.getCoordsRelativeToBoard(display.$el)
      this.$nextTick(function() {
        const components = this.$refs.displays
        const target = components[components.length - 1]
        target.$el.style.left = coord.left + 'px'
        target.$el.style.top = coord.top + 'px'
        this.pushDisplay({
          component: target
        })
      })
      this.clearDroppedDisplay()
    },
    nominated(newValue, oldValue) {
      const nominated = newValue
      if (nominated.length < 2) {
        return
      }
      // generate conductor & append into dom
      const rect = this.$el.getBoundingClientRect()
      const io1 = nominated[0]
      const io2 = nominated[1]
      const output = io1.isOutput() ? io1 : io2
      const input = io1.isInput() ? io1 : io2
      const cood = this._calCoodOfConductor(output, input)
      const props = {
        height: rect.height,
        width: rect.width,
        outputX: cood.x1,
        outputY: cood.y1,
        inputX: cood.x2,
        inputY: cood.y2,
        devices: [output, input],
        key: 'devices_' + (new Date().getTime())
      }
      this.conductors.push(props)
      this.$nextTick(function() {
        const len = this.$refs.conductors.length
        const target = this.$refs.conductors[len - 1]
        this.pushConductor({
          component: target
        })
        const devices = target.devices
        devices[0].pushConductor(target)
        devices[1].pushConductor(target)
        for (const device of devices) {
          if (device.isOutput()) {
            target.transmit(device.getLevel())
          }
        }
      })
      this.clearNominated()
    }
  },
  methods: {
    ...mapActions({
      clearNominated: 'clearNominated',
      pushConstant: 'pushConstant',
      pushDisplay: 'pushDisplay',
      pushGate: 'pushGate',
      pushConductor: 'pushConductor',
      clearDroppedDisplay: 'clearDroppedDisplay'
    }),
    addConstant(level) {
      const props = {
        level: level,
        key: 'constant_' + (new Date().getTime())
      }
      this.constants.push(props)
      // $refs.gates can not be initialized until dom updated.
      // Don't use promise after $nextTick,
      // because can not access component using "this".
      this.$nextTick(function() {
        const len = this.$refs.constants.length
        const target = this.$refs.constants[len - 1]
        this.pushConstant({
          component: target
        })
      })
    },
    addGate(gateType) {
      const props = {
        type: gateType,
        key: 'gate_' + (new Date().getTime())
      }
      this.gates.push(props)
      this.$nextTick(function() {
        const len = this.$refs.gates.length
        const target = this.$refs.gates[len - 1]
        this.pushGate({
          component: target
        })
      })
    },
    onDragging(gate) {
      const devices = gate.getDevices()
      for (const d of devices) {
        const conductors = d.getConductors()
        if (conductors.length === 0) {
          continue
        }
        for (const conductor of conductors) {
          const bothDev = conductor.devices
          const io1 = bothDev[0]
          const io2 = bothDev[1]
          const cood = this._calCoodOfConductor(io1, io2)
          conductor.updateCood(cood.x1, cood.y1, cood.x2, cood.y2)
        }
      }
    },
    getCoordsRelativeToBoard(elem) {
      const position = this._getCoords(elem)
      const posOfBoard = this._getCoords(this.$el)
      return {
        left: position.left - posOfBoard.left,
        top: position.top - posOfBoard.top
      }
    },
    // crossbrowser version
    _getCoords(elem) {
      const box = elem.getBoundingClientRect()
      const body = document.body
      const docEl = document.documentElement
      const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
      const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft
      const clientTop = docEl.clientTop || body.clientTop || 0
      const clientLeft = docEl.clientLeft || body.clientLeft || 0
      const top = box.top + scrollTop - clientTop
      const left = box.left + scrollLeft - clientLeft
      return {
        top: Math.round(top),
        left: Math.round(left)
      }
    },
    _calCoodOfConductor(io1, io2) {
      const pos1 = this.getCoordsRelativeToBoard(io1.$el)
      const pos2 = this.getCoordsRelativeToBoard(io2.$el)
      const rect1 = io1.$el.getBoundingClientRect()
      const rect2 = io2.$el.getBoundingClientRect()
      return {
        x1: pos1.left + rect1.width / 2,
        y1: pos1.top + rect1.height / 2,
        x2: pos2.left + rect2.width / 2,
        y2: pos2.top + rect2.height / 2
      }
    }
  }
}
</script>
<style lang="scss" >
.board {
    height: 100%;
    width: 100%;
    // background-image: url("/static/img/grid.png");
    position: relative;
    top: 0;
    left: 0;
    &__conductor {
        position: absolute;
        top: 0;
    }
}
</style>
