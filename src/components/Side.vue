<template>
<div class="side h-100">
  <Palette />
</div>
</template>
<script>
import Palette from './palette/Palette.vue'
export default {
  components: {
    Palette
  }
}
</script>
<style lang="scss" >
.side {
    min-width: 110px;
}
</style>
