
<template>
<div
  class="io-device"
  :class="{'io-device__acceptable': acceptable}"
  @mouseup="onMouseUp"
/>
</template>
<script>
import {
  mapState,
  mapActions
} from 'vuex'
export default {
  props: {
    ioType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      setOnBoard: true,
      acceptable: false
    }
  },
  computed: {
    ...mapState({
      nominated: 'nominated'
    }),
    positionX() {
      const thisElement = this.$el
      const thisRect = thisElement.getBoundingClientRect()
      const parentElement = this.$parent.$el
      // const parentRect = parentElement.getBoundingClientRect()
      // return thisElement.getBoundingClientRect().x - parentElement.getBoundingClientRect().x
      return thisRect.x - parentElement.offsetLeft
    },
    positionY() {
      const thisElement = this.$el
      const thisRect = thisElement.getBoundingClientRect()
      const parentElement = this.$parent.$el
      // const parentRect = parentElement.getBoundingClientRect()
      // return thisElement.getBoundingClientRect().y - parentElement.getBoundingClientRect().top
      return thisRect.y - parentElement.offsetTop - thisRect.height
      // return thisRect.y - parentElement.offsetTop
    }
  },
  watch: {
    nominated(newValue, oldValue) {
      if (newValue.length === 0) {
        this.acceptable = false
        return
      }
      if (newValue.length >= 2) {
        this.acceptable = false
        return
      }
      const nominated = newValue[0]
      const ioType = nominated.ioType
      if (this.ioType === ioType) {
        return
      }
      this.acceptable = true
    }
  },
  methods: {
    ...mapActions({
      pushNominated: 'pushNominated',
      clearNominated: 'clearNominated'
    }),
    onMouseUp() {
      const _push = () => {
        this.pushNominated({
          element: this
        })
      }
      const nominated = this.nominated
      if (nominated.length === 0) {
        _push()
        return
      }
      if (!this.acceptable) {
        this.clearNominated()
      }
      _push()
    },
    accept() {
      this.acceptable = true
    }
  }
}
</script>
<style lang="scss">
.io-device {
    &__acceptable {
        background-color: red;
    }
}
</style>
