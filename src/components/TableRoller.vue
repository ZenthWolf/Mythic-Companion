<template>
  <button class='btn btn-secondary button' @click='roll'>
    Roll
  </button>
  <hr/>
  {{ d1 }} {{ act1[2] }}<br>
  {{ d2 }} {{ act2[2] }}<br>
  <hr/>
  <header>Action 1</header>
  <table>
    <tbody>
      <tr v-for="i in rows" :key="i">
        <td v-for="j in columns" :key="j" class="table-entry" :class="{ 'selected': fetchentry1(i,j)[1] === act1[2], 'unselected': fetchentry1(i,j)[1] !== act1[2] }">
          {{ fetchentry1(i,j)[0] }}
        </td>
      </tr>
    </tbody>
  </table>
  <hr/>
  <header>Action 2</header>
  <table>
    <tbody>
      <tr v-for="i in rows" :key="i">
        <td v-for="j in columns" :key="j" class="table-entry" :class="{ 'selected': fetchentry2(i,j)[1] === act2[2], 'unselected': fetchentry2(i,j)[1] !== act2[2] }">
          {{ fetchentry2(i,j)[0] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import tables from 'src/lib/mythictables.json'

export default defineComponent({
  name: 'MeaningTable',
  components: { },
  setup () {
    const d = (size: number) => {
      return Math.floor(Math.random() * size) + 1
    }
    const d1 = ref(d(100))
    const d2 = ref(d(100))

    const actTable = tables[0]?.Meaning?.find((meaning) => meaning.Name === 'Action')

    const act1Table = actTable?.Subcategory?.find((subcategory): subcategory is { Name: string; Table: (string | number)[][] } => subcategory.Name === 'Action 1')?.Table || []
    const act2Table = actTable?.Subcategory?.find((subcategory): subcategory is { Name: string; Table: (string | number)[][] } => subcategory.Name === 'Action 2')?.Table || []

    const act1 = act1Table[d1.value - 1]
    const act2 = act2Table[d2.value - 1]

    const columns = 5
    const rows = Math.ceil(act1Table.length / columns)
    const fetchentry1 = (i:number, j:number) => {
      return [act1Table[(j - 1) * rows + i - 1][1].toString() + ': ' + act1Table[(j - 1) * rows + i - 1][2].toString(), act1Table[(j - 1) * rows + i - 1][2]]
    }
    const fetchentry2 = (i:number, j:number) => {
      return [act2Table[(j - 1) * rows + i - 1][1].toString() + ': ' + act2Table[(j - 1) * rows + i - 1][2].toString(), act2Table[(j - 1) * rows + i - 1][2]]
    }

    return {
      d,
      tables,
      d1,
      d2,
      act1,
      act1Table,
      act2,
      act2Table,
      columns,
      rows,
      fetchentry1,
      fetchentry2
    }
  },

  methods: {
    roll () {
      this.d1 = this.d(100)
      this.act1 = this.act1Table[this.d1 - 1]
      this.d2 = this.d(100)
      this.act2 = this.act2Table[this.d1 - 1]
    }
  }
})
</script>

<style lang="scss" scoped>
.button {
  margin-top: 35px;
  background-color: $secondary;
  color:rgb(189, 189, 189);
}

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
  color: rgb(189, 189, 189);
  background-color: $primary !important
}

.unselected {
  opacity: 0.5
}

td {
  padding: 5px;
  text-align: left;
  border-right: 1px solid #000000;
  width: 20%;
}

table {
  table-layout: fixed;
  border-collapse: collapse;
}
</style>
