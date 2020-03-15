<template>
<!--https://stackoverflow.com/questions/42194886/how-to-make-the-row-stretch-remaining-height-->
<div class="field container-fluid h-100 d-flex flex-column">
  <div class="field__header row">
    <div class="col-md-12">
      <AppTitle />
    </div>
  </div>
  <div class="field__body row h-100 ">
    <div class="col-2">
      <Side />
    </div>
    <div class="col-10 ">
      <Main />
    </div>
  </div>
</div>
</template>
<script>
import AppTitle from './AppTitle.vue'
import Main from './Main.vue'
import Side from './Side.vue'
export default {
  components: {
    Main,
    Side,
    AppTitle
  }
}
</script>
<style lang="scss">
.field {
    &__body {
        background-image: url("/static/img/grid.png");
    }
}
</style>
