<template>
<div class="conductor">
  <svg
    :height="height"
    :width="width"
  >
    <line
      :x1="x1"
      :y1="y1"
      :x2="x2"
      :y2="y2"
      style="stroke:rgb(255,0,0);stroke-width:2"
    />
  </svg>
</div>
</template>
<script>
export default {
  props: {
    height: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },

    x1: {
      type: Number,
      required: true
    },
    y1: {
      type: Number,
      required: true
    },
    x2: {
      type: Number,
      required: true
    },
    y2: {
      type: Number,
      required: true
    }
  }
}
</script>
<style lang="scss">
.conductor {
    pointer-events: none;
}
</style>
