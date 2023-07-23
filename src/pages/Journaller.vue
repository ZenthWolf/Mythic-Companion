<template>
  <q-btn class="button" label="New +CF" @click="entryWithMoreChaos" />
  <q-btn class="button" label="New" @click="showNewDialogue = true" />
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
  <q-dialog v-model="showNewDialogue" :maximized="$q.platform.is.mobile">
      <q-card>
        <q-card-section class="text-center text-bold bg-secondary"> New Scene </q-card-section>
        <q-card-section class="text-h6 text-center">Choose change to Chaos Factor</q-card-section>
        <q-card-section>
          <q-radio dense v-model="updateMethod" :val="ChaosUpdate.Decrease" label="Decrease" />
          <q-radio dense v-model="updateMethod" :val="ChaosUpdate.Retain" label="Retain" />
          <q-radio dense v-model="updateMethod" :val="ChaosUpdate.Increase" label="Increase" />
          <q-radio dense v-model="updateMethod" :val="ChaosUpdate.Set" label="Set" />
          <q-btn-dropdown
            label="CF"
            class="rounded q-ml-sm"
          /><br>
          {{ `You've selected: ${ChaosUpdate[updateMethod]}` }}
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            color="warning"
            label="CLOSE"
            @click="testFn()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue'

import { useCampaign } from 'src/stores/campaign'
import { NewJournal } from 'src/lib/campaign'
import JDisplay from 'src/components/JournalDisplay.vue'

enum ChaosUpdate {
      Decrease,
      Retain,
      Increase,
      Set,
      UNDEFINED
    }

export default defineComponent({
  name: 'JournalIndex',
  components: { JDisplay },
  setup () {
    const campaign = useCampaign()
    const showNewDialogue = ref(false)

    const updateMethod = ref(ChaosUpdate.UNDEFINED)
    const selectedChaos = ref(undefined as (number | undefined))

    const testFn = () => {
      console.log(typeof updateMethod.value)
      switch (updateMethod.value) {
        case ChaosUpdate.Decrease:
          console.log('Decr')
          break
        case ChaosUpdate.Retain:
          console.log('Rtn')
          break
        case ChaosUpdate.Increase:
          console.log('Incr')
          break
        case ChaosUpdate.Set:
          console.log('Set')
          break
        case ChaosUpdate.UNDEFINED:
          console.log('HELP HELP')
          break
        default:
          console.log('HOLY FUCK THIS BROKE')
          break
      }
      updateMethod.value = ChaosUpdate.UNDEFINED
      showNewDialogue.value = false
    }

    const entryWithMoreChaos = () => {
      campaign.increaseChaos()
      addJournal()
    }

    const addJournal = () => { campaign.data.journal.push(NewJournal(campaign.data.chaos_factor)) }

    const entryWithLessChaos = () => {
      campaign.decreaseChaos()
      addJournal()
    }

    const removeJournal = (index: number) => {
      if (campaign.data.journal.length > 1) {
        if (window.confirm('Are you sure you want to delete this entry?')) campaign.data.journal.splice(index, 1)
      }
    }

    return {
      campaign,
      showNewDialogue,
      ChaosUpdate,
      selectedChaos,
      updateMethod,
      testFn,

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
