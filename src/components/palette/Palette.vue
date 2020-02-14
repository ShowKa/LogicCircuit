<template>
  <div class="pallete row">
    <div class="col-md-12 col-sm-4">
      <Section />
    </div>
    <div class="col-md-12 col-sm-4">
      <Section />
    </div>
    <div class="col-md-12 col-sm-4">
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
