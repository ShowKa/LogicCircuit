<template>
  <div class="tt">
    <div class="tt__hide-button">
      hide
    </div>
    <table class="tt__table">
      <thead class="tt__head">
        <tr>
          <th v-for="target in supplies" :key="target.key">
            {{ target.name }}
          </th>
          <th
            v-for="(target, i) in displays"
            :key="target.key"
            :class="i === 0 ? 'tt__head__first' : ''"
          >
            {{ target.name }}
          </th>
        </tr>
      </thead>
      <tbody class="tt__body">
        <tr v-for="(vr, i) in values" :key="'tt-row-' + i">
          <td
            v-for="(vc, j) in vr"
            :key="'tt-column-' + i + '-' + j"
            class="tt__cell"
          >
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
<style lang="scss">
@import 'assets/app';
@import './logic-circuit';
.tt {
  @include elm-font;
  color: $color-border;
  font-size: 17px;
  user-select: none;
  text-align: center;
  display: table;
  &__head {
    border-bottom: 1px solid;
    &__first {
      border-left: 1px solid;
    }
  }
  &__cell {
    width: 50px;
    height: 30px;
  }
  &__hide-button {
    position: absolute;
    top: -30px;
    right: 11px;
    cursor: pointer;
    // display: none;
    font-size: 13px;
    color: $color-base;
    text-decoration: underline;
  }
}
.tt:hover .tt__hide-button {
  color: $color-border;
}
</style>
