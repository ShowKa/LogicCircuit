
<template>
<div
  class="io-device"
  @mouseup="onMouseUp"
/>
</template>
<script>
import {
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
      setOnBoard: true
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
    }
  }
}
</script>
