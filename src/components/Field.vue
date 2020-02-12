<template>
  <div class="container-fluid">
    <div class="field row">
      <div class="col-md-10">
        <Main />
      </div>
      <div class="col-md-2">
        <Side />
      </div>
    </div>
  </div>
</template>
<script>
import Main from './Main.vue'
import Side from './Side.vue'
export default {
  components: {
    Main,
    Side
  }
}
</script>
<style lang="scss">
</style>
