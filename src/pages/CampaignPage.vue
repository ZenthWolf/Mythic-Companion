<template>
  <q-page padding>
  <!-- content -->
    <i-input class="q-mb-md" label="Campaign Name" v-model="campaign.data.name" />
    Current Campaign Name: {{ campaign.data.name }}<br>
    <br>
    Our lead character is {{ campaign.data.character[0].name }}<br>
    They are : {{ campaign.data.character[0].desc }}<br>
    And it should be known that : {{ campaign.data.character[0].notes }}<br>
    <q-btn class="col-shrink" flat dense icon="add_circle" @click="addCharacter" />
    <p-character
      v-for="pc,i in campaign.data.character"
      :key="i"
      v-model="campaign.data.character[i]"
      />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import IInput from 'src/components/IInput.vue'
import PCharacter from 'src/components/CharacterForm.vue'
import { useCampaign } from 'src/stores/campaign'

export default defineComponent({
  name: 'CampaignPage',
  components: { IInput, PCharacter },
  setup () {
    const campaign = useCampaign()

    const addCharacter = () => (campaign.newChar())

    return {
      campaign,
      addCharacter
    }
  }
})
</script>
