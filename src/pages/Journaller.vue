<template>
  <q-btn class="button" label="New +CF" @click="entryWithMoreChaos" />
  <q-btn class="button" label="New" @click="addJournal" />
  <q-btn class="button" label="New -CF" @click="entryWithLessChaos" />
  <div class="column items-center">
    <h3 style="margin: 0">Journal</h3><br>
    {{ `Latest journal entry is ${campaign.data.journal[campaign.data.journal.length-1].title}` }}<br>
    {{ `Journal length is ${campaign.data.journal.length}` }}<br>
  </div>
  <q-page padding>
    <div v-for="(journal, index) in campaign.data.journal" :key="index">
      <JDisplay
        :index="campaign.data.journal.length - index - 1"
        @remove="removeJournal"
      />
  </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useCampaign } from 'src/stores/campaign'
import { NewJournal } from 'src/lib/campaign'
import JDisplay from 'src/components/JournalDisplay.vue'

export default defineComponent({
  name: 'JournalIndex',
  components: { JDisplay },
  setup () {
    const campaign = useCampaign()

    const entryWithMoreChaos = () => {
      ++campaign.data.chaos_factor
      addJournal()
    }

    const addJournal = () => { campaign.data.journal.push(NewJournal(campaign.data.chaos_factor)) }

    const entryWithLessChaos = () => {
      --campaign.data.chaos_factor
      addJournal()
    }

    const removeJournal = (index: number) => {
      if (campaign.data.journal.length > 1) {
        if (window.confirm('Are you sure you want to delete this entry?')) campaign.data.journal.splice(index, 1)
      }
    }

    return {
      campaign,

      entryWithMoreChaos,
      addJournal,
      entryWithLessChaos,

      removeJournal
    }
  }
})
</script>

<style lang="scss">
.button {
  background: $primary;
  margin-top: 5px;
  margin-left: 5px;
}
</style>
