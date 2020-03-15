<template>
<div class="section">
  <div class="section__box">
    <div class="section__row row justify-content-center">
      <div class="column">
        <Display />
      </div>
    </div>
  </div>
  <div class="section__box">
    <div class="section__row row justify-content-center">
      <div class="column">
        <Constant :level="0" />
      </div>
    </div>
    <div class="section__row row justify-content-center">
      <div class="column">
        <Constant :level="1" />
      </div>
    </div>
  </div>
  <div class="section__box">
    <div class="section__row row justify-content-center">
      <div class="column">
        <Gate gate-type="AND" />
      </div>
    </div>
    <div class="section__row row justify-content-center">
      <div class="column">
        <Gate gate-type="OR" />
      </div>
    </div>
    <div class="section__row row justify-content-center">
      <div class="column">
        <Gate gate-type="NAND" />
      </div>
    </div>
    <div class="section__row row justify-content-center">
      <div class="column">
        <Gate gate-type="NOR" />
      </div>
    </div>
    <div class="section__row row justify-content-center">
      <div class="column">
        <Gate gate-type="XOR" />
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Gate from '../logic-circuit/Gate.vue'
import Constant from '../logic-circuit/Constant.vue'
import Display from '../logic-circuit/Display.vue'
export default {
  components: {
    Gate,
    Constant,
    Display
  }
}
</script>
<style lang="scss" >
.section {
    // border: 1px solid yellow;
    &__box {
        margin-top: 25px;
    }
    &__row {
        margin-top: 10px;
    }
}
</style>
