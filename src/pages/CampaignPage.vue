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
    <draggable
      class='pc-list'
      :component-data="{
        tag: 'ul',
        type: 'transition-group',
        name: !drag ? 'flip-list' : null
      }"
      v-model='campaign.data.character'
      v-bind='dragOptions'
      @start='drag = true'
      @end='drag = false'
    >
      <template #item='{ element }'>
        <div class='list-group-item'>
          <i
            :class='
              element.fixed ? "fa fa-anchor" : "glyphicon glyphicon-pushpin"
            '
            @click='element.fixed = !element.fixed'
            aria-hidden='true'
          ></i>
          <p-character
            :modelValue="element"
          />
        </div>
      </template>
    </draggable>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import draggable from 'vuedraggable'

import IInput from 'src/components/IInput.vue'
import PCharacter from 'src/components/CharacterForm.vue'
import { useCampaign } from 'src/stores/campaign'

export default defineComponent({
  name: 'CampaignPage',
  components: { draggable, IInput, PCharacter },
  setup () {
    const drag = ref(false)
    const campaign = useCampaign()

    const addCharacter = () => (campaign.newChar())

    return {
      drag,
      campaign,
      addCharacter
    }
  },

  computed: {
    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  }
})
</script>
