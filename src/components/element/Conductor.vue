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
  data() {
    return {
      cood: {
        x1: this.x1,
        y1: this.y1,
        x2: this.x2,
        y2: this.y2
      }
    }
  },
  computed: {
    curvedPath() {
      const ratio = 0.5
      const cood = this.cood
      // M 10 10 C 20 20, 40 20, 50 10
      const diffX = cood.x2 - cood.x1
      const diffY = cood.y2 - cood.y1
      const secX = cood.x1 + (diffX * ratio)
      const secY = cood.y1 + (diffY * ratio)
      const thirdX = cood.x2 - (diffX * ratio)
      const thirdY = cood.y2 + (diffY * ratio)
      return `M ${cood.x1} ${cood.y1} C ${secX} ${secY}, ${thirdX} ${thirdY}, ${cood.x2} ${cood.y2}`
    }
  },
  methods: {
    updateCood(x1, y1, x2, y2) {
      this.cood.x1 = x1
      this.cood.y1 = y1
      this.cood.x2 = x2
      this.cood.y2 = y2
    }
  }
}
</script>
<style lang="scss">
.conductor {
    pointer-events: none;
}
</style>
