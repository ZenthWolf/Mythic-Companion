<template>
  <hr/>
  {{ d1 }} {{ act1[2] }}<br>
  {{ d2 }} {{ act2[2] }}<br>
  <hr/>
  <header>Action 1</header>
  <table>
    <tbody>
      <tr v-for="i in rows" :key="i">
        <td v-for="j in columns" :key="j" class="table-entry">
          {{ fetchentry1(i,j) }}
        </td>
      </tr>
    </tbody>
  </table>
  <hr/>
  <header>Action 2</header>
  <table>
    <tbody>
      <tr v-for="i in rows" :key="i">
        <td v-for="j in columns" :key="j" class="table-entry">
          {{ fetchentry2(i,j) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import tables from 'src/lib/meaning.json'

export default defineComponent({
  name: 'MeaningTable',
  components: { },
  setup () {
    const d = (size: number) => {
      return Math.floor(Math.random() * size) + 1
    }
    const d1 = d(100)
    const d2 = d(100)
    const act1 = tables[0].Meaning[0].Table[d1 - 1]
    const act2 = tables[0].Meaning[1].Table[d2 - 1]

    const columns = 5
    const rows = Math.ceil(tables[0].Meaning[0].Table.length / columns)
    const fetchentry1 = (i:number, j:number) => {
      return tables[0].Meaning[0].Table[(j - 1) * rows + i - 1][1].toString() + ': ' + tables[0].Meaning[0].Table[(j - 1) * rows + i - 1][2].toString()
    }
    const fetchentry2 = (i:number, j:number) => {
      return tables[0].Meaning[0].Table[(j - 1) * rows + i - 1][1].toString() + ': ' + tables[0].Meaning[1].Table[(j - 1) * rows + i - 1][2].toString()
    }

    return {
      tables,
      d1,
      d2,
      act1,
      act2,
      columns,
      rows,
      fetchentry1,
      fetchentry2
    }
  }
})
</script>

<style scoped>
.table-entry {
  padding: 5px;
  text-align: left;
}
</style>
