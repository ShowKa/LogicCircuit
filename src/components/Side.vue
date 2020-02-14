<template>
  <div class="side">
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
    background-color: green;
}
</style>
