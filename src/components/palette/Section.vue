<template>
<div class="section">
  <div class="section__box">
    <div class="section__row row">
      <div class="column">
        <Display
          v-cloneable
          class="section__element"
        />
      </div>
    </div>
  </div>
  <div class="section__box">
    <div class="section__row row">
      <div class="column">
        <Constant
          v-cloneable
          class="section__element"
          :level="0"
        />
      </div>
    </div>
    <div class="section__row row">
      <div class="column">
        <Constant
          v-cloneable
          class="section__element"
          :level="1"
        />
      </div>
    </div>
  </div>
  <div class="section__box">
    <div class="section__row row">
      <div class="column">
        <Gate
          v-cloneable
          class="section__element"
          gate-type="AND"
        />
      </div>
    </div>
    <div class="section__row row">
      <div class="column">
        <Gate
          v-cloneable
          class="section__element"
          gate-type="OR"
        />
      </div>
    </div>
    <div class="section__row row">
      <div class="column">
        <Gate
          v-cloneable
          class="section__element"
          gate-type="NAND"
        />
      </div>
    </div>
    <div class="section__row row">
      <div class="column">
        <Gate
          v-cloneable
          class="section__element"
          gate-type="NOR"
        />
      </div>
    </div>
    <div class="section__row row">
      <div class="column">
        <Gate
          v-cloneable
          class="section__element"
          gate-type="XOR"
        />
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
    &__box {
        margin-top: 35px;
    }
    &__row {
        margin-top: 10px;
        position: relative;
    }
    &__element {
        left: 10px;
    }
}
</style>
