<template>
<Moveable
  class="element"
  v-bind="moveable"
  @drag="handleDrag"
>
  <div class="element__frame">
    <div>
      <IoDevice
        io-type="input"
        class="element__input element__input--border-bottom"
      />
      <IoDevice
        io-type="input"
        class="element__input"
      />
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
      draggable: true
    }
  }),
  methods: {
    handleDrag({
      target,
      transform
    }) {
      // transform = matrix(0,1,2,3,4,5) translate(6, 7)
      const num = transform.match(/[-]?\d+/g)
      const x = parseInt(num[6])
      const y = parseInt(num[7])
      const remX = x % 20
      const remY = y % 20
      const roundedX = remX < 10 ? (x - remX) : x + (20 - remX)
      const roundedY = remY < 10 ? (y - remY) : y + (20 - remY)
      const matrix = `matrix(${num[0]},${num[1]},${num[2]},${num[3]},${num[4]},${num[5]})`
      const roundedTrans = `translate(${roundedX}px, ${roundedY}px)`
      target.style.transform = `${matrix} ${roundedTrans}`
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
