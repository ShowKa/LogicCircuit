<template>
<div
  ref="container"
  class="board"
>
  <button @click="addAND">
    AND
  </button>
  <fieldset
    v-for="(element, index) in elements"
    :key="'element_' + index"
  >
    <Element
      v-draggable
      :element-type="element.type"
    />
  </fieldset>
  <fieldset
    v-for="(conductor, index) in conductors"
    :key="'conductor_' + index"
  >
    <Conductor
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
  data: () => ({
    elements: [],
    conductors: []
  }),
  computed: {
    ...mapState({
      nominated: 'nominated'
    })
  },
  watch: {
    nominated(newValue, oldValue) {
      const nominated = newValue
      if (nominated.length < 2) {
        return
      }
      // append conductor into dom
      const elm1 = nominated[0]
      const elm2 = nominated[1]
      const pos1 = this.getCoords(elm1.$el)
      const pos2 = this.getCoords(elm2.$el)
      const posOfBoard = this.getCoords(this.$el)
      const rect1 = elm1.$el.getBoundingClientRect()
      const rect2 = elm2.$el.getBoundingClientRect()
      const rect = this.$el.getBoundingClientRect()
      const props = {
        height: rect.height,
        width: rect.width,
        x1: pos1.left - posOfBoard.left + rect1.width / 2,
        y1: pos1.top - posOfBoard.top + rect1.height / 2,
        x2: pos2.left - posOfBoard.left + rect2.width / 2,
        y2: pos2.top - posOfBoard.top + rect2.height / 2
      }
      this.conductors.push(props)
      this.clearNominated()
    }
  },
  methods: {
    ...mapActions({
      pushNominated: 'pushNominated',
      clearNominated: 'clearNominated'
    }),
    // crossbrowser version
    getCoords(elem) {
      var box = elem.getBoundingClientRect()
      var body = document.body
      var docEl = document.documentElement
      var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
      var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft
      var clientTop = docEl.clientTop || body.clientTop || 0
      var clientLeft = docEl.clientLeft || body.clientLeft || 0
      var top = box.top + scrollTop - clientTop
      var left = box.left + scrollLeft - clientLeft
      return {
        top: Math.round(top),
        left: Math.round(left)
      }
    },
    addAND() {
      const props = {
        type: 'AND'
      }
      this.elements.push(props)
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
