
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
    })
  },
  watch: {
    nominated(newValue, oldValue) {
      if (newValue.length === 0) {
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
      pushNominated: 'pushNominated'
    }),
    onMouseUp() {
      this.pushNominated({
        element: this
      })
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
