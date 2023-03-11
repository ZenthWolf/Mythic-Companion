<template>
  <hr color="#555555"/>
  <q-expansion-item header-class="q-py-none q-px-none" :default-opened="open" expand-icon-toggle>
    <template v-slot:header>
      <div class="row full-width items-center">
        <span class="text-bold">{{ (index + 1).toString().padStart(3,'0') }}:</span>
        <i-input class="col-grow q-ml-sm q-mr-sm" label="Title" v-model="campaign.data.journal[index].title" />
        <q-btn class="col-shrink" flat dense icon="info" @click="testFunction" />
        <!--<q-btn class="col-shrink" v-if="config.data.edit" flat dense icon="delete" @click="$emit('remove')">-->
        <q-btn class="col-shrink" flat dense icon="delete" @click="$emit('remove', index)">
          <q-tooltip>Delete this journal entry</q-tooltip>
        </q-btn>
      </div>
    </template>
    <div class="q-mt-xs q-mb-lg">
      <q-editor placeholder="Journal Body"
      content-class="journal-body"
      v-model="campaign.data.journal[index].content"
      min-height="6rem"
      />
    </div>
  </q-expansion-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useCampaign } from 'src/stores/campaign'
import { useConfig } from 'src/stores/config'
import IInput from 'src/components/IInput.vue'

export default defineComponent({
  name: 'JDisplay',
  components: { IInput },

  props: {
    index: {
      type: Number,
      required: true
    },
    open: {
      type: Boolean,
      default: false
    }
  },

  emits: ['remove'],

  setup () {
    const campaign = useCampaign()
    const config = useConfig()

    const testFunction = () => {
      console.log('buttonclicked')
    }
    return {
      campaign,
      config,

      testFunction
    }
  }
})
</script>

<style lang="scss">
.journal-body {
  background-color: $off-white;
}

.q-editor__toolbar {
  color: $off-white;
  background-color: $secondary;
}
</style>
