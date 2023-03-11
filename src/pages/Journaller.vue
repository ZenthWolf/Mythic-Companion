<template>
  <q-btn label="new entry" @click="addJournal" />
  <div class="column items-center">
    <h3 style="margin: 0">Journal</h3><br>
    {{ `First journal title is ${campaign.data.journal[0].title}` }}<br>
    {{ `Journal length is ${campaign.data.journal.length}` }}<br>
  </div>
  <!--<q-page class="column full-width items-center justify-evenly">-->
  <q-page padding>
    <div v-for="(journal, index) in campaign.data.journal" :key="index">
      <JDisplay
        :index="index"
        @remove="removeJournal(index)"
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

    const addJournal = () => { campaign.data.journal.push(NewJournal()) }
    const removeJournal = (index: number) => {
      if (window.confirm('Are you sure you want to delete this entry?')) campaign.data.journal.splice(index, 1)
    }

    return {
      campaign,

      addJournal,
      removeJournal
    }
  }
})
</script>
