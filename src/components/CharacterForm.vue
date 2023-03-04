<template>
    <hr color="#555555"/>
    <q-item>
      <q-item-section>
        <i-input class="q-mb-md" label="Name" v-model="character.name" />
      </q-item-section>
        <q-item-section class="col-shrink" v-if="campaign.data.character.length > 1">
          <q-btn
            icon="delete"
            flat
            dense
            @click="
                pcToDelete = character.id;
                pcToDeleteName = character.name;
                showPCDelete = true;"
          />
      </q-item-section>
    </q-item>
    <i-input class="q-mb-md" label="Description" v-model="character.desc" />
    <i-input class="q-mb-md" label="Notes" v-model="character.notes" />
    <q-dialog v-model="showPCDelete" :maximized="$q.platform.is.mobile">
      <q-card>
        <q-card-section class="text-center text-bold bg-secondary card-title"> Delete Character </q-card-section>
        <q-card-section class="text-h6 text-center"> Warning!</q-card-section>
        <q-card-section class="text-subtitle">
          <p>Deleting a character cannot be reversed.</p>
          <q-card-section class="text-h6 text-center"> Delete '{{ pcToDeleteName }}'?</q-card-section>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            color="warning"
            label="DELETE"
            @click="removePC(pcToDelete).then(() => {
              showPCDelete = false;
            })"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue'

import { ICharacter } from './models'
import IInput from 'src/components/IInput.vue'
import { useCampaign } from 'src/stores/campaign'

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
    const campaign = useCampaign()

    const removePC = (id: string) => campaign.removeChar(id)
    const pcToDelete = ref('')
    const pcToDeleteName = ref('')
    const showPCDelete = ref(false)

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
      character,
      campaign,
      removePC,
      pcToDelete,
      pcToDeleteName,
      showPCDelete,
      props
    }
  }
})
</script>

<style lang="scss" scoped>
.card-title{
  color: $off-white
}
</style>
