<template>
<div class="conductor">
  <svg
    :height="height"
    :width="width"
  >
    <path
      :d="curvedPath"
      style="stroke:rgb(255,0,0);stroke-width:1"
      fill="transparent"
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
    },
    devices: {
      type: Array,
      required: true
    }
  },
  computed: {
    curvedPath() {
      const ratio = 0.5
      // M 10 10 C 20 20, 40 20, 50 10
      const diffX = this.x2 - this.x1
      const diffY = this.y2 - this.y1
      const secX = this.x1 + (diffX * ratio)
      const secY = this.y1 + (diffY * ratio)
      const thirdX = this.x2 - (diffX * ratio)
      const thirdY = this.y2 + (diffY * ratio)
      return `M ${this.x1} ${this.y1} C ${secX} ${secY}, ${thirdX} ${thirdY}, ${this.x2} ${this.y2}`
    }
  }
}
</script>
<style lang="scss">
.conductor {
    pointer-events: none;
}
</style>
