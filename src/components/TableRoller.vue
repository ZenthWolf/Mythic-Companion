<template>
  <div class="container">
    <div class="row">
      <div>
        <hr color="black"/>
          <div v-if="act1 && act2" style="text-align: center;">
            {{ d1 }} {{ act1[2] }}<br>
            {{ d2 }} {{ act2[2] }}<br>
          </div>
          <div v-else>
            <br><br>
          </div>
        <hr color="black"/>
        <h4 class="table-title">Action 1</h4>
        <table>
          <tbody>
            <tr v-for="i in rows" :key="i">
              <td v-for="j in columns" :key="j" class="table-entry" :class="{ 'selected': act1 && act1Table[transposeEntry(i, j)][2] === act1[2], 'unselected': act1 && act1Table[transposeEntry(i, j)][2] !== act1[2] }">
                {{ `${act1Table[transposeEntry(i, j)][1]}: ${act1Table[transposeEntry(i, j)][2]}` }}
              </td>
            </tr>
          </tbody>
        </table>
        <hr color="black"/>
        <h4 class="table-title">Action 2</h4>
        <table>
          <tbody>
            <tr v-for="i in rows" :key="i">
              <td v-for="j in columns" :key="j" class="table-entry" :class="{ 'selected': act2 && act2Table[transposeEntry(i, j)][2] === act2[2], 'unselected': act2 && act2Table[transposeEntry(i, j)][2] !== act2[2] }">
                {{ `${act2Table[transposeEntry(i, j)][1]}: ${act2Table[transposeEntry(i, j)][2]}` }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button class="btn btn-secondary button" @click="roll">Roll</button>
      </div>
      <div>
        <button class="btn btn-secondary button" style="margin-left: 2px;" @click="clearRoll">Clear</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import tables from 'src/lib/mythictables.json'

export default defineComponent({
  name: 'MeaningTable',
  components: { },
  data () {
    return {
      act1: undefined as (string | number)[] | undefined,
      act2: undefined as (string | number)[] | undefined
    }
  },
  setup () {
    const d = (size: number) => {
      return Math.floor(Math.random() * size) + 1
    }
    const d1 = ref(d(100))
    const d2 = ref(d(100))

    const actTable = tables[0]?.Meaning?.find((meaning) => meaning.Name === 'Action')

    const act1Table = actTable?.Subcategory?.find((subcategory): subcategory is { Name: string; Table: (string | number)[][] } => subcategory.Name === 'Action 1')?.Table || []
    const act2Table = actTable?.Subcategory?.find((subcategory): subcategory is { Name: string; Table: (string | number)[][] } => subcategory.Name === 'Action 2')?.Table || []

    const columns = 5
    const rows = Math.ceil(act1Table.length / columns)

    const transposeEntry = (i:number, j:number) => {
      return (j - 1) * rows + i - 1
    }

    return {
      d,
      tables,
      d1,
      d2,
      act1Table,
      act2Table,
      columns,
      rows,
      transposeEntry
    }
  },

  methods: {
    roll () {
      this.d1 = this.d(100)
      this.act1 = this.act1Table[this.d1 - 1]
      this.d2 = this.d(100)
      this.act2 = this.act2Table[this.d2 - 1]
    },

    clearRoll () {
      this.act1 = undefined as (string | number)[] | undefined
      this.act2 = undefined as (string | number)[] | undefined
    }
  }
})
</script>

<style lang="scss" scoped>
.button {
  margin-top: 24px;
  height: 26px;
  background-color: $secondary;
  color:$off-white
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

.table-title {
  text-align: center;
  color: $off-white;
  background-color: $secondary;
  margin: 0;
}
.selected {
  font-weight: bold;
  color: $off-white;
  background-color: $primary !important
}

.unselected {
  opacity: 0.5
}

td {
  text-align: left;
  border-right: 1px solid #000000;
  width: 20%;
  white-space: nowrap;
}

table {
  border-collapse: collapse;
  table-layout: auto;
}
</style>
