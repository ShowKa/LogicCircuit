<template>
  <div id="board" class="board">
    <!-- Constant -->
    <fieldset v-for="constant in constants" :key="constant.key">
      <Constant
        ref="constants"
        v-draggable
        :level="constant.level"
        :on-board="true"
        @dragging="onDragging"
      />
    </fieldset>
    <!-- Supply -->
    <fieldset v-for="supply in supplies" :key="supply.key">
      <Supply
        ref="supplies"
        v-draggable
        :level="supply.level"
        :on-board="true"
        :name="supply.name"
        @dragging="onDragging"
      />
    </fieldset>
    <!-- Gate -->
    <fieldset v-for="gate in gates" :key="gate.key">
      <Gate
        ref="gates"
        v-draggable
        :on-board="true"
        :gate-type="gate.type"
        @dragging="onDragging"
      />
    </fieldset>
    <!-- Display -->
    <fieldset v-for="display in displays" :key="display.key">
      <Display
        ref="displays"
        v-draggable
        :on-board="true"
        :level="display.level"
        :name="display.name"
        @dragging="onDragging"
      />
    </fieldset>
    <!-- Conductor -->
    <fieldset v-for="conductor in conductors" :key="conductor.key">
      <Conductor ref="conductors" class="board__conductor" v-bind="conductor" />
    </fieldset>
    <!-- TruthTable -->
    <TruthTable class="board__tt" />
  </div>
</template>
<script>
// imports
import { mapState, mapActions } from 'vuex'
import Gate from './Gate.vue'
import Constant from './Constant.vue'
import Display from './Display.vue'
import Conductor from './Conductor.vue'
import Supply from './Supply.vue'
import TruthTable from './TruthTable.vue'
// component
export default {
  components: {
    Gate,
    Display,
    Constant,
    Conductor,
    Supply,
    TruthTable
  },
  data() {
    return {
      constants: [],
      supplies: [],
      displays: [],
      gates: [],
      conductors: []
    }
  },
  computed: {
    ...mapState({
      nominated: 'nominated',
      // dropped
      droppedDisplays: 'droppedDisplays',
      droppedConstants: 'droppedConstants',
      droppedGates: 'droppedGates',
      droppedSupplies: 'droppedSupplies'
    })
  },
  watch: {
    droppedConstants(newValue, oldValue) {
      // add new component into Board
      const constant = newValue[0]
      this.constants.push({
        level: constant.level,
        key: 'constant_' + new Date().getTime()
      })
      // position
      const coord = this.getCoordsRelativeToBoard(constant.$el)
      // $refs.constants can not be initialized until dom updated.
      // Don't use promise after $nextTick,
      // because can not access component using "this".
      this.$nextTick(function() {
        const components = this.$refs.constants
        const target = components[components.length - 1]
        target.$el.style.left = coord.left + 'px'
        target.$el.style.top = coord.top + 'px'
        this.pushConstant({
          component: target
        })
      })
      this.clearDroppedConstants()
    },
    droppedSupplies(newValue, oldValue) {
      // add new component into Board
      const supply = newValue[0]
      this.supplies.push({
        level: supply.level,
        key: 'supply_' + new Date().getTime(),
        name: this.supplies.length + 1 + ''
      })
      // position
      const coord = this.getCoordsRelativeToBoard(supply.$el)
      this.$nextTick(function() {
        const components = this.$refs.supplies
        const target = components[components.length - 1]
        target.$el.style.left = coord.left + 'px'
        target.$el.style.top = coord.top + 'px'
        this.pushSupply({
          component: target
        })
      })
      this.clearDroppedSupplies()
    },
    droppedGates(newValue, oldValue) {
      // add new component into Board
      const gate = newValue[0]
      this.gates.push({
        type: gate.gateType,
        key: 'gate_' + new Date().getTime()
      })
      // position
      const coord = this.getCoordsRelativeToBoard(gate.$el)
      this.$nextTick(function() {
        const components = this.$refs.gates
        const target = components[components.length - 1]
        target.$el.style.left = coord.left + 'px'
        target.$el.style.top = coord.top + 'px'
        this.pushGate({
          component: target
        })
      })
      this.clearDroppedGates()
    },
    droppedDisplays(newValue, oldValue) {
      // add new component into Board
      const display = newValue[0]
      this.displays.push({
        level: display.level,
        key: 'display_' + new Date().getTime(),
        name: String.fromCharCode('a'.charCodeAt(0) + this.displays.length)
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
      this.clearDroppedDisplays()
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
        key: 'devices_' + new Date().getTime()
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
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.rezieConductorsSvg)
      window.addEventListener('resize', this.adjustElementPosition)
    })
  },
  methods: {
    ...mapActions({
      clearNominated: 'clearNominated',
      pushConstant: 'pushConstant',
      pushSupply: 'pushSupply',
      pushDisplay: 'pushDisplay',
      pushGate: 'pushGate',
      pushConductor: 'pushConductor',
      clearDroppedDisplays: 'clearDroppedDisplays',
      clearDroppedSupplies: 'clearDroppedSupplies',
      clearDroppedConstants: 'clearDroppedConstants',
      clearDroppedGates: 'clearDroppedGates'
    }),
    rezieConductorsSvg() {
      if (!this.$refs.conductors) {
        return
      }
      const rect = this.$el.getBoundingClientRect()
      const height = rect.height
      const width = rect.width
      for (var c of this.$refs.conductors) {
        c.resize(height, width)
      }
    },
    adjustElementPosition() {
      const displays = this.$refs.displays
      const constants = this.$refs.constants
      const gates = this.$refs.gates
      const supplies = this.$refs.supplies
      const elements = displays
        .concat(constants)
        .concat(gates)
        .concat(supplies)
      const board = this.$el.getBoundingClientRect()
      for (var target of elements) {
        const rect = target.$el.getBoundingClientRect()
        const coord = this.getCoordsRelativeToBoard(target.$el)
        var adjusted = false
        if (coord.left > board.width) {
          target.$el.style.left = board.width - rect.width + 'px'
          adjusted = true
        }
        if (coord.top > board.height) {
          target.$el.style.top = board.height - rect.height + 'px'
          adjusted = true
        }
        if (adjusted) {
          // adjust conductor's position
          target.$emit('dragging', target)
        }
      }
    },
    onDragging(target) {
      const devices = target.getDevices()
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
      const scrollLeft =
        window.pageXOffset || docEl.scrollLeft || body.scrollLeft
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
<style lang="scss">
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
  &__tt {
    position: absolute;
    right: 11px;
    bottom: 11px;
  }
}
</style>
