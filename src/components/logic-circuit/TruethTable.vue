<template>
  <div class="trueth-table">
    <table>
      <thead>
        <tr>
          <td v-for="target in constants" :key="target.key">
            input
          </td>
        </tr>
      </thead>
    </table>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      constants: 'constants'
    })
  }
}
</script>
<style lang="scss"></style>
