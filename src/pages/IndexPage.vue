<template>
  <q-page class="row items-center justify-evenly">
    <q-img src="../statics/test.png" style="width:250px; height:auto;"/>
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script lang="ts">
import { Meta } from 'components/models'
import ExampleComponent from 'components/ExampleComponent.vue'
import { defineComponent, ref, computed } from 'vue'
import { useConfig } from 'src/stores/config'

export default defineComponent({
  name: 'IndexPage',
  components: { ExampleComponent },
  setup () {
    const config = useConfig()

    if (config.data.index[0]) {
      config.data.index[0].name = 'Success, at a price'
    }

    const todos = computed(() => [
      {
        id: 1,
        content: config.data.index.length.toString()
      },
      {
        id: 2,
        content: config.data.index.length > 0 ? config.data.index[0].name : 'Err: No Campaign Loaded'
      },
      {
        id: 3,
        content: config.data.index.length > 0 ? config.data.index[0].id : 'Err: No Campaign Loaded'
      },
      {
        id: 4,
        content: 'ct4'
      },
      {
        id: 5,
        content: 'ct5'
      }
    ])
    const meta = ref<Meta>({
      totalCount: 1200
    })
    return { config, todos, meta }
  }
})
</script>
