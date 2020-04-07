<template>
  <div class="conductor">
    <svg :height="heightToApply" :width="widthToApply">
      <path
        :d="curvedPath"
        fill="transparent"
        class="conductor__background"
        :class="{ 'conductor__background--activate': activate }"
        @click="onClick"
      />
      <path
        :d="curvedPath"
        fill="transparent"
        class="conductor__line"
        :class="{ 'conductor__line--activate': activate }"
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
      id: null,
      level: 0,
      activate: false,
      cood: {
        x1: this.outputX,
        y1: this.outputY,
        x2: this.inputX,
        y2: this.inputY
      },
      heightToApply: this.height,
      widthToApply: this.width
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
  mounted() {
    this.id = this._uid
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
    resize(height, width) {
      this.heightToApply = height
      this.widthToApply = width
    },
    unconnect() {
      const id = this.id
      this.transmit(0)
      this.devices.forEach(d => d.conductors.removeIf(c => c.id === id))
      this.devices.splice(0, this.devices.length)
    },
    onClick(e) {
      e.stopPropagation()
      this.toggleActivate()
    },
    toggleActivate() {
      this.activate = !this.activate
      if (this.activate) {
        this.$emit('activate', this)
      }
    },
    isActivate() {
      return this.activate
    }
  }
}
</script>
<style lang="scss">
@import 'assets/app';
.conductor {
  pointer-events: none;
  &__line {
    stroke: $color-split-complementary-2;
    stroke-width: 2;
    pointer-events: auto;
  }
  &__background {
    display: none;
    stroke: $color-split-complementary-1;
    stroke-width: 5;
    pointer-events: auto;
  }
  &__background--activate {
    display: initial;
  }
}
</style>
