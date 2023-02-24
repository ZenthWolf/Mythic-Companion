<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="height: 200px; padding: 20px;">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          Mythic Companion
        </q-toolbar-title>

        <div>By: ZenthWolf</div>
      </q-toolbar>
      <q-tabs class="mythic-tabs" align="center" dense justify="center">
        <q-route-tab to="/" label="Campaign" />
        <q-route-tab to="/index" label="Index" />
        <q-route-tab to="/testground" label="TestGround" />
      </q-tabs>
      <q-img
        src="../statics/TESTONLY/MythicTitle.png"
        cover
        fit="fill"
        class="header-image absolute-top"/>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Campaigns
        </q-item-label>
        <q-btn class="full-width" label="New Campaign" @click="addCampaign" icon-right="add" />
        <q-item
          v-for="(item,index) in config.data.index.sort((a,b) => (a.name || '').localeCompare(b.name))"
          :key="index"
          :active="item.id == campaign.data?.id"
          clickable
          v-ripple
          >
          <q-item-section @click="config.data.current = item.id">
            {{ item.name || '(unnamed)' }}
          </q-item-section>
          <q-item-section class="col-shrink" v-if="config.data.index.length > 1">
            <q-btn
              icon="delete"
              flat
              dense
              @click="
                campaignToDelete = item.id;
                campaignToDeleteName = item.name;
                showCampaignDelete = true;
              "
            />
          </q-item-section>
        </q-item>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-item clickable v-ripple @click="showAbout = true">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>
            About
            <q-tooltip>About this app</q-tooltip>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-dialog v-model="showCampaignDelete" :maximized="$q.platform.is.mobile">
      <q-card>
        <q-card-section class="text-center text-bold bg-secondary"> Delete Campaign </q-card-section>
        <q-card-section class="text-h6 text-center"> Warning!</q-card-section>
        <q-card-section class="text-subtitle">
          <p>Deleting a campaign cannot be reversed. Consider exporting before deleting.</p>
          <q-card-section class="text-h6 text-center"> Delete '{{ campaignToDeleteName }}'?</q-card-section>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            color="warning"
            label="DELETE"
            @click="removeCampaign(campaignToDelete).then(() => {
              showCampaignDelete = false;
            })"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showAbout" :maximized="$q.platform.is.mobile">
      <q-card class="card-bg">
        <q-card-section class="row bg-secondary text-h5 justify-between">
          <div class="col-grow sf-header">About</div>
          <q-btn class="col-shrink" flat dense icon="close" @click="showAbout = false" />
        </q-card-section>
        <q-card-section class="about-text text-justify">
          <div class="q-my-sm">
            Mythic GME 2E is &copy;
            <a href="https://www.wordmillgames.com/page/mythic-gme.html">Tana Pigeon</a>
          </div>
          <div class="q-my-sm">
            Made with inspiration from
            <a href="https://nboughton.uk/">Nick Boughton</a> and his great tools for Ironsworn.
          </div>
          <div class="q-my-sm">
            A real, official app for Mythic 2E is in development, and this project certainly isn't it. Keep an eye out for it!
            Keep an eye out for it on the <a href="https://discord.gg/qMqNmNx">Discord Channel</a>!
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

import { useConfig } from 'src/stores/config'
import { useCampaign } from 'src/stores/campaign'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const showAbout = ref(false)

    const config = useConfig()
    const campaign = useCampaign()

    const addCampaign = () => (campaign.new())
    const removeCampaign = (id: string) => campaign.delete(id)
    const campaignToDelete = ref('')
    const campaignToDeleteName = ref('')
    const showCampaignDelete = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      config,
      campaign,
      addCampaign,
      removeCampaign,
      campaignToDelete,
      campaignToDeleteName,
      showCampaignDelete,
      showAbout,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

<style lang="scss">
  .header-image {
    max-height: 100%;
    max-width: 100%;
    object-fit: cover;
    z-index: -1;
    opacity: 0.75;
  }

  .mythic-tabs {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
