<template>
<div
  ref="container"
  class="board"
>
  <!--AND-->
  <Element
    v-draggable
    element-type="AND"
  />
</div>
</template>
<script>
import {
  mapState,
  mapActions
} from 'vuex'
// imports
import Vue from 'vue'
import Element from './Element.vue'
import Conductor from './Conductor.vue'
var ConductorClass = Vue.extend(Conductor)
// component
export default {
  components: {
    Element
  },
  data: () => ({}),
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
      const _1st = nominated[0]
      const _2nd = nominated[1]
      const rect = this.$el.getBoundingClientRect()
      const conductor = new ConductorClass({
        propsData: {
          height: rect.height,
          width: rect.width,
          x1: _1st.positionX,
          y1: _1st.positionY,
          x2: _2nd.positionX,
          y2: _2nd.positionY
        }
      })
      conductor.$mount()
      conductor.$el.classList.add('board__conductor')
      this.$refs.container.appendChild(conductor.$el)
      this.clearNominated()
    }
  },
  methods: {
    ...mapActions({
      pushNominated: 'pushNominated',
      clearNominated: 'clearNominated'
    }),
    handleDrag({
      target,
      transform
    }) {
      // transform = matrix(0,1,2,3,4,5) translate(6, 7)
      const num = transform.match(/[-]?\d+/g)
      const x = parseInt(num[6])
      const y = parseInt(num[7])
      const remX = x % 20
      const remY = y % 20
      const roundedX = remX < 10 ? (x - remX) : x + (20 - remX)
      const roundedY = remY < 10 ? (y - remY) : y + (20 - remY)
      const matrix = `matrix(${num[0]},${num[1]},${num[2]},${num[3]},${num[4]},${num[5]})`
      const roundedTrans = `translate(${roundedX}px, ${roundedY}px)`
      target.style.transform = `${matrix} ${roundedTrans}`
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
