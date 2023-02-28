<template>
  <q-page class="column items-center justify-evenly">
    <meaning-table/>
    <q-img src="../statics/test.png" style="width:250px; height:auto;"/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useConfig } from 'src/stores/config'
import { useCampaign } from 'src/stores/campaign'

import MeaningTable from 'src/components/TableRoller.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { MeaningTable },
  setup () {
    const config = useConfig()
    const campaign = useCampaign()

    return { config, campaign }
  }
})
</script>
