
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
      acceptable: false,
      conductor: []
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
      this.conductor.push(conductor)
    },
    getConductors(conductor) {
      return this.conductor
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
