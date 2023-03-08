<template>
  <q-page class="column items-center justify-evenly">
    <div class="container">
      <div class="row">
        <div>
          <hr color="#555555"/>
          <div style="text-align: center;">
            {{ act1 || '' }}<br>
            {{ act2 || '' }}<br>
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
        <div>
          <div>
            <button class="btn btn-secondary button" @click="roll">Roll</button>
            <button class="btn btn-secondary button" style="margin-left: 2px;" @click="clearRoll">Clear</button>
          </div>
          <button class="btn btn-secondary button" style="margin-top: 1px; margin-left:17px" @click="swapTest">Swap</button>
        </div>
      </div>
    </div>
    <q-img src="../statics/test.png" style="width:250px; height:auto;"/>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import TDisplay from 'src/components/TableDisplay.vue'

export default defineComponent({
  name: 'MeaningPage',
  components: { TDisplay },
  setup () {
    const tabDisplay1 = ref<typeof TDisplay | null>(null)
    const tabDisplay2 = ref<typeof TDisplay | null>(null)

    const meaning1 = ref('Action/Action 1')
    const meaning2 = ref('Action/Action 2')

    const act1 = ref(undefined as (string | undefined) | undefined)
    const act2 = ref(undefined as (string | undefined) | undefined)

    return {
      tabDisplay1,
      tabDisplay2,

      meaning1,
      meaning2,

      act1,
      act2
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
      this.act1 = undefined
      this.act2 = undefined
    },

    swapTest () {
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

    updateResult1 (result: (string | undefined)) {
      this.act1 = result
    },

    updateResult2 (result: (string | undefined)) {
      this.act2 = result
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
