<template>
  <!--<q-page class="column full-width items-center justify-evenly">-->
  <q-page padding>
    <JDisplay />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import JDisplay from 'src/components/JournalDisplay.vue'

export default defineComponent({
  name: 'JournalIndex',
  components: { JDisplay },
  setup () {
    return {
    }
  }
})
</script>
