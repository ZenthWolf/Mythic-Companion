<template>
  <hr color="#555555"/>
  <h4 class="table-title">{{meaning.Name}}</h4>
  <table v-on:mousedown="primeDrag" v-on:mousemove="dragUpdate">
    <tbody>
      <tr v-for="i in rows" :key="i">
        <td v-for="j in columns" :key="j" class="table-entry" :class="{ 'selected': selected && meaning.Table[transposeEntry(i, j)][2] === selected[2], 'unselected': selected && meaning.Table[transposeEntry(i, j)][2] !== selected[2] }" :data-flr="meaning.Table[transposeEntry(i, j)][0]" :data-clg="meaning.Table[transposeEntry(i, j)][1]">
          {{ `${meaning.Table[transposeEntry(i, j)][1]}: ${meaning.Table[transposeEntry(i, j)][2]}` }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">

import {
  defineComponent,
  ref, onMounted, watch
} from 'vue'

import tables from 'src/lib/mythictables.json'

export default defineComponent({
  name: 'TDisplay',

  props: {
    modelValue: {
      type: String,
      required: true
    },
    columns: {
      type: Number,
      default: 5
    }
  },

  emits: ['new-result'],
  setup (props, { emit }) {
    const parse = (id: string) => {
      const path = id.split('/')
      const category = tables[0]?.Meaning?.find((meaning) => meaning.Name === path[0])
      return category?.Subcategory?.find((subcategory): subcategory is { Name: string; Table: (string | number)[][] } => subcategory.Name === path[1]) || { Name: 'Table Error', Table: [] }
    }

    const meaning = ref(parse(props.modelValue))
    const rows = Math.ceil(meaning.value.Table.length / props.columns)

    const d = (size: number) => {
      return Math.floor(Math.random() * size) + 1
    }

    const d1 = ref<number | undefined>(undefined)
    const selected = ref(d1.value ? meaning.value.Table[d1.value - 1] : undefined)

    const transposeEntry = (i:number, j:number) => {
      return (j - 1) * rows + i - 1
    }

    const roll = () => {
      d1.value = d(100)
      updateSelection()
    }

    const clearRoll = () => {
      d1.value = undefined
      selected.value = undefined
    }

    const drag = ref(false)

    const primeDrag = (event: MouseEvent) => {
      if (drag.value === false) {
        const cell = (event.target as HTMLElement)
        const floor = Number(cell.dataset.flr)
        const ceil = Number(cell.dataset.clg)

        if (floor && ceil && d1.value) {
          if (d1.value >= floor && d1.value <= ceil) {
            event.preventDefault()
            drag.value = true
          }
        }
      }
    }

    const updateSelection = () => {
      selected.value = d1.value ? meaning.value.Table[d1.value - 1] : undefined
      const result = {
        roll: d1.value,
        result: selected.value ? selected.value[2] : undefined
      }
      emit('new-result', result)
    }

    const dragUpdate = (event: MouseEvent) => {
      if (drag.value === true) {
        const cell = event.target as HTMLElement

        const floor = Number(cell.dataset.flr)
        const ceil = Number(cell.dataset.clg)

        if (floor && ceil) {
          d1.value = Math.floor((floor + ceil) / 2)
          updateSelection()
        }
      }
    }

    const endDrag = () => {
      drag.value = false
    }

    onMounted(() => {
      document.addEventListener('mouseup', endDrag)
    })

    watch(
      () => props.modelValue,
      () => {
        meaning.value = parse(props.modelValue)
      },
      { deep: true }
    )

    return {
      parse,
      meaning,
      drag,
      rows,
      d,
      d1,
      selected,
      roll,
      clearRoll,
      transposeEntry,
      primeDrag,
      updateSelection,
      dragUpdate
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
