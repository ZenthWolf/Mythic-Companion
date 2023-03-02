<template>
  <q-page class="column items-center justify-evenly">
    <HighlightTest/>
  </q-page>
</template>

<script lang="ts">
import { Meta } from 'components/models'
import HighlightTest from 'src/components/HighlightTest.vue'
import { defineComponent, ref } from 'vue'

import { useConfig } from 'src/stores/config'
import { useCampaign } from 'src/stores/campaign'

export default defineComponent({
  name: 'IndexPage',
  components: { HighlightTest },
  setup () {
    const config = useConfig()
    const campaign = useCampaign()

    const meta = ref<Meta>({
      totalCount: 1200
    })
    return { config, campaign, meta }
  }
})
</script>
