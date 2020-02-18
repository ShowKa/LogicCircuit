<template>
<Moveable
  class="bit"
  v-bind="moveable"
  @drag="handleDrag"
>
  <div class="bitt__frame">
    <div class="bit__center">
      1
    </div>
    <div class="bit__output" />
  </div>
</Moveable>
</template>
<script>
import Moveable from 'vue-moveable'
export default {
  components: {
    Moveable
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
      console.log('onDrag', transform)
      target.style.transform = transform
    }
  }
}
</script>
<style lang="scss">
@import "assets/app";
@import "./element";
.bit {
    // parameters
    $height: 37px;
    $width: 47px;
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
    &__output {
        width: $width * (1 /10);
        height: $height;
    }
    &__center {
        width: $width * (9 / 10);
        height: $height;
        background-color: $color-border;
        @include elm-font;
        @include text-to-center($height);
    }
}
</style>
