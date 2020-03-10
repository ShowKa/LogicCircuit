<template>
<div
  ref="container"
  class="board"
>
  <Element element-type="AND" />
  <Element element-type="OR" />
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
  computed: {
    ...mapState({
      nominated: 'nominated'
    }),
    positionX() {
      return 0
    }
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
      console.log(_1st)
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
    })
  }
}
</script>
<style lang="scss" >
.board {
    height: 100%;
    width: 100%;
    background-image: url("/static/img/grid.png");
    &__conductor {
        position: absolute;
        top: 0;
    }
}
</style>
