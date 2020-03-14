<template>
<div class="constant">
  <div class="constant__level">
    {{ level }}
  </div>
  <IoDevice
    ref="out"
    class="constant__output"
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
    level: {
      type: Number,
      required: true
    }
  },
  methods: {
    getDevices() {
      return [this.$refs.out]
    }
  }
}
</script>
<style lang="scss">
@import "assets/app";
@import "./logic-circuit";
.constant {
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
    &__output {
        width: $width * (2 /10);
        height: $height;
    }
    &__level {
        width: $width * (8 / 10);
        height: $height;
        background-color: $color-border;
        @include elm-font;
        @include text-to-center($height);
    }
}
</style>
