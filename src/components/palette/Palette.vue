<template>
<div class="pallete row">
  <div class="col-12">
    <Section />
  </div>
</div>
</template>
<script>
import Section from './Section.vue'
export default {
  components: {
    Section
  }
}
</script>
<style lang="scss" >
.pallete {
    border: 1px solid red;
}
</style>
