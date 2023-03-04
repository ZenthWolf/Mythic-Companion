<template>
  <div class="container">
    <div class="row">
      <div>
        <hr color="#555555"/>
          <div v-if="act1 && act2" style="text-align: center;">
            {{ d1 }} {{ act1[2] }}<br>
            {{ d2 }} {{ act2[2] }}<br>
          </div>
          <div v-else>
            <br><br>
          </div>
          <hr color="#555555"/>
        <h4 class="table-title">Action 1</h4>
        <table v-on:mousedown="primeDrag1" v-on:mousemove="dragUpdate1">
          <tbody>
            <tr v-for="i in rows" :key="i">
              <td v-for="j in columns" :key="j" class="table-entry" :class="{ 'selected': act1 && act1Table[transposeEntry(i, j)][2] === act1[2], 'unselected': act1 && act1Table[transposeEntry(i, j)][2] !== act1[2] }" :data-flr="act1Table[transposeEntry(i, j)][0]" :data-clg="act1Table[transposeEntry(i, j)][1]">
                {{ `${act1Table[transposeEntry(i, j)][1]}: ${act1Table[transposeEntry(i, j)][2]}` }}
              </td>
            </tr>
          </tbody>
        </table>
        <hr color="#555555"/>
        <h4 class="table-title">Action 2</h4>
        <table v-on:mousedown="primeDrag2" v-on:mousemove="dragUpdate2">
          <tbody>
            <tr v-for="i in rows" :key="i">
              <td v-for="j in columns" :key="j" class="table-entry" :class="{ 'selected': act2 && act2Table[transposeEntry(i, j)][2] === act2[2], 'unselected': act2 && act2Table[transposeEntry(i, j)][2] !== act2[2] }" :data-flr="act1Table[transposeEntry(i, j)][0]" :data-clg="act1Table[transposeEntry(i, j)][1]">
                {{ `${act2Table[transposeEntry(i, j)][1]}: ${act2Table[transposeEntry(i, j)][2]}` }}
              </td>
            </tr>
          </tbody>
        </table>
        <T-Display
          :modelValue="act1Table"
          :roll="d3"
          @roll-update="iforogtthedamnname"
        />
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
import { defineComponent, ref, onMounted } from 'vue'

import tables from 'src/lib/mythictables.json'
import TDisplay from 'src/components/TableDisplay.vue'

export default defineComponent({
  name: 'MeaningTable',
  components: { TDisplay },
  setup () {
    const d = (size: number) => {
      return Math.floor(Math.random() * size) + 1
    }
    const d1 = ref(d(100))
    const d2 = ref(d(100))
    const d3 = ref(d(100))

    const actTable = tables[0]?.Meaning?.find((meaning) => meaning.Name === 'Action')

    const act1Table = actTable?.Subcategory?.find((subcategory): subcategory is { Name: string; Table: (string | number)[][] } => subcategory.Name === 'Action 1')?.Table || []
    const act2Table = actTable?.Subcategory?.find((subcategory): subcategory is { Name: string; Table: (string | number)[][] } => subcategory.Name === 'Action 2')?.Table || []

    const act1 = ref(undefined as (string | number)[] | undefined)
    const act2 = ref(undefined as (string | number)[] | undefined)
    const columns = 5
    const rows = Math.ceil(act1Table.length / columns)

    const transposeEntry = (i:number, j:number) => {
      return (j - 1) * rows + i - 1
    }

    // CODE DUPLICATION TO BE CLEARED UP IN A COMPONENT THAT HANDLES DRAWING A TABLE
    const dragPrimed1 = ref(false)
    const dragPrimed2 = ref(false)

    const primeDrag1 = (event: MouseEvent) => {
      if (dragPrimed1.value === false) {
        const cell = (event.target as HTMLElement)
        const floor = Number(cell.dataset.flr)
        const ceil = Number(cell.dataset.clg)

        if (floor && ceil) {
          if (d1.value >= floor && d1.value <= ceil) {
            event.preventDefault()
            dragPrimed1.value = true
            d1.value = Math.floor((floor + ceil) / 2)
          }
        }
      }
    }

    const primeDrag2 = (event: MouseEvent) => {
      if (dragPrimed2.value === false) {
        const cell = (event.target as HTMLElement)
        const floor = Number(cell.dataset.flr)
        const ceil = Number(cell.dataset.clg)

        if (floor && ceil) {
          if (d2.value >= floor && d2.value <= ceil) {
            event.preventDefault()
            dragPrimed2.value = true
            d2.value = Math.floor((floor + ceil) / 2)
          }
        }
      }
    }

    const update = () => {
      act1.value = act1Table[d1.value - 1]
      act2.value = act2Table[d2.value - 1]
    }

    const dragUpdate1 = (event: MouseEvent) => {
      if (dragPrimed1.value === true) {
        const cell = event.target as HTMLElement

        const floor = Number(cell.dataset.flr)
        const ceil = Number(cell.dataset.clg)

        if (floor && ceil) {
          d1.value = Math.floor((floor + ceil) / 2)
          update()
        }
      }
    }

    const dragUpdate2 = (event: MouseEvent) => {
      if (dragPrimed2.value === true) {
        const cell = event.target as HTMLElement

        const floor = Number(cell.dataset.flr)
        const ceil = Number(cell.dataset.clg)

        if (floor && ceil) {
          d2.value = Math.floor((floor + ceil) / 2)
          update()
        }
      }
    }

    const endDrag = () => {
      dragPrimed1.value = false
      dragPrimed2.value = false
    }

    onMounted(() => {
      document.addEventListener('mouseup', endDrag)
    })

    return {
      d,
      tables,
      d1,
      d2,
      d3,
      act1Table,
      act2Table,
      act1,
      act2,
      columns,
      rows,
      transposeEntry,
      dragPrimed1,
      dragPrimed2,
      primeDrag1,
      dragUpdate1,
      primeDrag2,
      dragUpdate2,
      update,
      endDrag
    }
  },

  methods: {
    roll () {
      this.d1 = this.d(100)
      this.d2 = this.d(100)
      this.update()
    },

    clearRoll () {
      this.act1 = undefined as (string | number)[] | undefined
      this.act2 = undefined as (string | number)[] | undefined
    },

    iforogtthedamnname (whatever: number) {
      this.d3 = whatever
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
