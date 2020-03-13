<template>
<div class="board">
  <button
    ref="button"
    @click="addAND"
  >
    AND
  </button>
  <fieldset
    v-for="element in elements"
    :key="element.key"
  >
    <Element
      ref="elements"
      v-draggable
      :element-type="element.type"
      @dragging="onDraggingElement"
    />
  </fieldset>
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
import Element from './Element.vue'
import Conductor from './Conductor.vue'
// component
export default {
  components: {
    Element,
    Conductor
  },
  data() {
    return {
      elements: [],
      conductors: []
    }
  },
  computed: {
    ...mapState({
      nominated: 'nominated',
      elementsInState: 'elements',
      conductorInState: 'conductors'
    })
  },
  watch: {
    nominated(newValue, oldValue) {
      const nominated = newValue
      if (nominated.length < 2) {
        return
      }
      // generate conductor & append into dom
      const rect = this.$el.getBoundingClientRect()
      const io1 = nominated[0]
      const io2 = nominated[1]
      const cood = this.calCoodOfConductor(io1, io2)
      const props = {
        height: rect.height,
        width: rect.width,
        x1: cood.x1,
        y1: cood.y1,
        x2: cood.x2,
        y2: cood.y2,
        devices: [io1, io2],
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
      })
      this.clearNominated()
    }
  },
  methods: {
    ...mapActions({
      clearNominated: 'clearNominated',
      pushElement: 'pushElement',
      pushConductor: 'pushConductor'
    }),
    addAND() {
      const props = {
        type: 'AND',
        key: 'element_' + (new Date().getTime())
      }
      this.elements.push(props)
      // $refs.elements can not be initialized until dom updated.
      // Don't use promise after $nextTick,
      // because can not access component using "this".
      this.$nextTick(function() {
        const len = this.$refs.elements.length
        const target = this.$refs.elements[len - 1]
        this.pushElement({
          component: target
        })
      })
    },
    onDraggingElement(element) {
      const devices = element.getDevices()
      for (const d of devices) {
        const conductors = d.getConductors()
        if (conductors.length === 0) {
          continue
        }
        for (const conductor of conductors) {
          const bothDev = conductor.devices
          const io1 = bothDev[0]
          const io2 = bothDev[1]
          const cood = this.calCoodOfConductor(io1, io2)
          conductor.updateCood(cood.x1, cood.y1, cood.x2, cood.y2)
        }
      }
    },
    // crossbrowser version
    getCoords(elem) {
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
    calCoodOfConductor(io1, io2) {
      const pos1 = this.getCoords(io1.$el)
      const pos2 = this.getCoords(io2.$el)
      const posOfBoard = this.getCoords(this.$el)
      const rect1 = io1.$el.getBoundingClientRect()
      const rect2 = io2.$el.getBoundingClientRect()
      return {
        x1: pos1.left - posOfBoard.left + rect1.width / 2,
        y1: pos1.top - posOfBoard.top + rect1.height / 2,
        x2: pos2.left - posOfBoard.left + rect2.width / 2,
        y2: pos2.top - posOfBoard.top + rect2.height / 2
      }
    }
  }
}
</script>
<style lang="scss" >
.board {
    height: 100%;
    width: 100%;
    background-image: url("/static/img/grid.png");
    position: relative;
    top: 0;
    left: 0;
    &__conductor {
        position: absolute;
        top: 0;
    }
}
</style>
