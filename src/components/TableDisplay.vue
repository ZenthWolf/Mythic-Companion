<template>
  <hr color="#555555"/>
  <h4 class="table-title">Table Title</h4>
  {{ roll ? roll : 'err' }}
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

import { defineComponent, ref, PropType, onMounted } from 'vue'

export default defineComponent({
  name: 'TDisplay',

  props: {
    modelValue: {
      type: Array as PropType<(string | number)[][]>,
      required: true
    },
    roll: {
      type: Number,
      default: undefined
    },
    columns: {
      type: Number,
      default: 5
    }
  },

  emits: ['roll-update'],
  setup (props, { emit }) {
    const drag = ref(false)
    const rows = Math.ceil(props.modelValue.length / props.columns)

    const selected = ref(props.roll ? props.modelValue[props.roll - 1] : undefined)

    const transposeEntry = (i:number, j:number) => {
      return (j - 1) * rows + i - 1
    }

    const primeDrag = (event: MouseEvent) => {
      if (drag.value === false) {
        const cell = (event.target as HTMLElement)
        const floor = Number(cell.dataset.flr)
        const ceil = Number(cell.dataset.clg)

        if (floor && ceil && props.roll) {
          if (props.roll >= floor && props.roll <= ceil) {
            event.preventDefault()
            drag.value = true
          }
        }
      }
    }

    const updateSelection = () => {
      selected.value = props.roll ? props.modelValue[props.roll - 1] : undefined
    }

    const dragUpdate = (event: MouseEvent) => {
      if (drag.value === true) {
        const cell = event.target as HTMLElement

        const floor = Number(cell.dataset.flr)
        const ceil = Number(cell.dataset.clg)

        if (floor && ceil) {
          console.log('echo')
          emit('roll-update', Math.floor((floor + ceil) / 2))
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
      selected,
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
