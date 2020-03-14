<template>
<div class="display">
  <IoDevice
    ref="in"
    class="display__input"
    io-type="input"
    :belong="this"
  />
  <div class="display__level">
    {{ output }}
  </div>
</div>
</template>
<script>
import IoDevice from './IoDevice.vue'
export default {
  components: {
    IoDevice
  },
  props: {},
  data() {
    return {
      output: '?'
    }
  },
  methods: {
    getDevices() {
      return [this.$refs.in]
    },
    show() {
      const device = this.$refs.in
      if (device.isConnected()) {
        this.output = device.getOutputLevel()
      } else {
        this.output = '?'
      }
    }
  }
}
</script>
<style lang="scss">
@import "assets/app";
@import "./logic-circuit";
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
    &__level {
        width: $width * (8 / 10);
        height: $height;
        background-color: $color-border;
        @include elm-font;
        @include text-to-center($height);
    }
}
</style>
