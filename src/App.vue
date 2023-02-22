<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, watch, onMounted } from 'vue'
import { useCampaign } from 'stores/campaign'
import { useConfig } from 'stores/config'
import { debounce } from 'quasar'
import { sleep } from 'src/lib/util'

export default defineComponent({
  name: 'App',
  setup () {
    const campaign = useCampaign()
    const config = useConfig()

    const initialiseData = async () => {
      await campaign.populateStore().catch((err) => console.log(err))
    }

    onMounted(async () => {
      await initialiseData()
      console.log('here')
      console.log(config.data.index[0].name)
    })

    watch(
      () => config.$state,
      async () => {
        await config.save()
      },
      { deep: true }
    )
    watch(
      () => config.$state.data.current,
      async () => {
        await campaign.load(config.data.current)
      }
    )
    watch(
      () => campaign.$state,
      debounce(async () => {
        config.data.saving = true
        await campaign.save()
        await sleep(200)
        config.data.saving = false
      }, 1000),
      { deep: true }
    )
  }
})
</script>
