<template>
<div class="element">
  <div>
    <IoDevice
      ref="in1"
      io-type="input"
      class="element__input element__input--border-bottom"
    />
    <IoDevice
      ref="in2"
      io-type="input"
      class="element__input"
    />
  </div>
  <div class="element__center">
    {{ elementType }}
  </div>
  <IoDevice
    ref="out"
    class="element__output"
    io-type="output"
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
    elementType: {
      type: String,
      required: true,
      default: 'OOO' // unset: out of order
    }
  },
  methods: {
    getDevices() {
      const refs = this.$refs
      return [refs.in1, refs.in2, refs.out]
    }
  }
}
</script>
<style lang="scss">
@import "assets/app";
@import "./element";
.element {
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
