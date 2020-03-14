
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
      // only "input" or "output"
      type: String,
      required: true
    },
    belong: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      setOnBoard: true,
      acceptable: false,
      level: 0,
      conductors: []
    }
  },
  computed: {
    ...mapState({
      nominated: 'nominated'
    })
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
          component: this
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
    },
    pushConductor(conductor) {
      this.conductors.push(conductor)
    },
    getConductors() {
      return this.conductors
    },
    getLevel() {
      return this.level
    },
    transmit(level) {
      const oldLevel = this.level
      // input -> transmit to belonging
      if (this.isInput()) {
        // update level
        if (level === 1) {
          this.level = level
        } else {
          // when transmitted 1 from other conductor then transmit 1,
          // even if argument's level is 0
          var sombodyIsHigh = false
          for (const conductor of this.conductors) {
            if (conductor.getLevel() > 0) {
              sombodyIsHigh = true
              break
            }
          }
          this.level = sombodyIsHigh ? 1 : 0
        }
        if (oldLevel === this.level) {
          return
        }
        // transmit
        this.belong.transmit(this.level)
        return
      }
      // output -> transmit to conductors
      this.level = level
      for (const conductor of this.conductors) {
        conductor.transmit(this.level)
      }
    },
    isConnected() {
      return this.conductors.length > 0
    },
    isInput() {
      return this.ioType === 'input'
    },
    isOutput() {
      return this.ioType === 'output'
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
