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
  data() {
    return {
      level: 0
    }
  },
  methods: {
    getDevices() {
      const refs = this.$refs
      return [refs.in1, refs.in2, refs.out]
    },
    transmit() {
      // calculate level
      const level1 = this.$refs.in1.getLevel()
      const level2 = this.$refs.in2.getLevel()
      const level = this._calculate(level1, level2)
      // update this level
      this.level = level
      // transtmi
      const output = this.$refs.out
      output.transmit(this.level)
    },
    _calculate(level1, level2) {
      const _1 = level1 > 0
      const _2 = level2 > 0
      switch (this.gateType) {
        case 'AND':
          return (_1 && _2) ? 1 : 0
        case 'OR':
          return (_1 || _2) ? 1 : 0
        case 'NAND':
          return !(_1 && _2) ? 1 : 0
        case 'NOR':
          return !(_1 || _2) ? 1 : 0
        case 'XOR':
          return (_1 && !_2) || (!_1 && _2) ? 1 : 0
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
