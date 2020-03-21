<template>
  <div class="trueth-table">
    <table>
      <thead>
        <tr>
          <td v-for="target in supplies" :key="target.key">
            {{ target.name }}
          </td>
          <td v-for="target in displays" :key="target.key">
            {{ target.name }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(vr, i) in values" :key="'tt-row-' + i">
          <td v-for="(vc, j) in vr" :key="'tt-column-' + i + '-' + j">
            {{ vc }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      supplies: 'supplies',
      displays: 'displays'
    }),
    values() {
      const ret = []
      const len = this.supplies.length
      if (len === 0) {
        return []
      }
      var max = 2 ** len
      for (var i = 0; i < max; i++) {
        var v = i
        var dev = max / 2
        const row = []
        for (var j = len; j > 0; j--) {
          const _v = v / dev
          row.push(_v >= 1 ? 1 : 0)
          v %= dev
          dev /= 2
        }
        ret.push(row)
      }
      for (var s of this.supplies) {
        s.saveLevel()
      }
      for (var k = 0; k < ret.length; k++) {
        const row = ret[k]
        for (var l = 0; l < row.length; l++) {
          const v = row[l]
          const target = this.supplies[l]
          target.level = v
          target.transmit()
        }
        for (var m = 0; m < this.displays.length; m++) {
          const display = this.displays[m]
          row.push(display.level)
        }
      }
      for (var t of this.supplies) {
        t.revertLevel()
        t.transmit()
      }
      return ret
    }
  }
}
</script>
<style lang="scss"></style>
