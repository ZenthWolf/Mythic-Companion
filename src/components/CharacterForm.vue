<template>
    <i-input class="q-mb-md" label="Name" v-model="character.name" />
    <i-input class="q-mb-md" label="Description" v-model="character.desc" />
    <i-input class="q-mb-md" label="Notes" v-model="character.notes" />
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue'

import { ICharacter } from './models'
import IInput from 'src/components/IInput.vue'

export default defineComponent({
  name: 'PCharacter',
  components: { IInput },
  props: {
    modelValue: {
      type: Object as PropType<ICharacter>,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const character = ref(props.modelValue)
    watch(
      () => character.value,
      () => emit('update:modelValue', character.value),
      { deep: true }
    )
    watch(
      () => props.modelValue,
      () => (character.value = props.modelValue),
      { deep: true }
    )
    return {
      character
    }
  }
})
</script>
