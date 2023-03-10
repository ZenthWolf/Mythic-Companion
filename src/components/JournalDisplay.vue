<template>
  {{ `For ${campaign.data.name}` }}<br>
  {{ `Journal title is ${campaign.data.journal[0].title}` }}<br>
  {{ `Journal length is ${campaign.data.journal.length}` }}<br>
  <q-expansion-item class="q-px-sm" header-class="q-py-none q-px-none" :default-opened="open" expand-icon-toggle>
    <template v-slot:header>
      <div class="column full-width items-center">
        <div class="row">
          <i-input label="Title" v-model="campaign.data.journal[0].title" />
          <q-btn flat dense icon="info" @click="testFunction" />
          <!--<q-btn class="col-shrink" v-if="config.data.edit" flat dense icon="delete" @click="$emit('remove')">-->
          <q-btn flat dense icon="delete" @click="$emit('remove')">
            <q-tooltip>Delete this journal entry</q-tooltip>
          </q-btn>
        </div>
        <div class="q-pa-md q-gutter-sm">
          <q-editor placeholder="Journal Body"
          content-class="journal-body"
          v-model="campaign.data.journal[0].content"
          min-height="6rem"
          />
        </div>
      </div>
    </template>
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

  setup () {
    const campaign = useCampaign()
    const config = useConfig()

    const open = false

    const testFunction = () => {
      console.log('buttonclicked')
    }
    return {
      campaign,
      config,

      open,

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
