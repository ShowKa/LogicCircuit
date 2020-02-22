
<template>
<div
  class="io-device"
  @mouseup="toggleStatus"
/>
</template>
<script>
export default {
  props: {
    ioType: {
      type: String,
      required: true
    }
  },
  data: () => ({
    status: false
  }),
  methods: {
    toggleStatus: function(e) {
      this.status = !this.status
    }
  }
}
</script>
