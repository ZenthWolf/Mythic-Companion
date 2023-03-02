<template>
  {{ roll }}<br>
  <table v-on:mousedown="tryPrime" v-on:mouseup="tryPrime">
    <tbody>
      <tr v-for="i in rows" :key="i">
        <td v-for="j in columns" :key="j" class="table-entry" :class="{ 'selected': Table[i-1][j-1] === roll, 'unselected': Table[i-1][j-1] !== roll }">
          {{ Table[i-1][j-1] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'HighlightTest',
  components: { },
  setup () {
    const d = (size: number) => {
      return Math.floor(Math.random() * size) + 1
    }
    const roll = ref(d(9))

    const Table = [[1, 4, 7], [2, 5, 8], [3, 6, 9]]

    const columns = 3
    const rows = 3

    const dragPrimed = ref(false)

    const tryPrime = (event: MouseEvent) => {
      if (dragPrimed.value === true) {
        const cell = event.target as HTMLElement
        console.log(cell.textContent)

        dragPrimed.value = false
        return
      }
      dragPrimed.value = true
    }

    return {
      d,
      roll,
      Table,
      columns,
      rows,
      dragPrimed,
      tryPrime
    }
  }
})
</script>

<style lang="scss" scoped>
.table-entry {
  padding: 5px;
  text-align: left;
  border-right: 1px solid #000000;
}

.table-entry:nth-child(even) {
  background-color: #53535346;
}

.table-entry:last-child {
  border-right: none;
}

.selected {
  font-weight: bold;
  color: $off-white;
  background-color: $primary !important
}

.unselected {
  opacity: 0.5
}
</style>
