<template>
<div class="app">
  <Debug v-if="isDebugMode" />
  <Field />
</div>
</template>

<script>
import Field from './components/Field.vue'
import Debug from './Debug.vue'
export default {
  components: {
    Field,
    Debug
  },
  computed: {
    isDebugMode() {
      return process.env.DEBUG === true
    }
  }
}
</script>
<style lang="scss">
.app {
    height: 100%;
}
</style>
