<template>
  <q-page padding>
  <!---->
    <i-input class="q-mb-md" label="Campaign Name" v-model="campaign.data.name" />
    Current Campaign Name: {{ campaign.data.name }}
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IInput from 'src/components/IInput.vue'
import { useCampaign } from 'src/stores/campaign'

export default defineComponent({
  name: 'CampaignPage',
  components: { IInput },
  setup () {
    const campaign = useCampaign()
    return {
      campaign
    }
  }
})
</script>
