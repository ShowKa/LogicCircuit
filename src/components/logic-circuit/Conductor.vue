<template>
  <div class="conductor">
    <svg :height="height" :width="width">
      <filter id="dropshadow" height="130%">
        <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="cyan" />
      </filter>
      <path
        :d="curvedPath"
        fill="transparent"
        :class="{ activate: activate }"
        @click="onClick"
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
    outputX: {
      type: Number,
      required: true
    },
    outputY: {
      type: Number,
      required: true
    },
    inputX: {
      type: Number,
      required: true
    },
    inputY: {
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
        x1: this.outputX,
        y1: this.outputY,
        x2: this.inputX,
        y2: this.inputY
      },
      level: 0,
      activate: false
    }
  },
  computed: {
    curvedPath() {
      const ratio = 0.6
      const cood = this.cood
      // M 10 10 C 20 20, 40 20, 50 10
      const diffX = cood.x2 > cood.x1 ? cood.x2 - cood.x1 : cood.x1 - cood.x2
      const diffY = cood.y2 - cood.y1
      const secX = cood.x1 + diffX * ratio
      const secY = cood.y1 + diffY * ratio
      const thirdX = cood.x2 - diffX * ratio
      const thirdY = cood.y2 + diffY * ratio
      return `M ${cood.x1} ${cood.y1} C ${secX} ${secY}, ${thirdX} ${thirdY}, ${cood.x2} ${cood.y2}`
    }
  },
  methods: {
    updateCood(x1, y1, x2, y2) {
      this.cood.x1 = x1
      this.cood.y1 = y1
      this.cood.x2 = x2
      this.cood.y2 = y2
    },
    getLevel() {
      return this.level
    },
    transmit(level) {
      this.level = level
      for (const device of this.devices) {
        if (device.isInput()) {
          device.transmit(level)
        }
      }
    },
    onClick(target) {
      this.toggleActivate()
    },
    toggleActivate() {
      this.activate = !this.activate
    }
  }
}
</script>
<style lang="scss">
@import 'assets/app';
.conductor {
  pointer-events: none;
  path {
    stroke: $color-complementary;
    stroke-width: 2;
    pointer-events: auto;
  }
  path.activate {
    filter: url(#dropshadow);
  }
}
</style>
