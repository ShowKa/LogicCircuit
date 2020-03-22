<template>
  <div class="display">
    <IoDevice ref="in" class="display__input" io-type="input" :belong="this" />
    <div class="display__level">
      {{ onBoard ? level : '?' }}
    </div>
    <div class="display__name">
      {{ name }}
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
    onBoard: {
      type: Boolean,
      required: true,
      default: false
    },
    name: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      level: 0
    }
  },
  methods: {
    getDevices() {
      return [this.$refs.in]
    },
    transmit(level) {
      // just set level
      this.level = level
    }
  }
}
</script>
<style lang="scss">
@import 'assets/app';
@import './logic-circuit';
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
  &__name {
    position: absolute;
    top: -20px;
    left: 29px;
    // right: -15px;
    font-size: 14px;
    color: $color-border;
    // @include text-to-center($height);
  }
}
</style>
