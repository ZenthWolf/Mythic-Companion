<template>
  <hr color="#555555"/>
  <h4 class="table-title">Table Title</h4>
  {{ selected ? `${selected[1]}: ${selected[2]}` : '' }}
  <table v-on:mousedown="primeDrag" v-on:mousemove="dragUpdate">
    <tbody>
      <tr v-for="i in rows" :key="i">
        <td v-for="j in columns" :key="j" class="table-entry" :class="{ 'selected': selected && modelValue[transposeEntry(i, j)][2] === selected[2], 'unselected': selected && modelValue[transposeEntry(i, j)][2] !== selected[2] }" :data-flr="modelValue[transposeEntry(i, j)][0]" :data-clg="modelValue[transposeEntry(i, j)][1]">
          {{ `${modelValue[transposeEntry(i, j)][1]}: ${modelValue[transposeEntry(i, j)][2]}` }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">

import {
  defineComponent, ref, PropType,
  onMounted
} from 'vue'

export default defineComponent({
  name: 'TDisplay',

  props: {
    modelValue: {
      type: Array as PropType<(string | number)[][]>,
      required: true
    },
    columns: {
      type: Number,
      default: 5
    }
  },

  emits: ['new-result'],
  setup (props, { emit }) {
    const drag = ref(false)
    const rows = Math.ceil(props.modelValue.length / props.columns)

    const d = (size: number) => {
      return Math.floor(Math.random() * size) + 1
    }

    const d1 = ref<number | undefined>(undefined)
    const selected = ref(d1.value ? props.modelValue[d1.value - 1] : undefined)

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
      selected.value = d1.value ? props.modelValue[d1.value - 1] : undefined
      emit('new-result', selected.value ? `${selected.value[1]}: ${selected.value[2]}` : 'undefined')
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

    return {
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
