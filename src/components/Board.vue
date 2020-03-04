<template>
<div class="board">
  <Element element-type="AND" />
  <Element element-type="OR" />
  {{ nominated.length }}
</div>
</template>
<script>
import {
  mapGetters,
  mapState
} from 'vuex'
import Element from './element/Element.vue'
export default {
  components: {
    Element
  },
  computed: {
    ...mapState({
      nominated: 'nominated'
    })
  },
  watch: {
    nominated(newValue, oldValue) {}
  },
  methods: {
    ...mapGetters({
      // nominated: 'nominated'
    })
  }
}
</script>
<style lang="scss" >
.board {
    height: 100px;
    width: 100%;
    background-color: yellow;
}
</style>
