<template>
<div class="display">
  <IoDevice
    ref="in"
    class="display__input"
    io-type="input"
  />
  <div class="display__value">
    {{ value }}
  </div>
</div>
</template>
<script>
import IoDevice from './IoDevice.vue'
export default {
  components: {
    IoDevice
  },
  props: {
    value: {
      type: Number,
      required: true,
      default: -1
    }
  },
  methods: {
    getDevices() {
      return [this.$refs.in]
    }
  }
}
</script>
<style lang="scss">
@import "assets/app";
@import "./element";
.display {
    // parameters
    $height: 40px;
    $width: 58px;
    $border: 1px solid $color-border;
    // style
    width: $width;
    height: $height;
    display: flex;
    outline: $border;
    background-color: $color-base;
    user-select: none;
    &__input {
        width: $width * (2 /10);
        height: $height;
    }
    &__value {
        width: $width * (8 / 10);
        height: $height;
        background-color: $color-border;
        @include elm-font;
        @include text-to-center($height);
    }
}
</style>
