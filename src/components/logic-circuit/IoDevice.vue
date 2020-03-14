
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
    getOutputLevel() {
      if (this.ioType === 'input') {
        if (this.conductors.length === 0) {
          return 0
        }
        const conductor = this.conductors[0]
        return conductor.getOutputLevel()
      }
      return this.belong.getOutputLevel()
    },
    isConnected() {
      return this.conductors.length > 0
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
