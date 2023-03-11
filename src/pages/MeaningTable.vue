<template>
  <q-page class="column items-center justify-evenly">
    <div class="container">
      <div class="row">
        <div>
          <hr color="#555555"/>
          <div style="text-align: center;">
            {{ result1 || '' }}<br>
            {{ result2 || '' }}<br>
          </div>
          <T-Display
            :modelValue="meaning1.valueOf()"
            ref="tabDisplay1"
            @new-result="updateResult1"
          />
          <T-Display
            :modelValue="meaning2.valueOf()"
            ref="tabDisplay2"
            @new-result="updateResult2"
          />
        </div>
        <div class="column" style="align-items: center;">
          <div>
            <button class="btn btn-secondary button" @click="roll">Roll</button>
            <button class="btn btn-secondary button" style="margin-left: 2px;" @click="clearRoll">Clear</button>
          </div>
          <button class="btn btn-secondary button" style="margin-top: 5px; margin-right:0px" @click="recordRoll">Journal</button>
          <button class="btn btn-secondary button" style="margin-top: 1px; margin-right:0px" @click="swapTable">Swap</button>
        </div>
      </div>
    </div>
    <q-img src="../statics/test.png" style="width:250px; height:auto;"/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { useCampaign } from 'src/stores/campaign'
import TDisplay from 'src/components/TableDisplay.vue'

interface NewResult {
  roll: number | undefined;
  result: string | undefined;
}

export default defineComponent({
  name: 'MeaningPage',
  components: { TDisplay },
  setup () {
    const campaign = useCampaign()

    const tabDisplay1 = ref<typeof TDisplay | null>(null)
    const tabDisplay2 = ref<typeof TDisplay | null>(null)

    const meaning1 = ref('Action/Action 1')
    const meaning2 = ref('Action/Action 2')

    const act1 = ref<NewResult>({ roll: undefined, result: undefined })
    const act2 = ref<NewResult>({ roll: undefined, result: undefined })

    const result1 = ref(undefined as (string | undefined))
    const result2 = ref(undefined as (string | undefined))

    const recordRoll = () => {
      if (result1.value && result2.value) {
        campaign.appendToJournal(`<br>[[${meaning1.value.split('/')[0]} ${act1.value.roll}/${act2.value.roll}: ${act1.value.result} ${act2.value.result}]]`)
      }
    }
    return {
      campaign,

      tabDisplay1,
      tabDisplay2,

      meaning1,
      meaning2,

      act1,
      act2,

      result1,
      result2,

      recordRoll
    }
  },

  methods: {
    roll () {
      this.tabDisplay1?.roll()
      this.tabDisplay2?.roll()
    },

    clearRoll () {
      this.tabDisplay1?.clearRoll()
      this.tabDisplay2?.clearRoll()
      this.result1 = undefined
      this.result2 = undefined
    },

    swapTable () {
      if (this.meaning1.split('/')[0] === 'Action') {
        this.meaning1 = 'Descriptor/Descriptor 1'
        this.meaning2 = 'Descriptor/Descriptor 2'
        this.clearRoll()
      } else if (this.meaning1.split('/')[0] === 'Descriptor') {
        this.meaning1 = 'Action/Action 1'
        this.meaning2 = 'Action/Action 2'
        this.clearRoll()
      }
    },

    updateResult1 (result: NewResult) {
      this.act1 = result
      this.result1 = `${this.act1.roll}: ${this.act1.result}`
    },

    updateResult2 (result: NewResult) {
      this.act2 = result
      this.result2 = `${this.act2.roll}: ${this.act2.result}`
    }
  }
})
</script>

<style lang="scss" scoped>
.button {
  margin-top: 24px;
  height: 26px;
  background-color: $secondary;
  color:$off-white
}
</style>
