<template>
<div class="pallete row h-100">
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
@import 'assets/app.scss';
.pallete {
    background-color: lighten($color-split-complementary-1, 20%);
}
</style>
