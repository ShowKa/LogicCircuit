<template>
  <div class="main">
    <div class="row">
      <div class="col-md-12">
        <AppTitle />
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <Board />
      </div>
    </div>
  </div>
</template>
<script>
import AppTitle from './AppTitle.vue'
import Board from './Board.vue'
export default {
  components: {
    AppTitle,
    Board
  }
}
</script>
<style lang="scss" >
</style>
