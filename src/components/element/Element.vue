<template>
<Moveable
  class="element"
  v-bind="moveable"
  @drag="handleDrag"
>
  <div class="element__frame">
    <div>
      <div class="element__input element__input--border-bottom" />
      <div class="element__input" />
    </div>
    <div class="element__center">
      {{ elementType }}
    </div>
    <IoDevice
      class="element__output"
      io-type="output"
    />
  </div>
</Moveable>
</template>
<script>
import Moveable from 'vue-moveable'
import IoDevice from './IoDevice.vue'
export default {
  components: {
    Moveable,
    IoDevice
  },
  props: {
    elementType: {
      type: String,
      required: true,
      default: 'OOO' // unset: out of order
    }
  },
  data: () => ({
    moveable: {
      draggable: true,
      throttleDrag: 1,
      edge: false
    }
  }),
  methods: {
    handleDrag({
      target,
      transform
    }) {
      target.style.transform = transform
    }
  }
}
</script>
<style lang="scss">
@import "assets/app";
@import "./element";
.element {
    // parameters
    $height: 37px;
    $width: 119px;
    $border: 3px solid $color-border;
    // style
    width: $width;
    height: $height;
    &__frame {
        width: $width;
        height: $height;
        display: flex;
        outline: $border;
        background-color: $color-base;
    }
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
