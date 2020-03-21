<template>
  <div class="supply">
    <div class="supply__level" @mouseup="toggleLevel">
      {{ onBoard ? level : '?' }}
    </div>
    <IoDevice
      ref="out"
      class="supply__output"
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
      level: 0,
      savedLevel: 0
    }
  },
  mounted() {
    this.transmit()
  },
  methods: {
    getDevices() {
      return [this.$refs.out]
    },
    transmit() {
      const out = this.$refs.out
      out.transmit(this.level)
    },
    toggleLevel() {
      if (!this.onBoard) {
        return
      }
      this.level = this.level === 0 ? 1 : 0
      this.transmit()
    },
    saveLevel() {
      this.savedLevel = this.level
    },
    revertLevel() {
      this.level = this.savedLevel
    }
  }
}
</script>
<style lang="scss">
@import 'assets/app';
@import './logic-circuit';
.supply {
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
