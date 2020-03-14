<template>
<!--https://stackoverflow.com/questions/42194886/how-to-make-the-row-stretch-remaining-height-->
<div class="main d-flex h-100 flex-column">
  <div class="row">
    <div class="col-md-12">
      <AppTitle />
    </div>
  </div>
  <div class="row flex-fill">
    <div class="col-md-12">
      <Board class="main__board" />
    </div>
  </div>
</div>
</template>
<script>
import AppTitle from './AppTitle.vue'
import Board from './logic-circuit/Board.vue'
export default {
  components: {
    AppTitle,
    Board
  }
}
</script>
<style lang="scss" >
.main__board {
    height: 100%;
}
</style>
