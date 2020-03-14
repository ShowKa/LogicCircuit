<template>
<div class="gate">
  <div>
    <IoDevice
      ref="in1"
      io-type="input"
      class="gate__input gate__input--border-bottom"
      :belong="this"
    />
    <IoDevice
      ref="in2"
      io-type="input"
      class="gate__input"
      :belong="this"
    />
  </div>
  <div class="gate__center">
    {{ gateType }}
  </div>
  <IoDevice
    ref="out"
    class="gate__output"
    io-type="output"
    :belong="this"
  />
</div>
</template>
<script>
import IoDevice from './IoDevice.vue'
export default {
  components: {
    IoDevice
  },
  props: {
    gateType: {
      type: String,
      required: true,
      default: 'OOO' // unset: out of order
    }
  },
  methods: {
    getDevices() {
      const refs = this.$refs
      return [refs.in1, refs.in2, refs.out]
    },
    getOutputLevel() {
      const val1 = this.$refs.in1.getOutputLevel()
      const val2 = this.$refs.in2.getOutputLevel()
      return this._calculate(val1, val2)
    },
    _calculate(val1, val2) {
      const _1 = val1 > 0
      const _2 = val2 > 0
      switch (this.gateType) {
        case 'AND':
          return (_1 && _2) ? 1 : 0
        case 'OR':
          return (_1 || _2) ? 1 : 0
        default:
          return 0
      }
    }
  }
}
</script>
<style lang="scss">
@import "assets/app";
@import "./logic-circuit";
.gate {
    // parameters
    $height: 40px;
    $width: 120px;
    $border: 1px solid $color-border;
    // style
    width: $width;
    height: $height;
    display: flex;
    outline: $border;
    background-color: $color-base;
    user-select: none;
    &__input {
        width: $width * (1 /10);
        height: $height / 2;
        &--border-bottom {
            border-bottom: $border;
        }
    }
    &__output {
        width: $width * (1 /10);
        height: $height;
    }
    &__center {
        width: $width * (8 / 10);
        height: $height;
        background-color: $color-border;
        @include elm-font;
        @include text-to-center($height);
    }
}
</style>
