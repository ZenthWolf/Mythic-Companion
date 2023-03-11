import { defineStore } from 'pinia'
import {
  ICampaign
} from 'components/models'

import { NewCampaign, NewJournal } from 'src/lib/campaign'
import { useConfig } from './config'
import { db } from 'src/lib/db'
import { v4 as uuid } from 'uuid'

export const useCampaign = defineStore({
  id: 'campaign',

  state () {
    return {
      data: NewCampaign()
    }
  },

  actions: {
    async new () {
      const config = useConfig()

      const newCam = NewCampaign()
      this.data = newCam

      config.data.current = this.data.id
      config.data.index.push({
        name: this.data?.name,
        id: this.data.id
      })

      const storeCopy = JSON.parse(JSON.stringify(this.data)) as ICampaign
      await db.campaign.put(storeCopy).catch((err) => console.log(err))
    },

    async newChar () {
      const character = {
        id: uuid(),
        name: 'NewPlayer',
        desc: '',
        notes: ''
      }
      this.data.character.push(character)
    },

    async removeChar (id: string) {
      const indexToRemove = this.data.character.findIndex(c => c.id === id)

      if (indexToRemove !== -1) {
        this.data.character.splice(indexToRemove, 1)
      }
    },

    appendToJournal (text: string) {
      const latestIndex = this.data.journal.length - 1
      this.data.journal[latestIndex].content += text
    },

    async save () {
      const storeCopy = JSON.parse(JSON.stringify(this.data)) as ICampaign
      await db.campaign.update(this.data.id, storeCopy).catch((err) => console.log(err))

      const config = useConfig()
      await config.updateIndex()
    },

    async loadFirst () {
      const config = useConfig()

      const allCampaigns = await db.campaign.toCollection().sortBy('name')
      const nextCampaign = allCampaigns[0]
      const nextCampaignId = nextCampaign?.id
      if (nextCampaignId) {
        await this.load(nextCampaignId)
        config.data.current = nextCampaignId
      } else {
        await this.new()
      }

      await config.updateIndex()
    },

    async load (id: string) {
      try {
        const campaign = await db.campaign.get(id)
        if (campaign) {
          // Example of updating functionality to old users
          if (!campaign.journal) {
            campaign.journal = [NewJournal()]
          }
          this.data = campaign
        } else {
          await this.loadFirst()
        }
      } catch (err) {
        console.log(err)
      }
    },

    async delete (id: string) {
      try {
        const config = useConfig()
        await db.campaign.delete(id)
        if (id === config.data.current) {
          this.loadFirst()
        }

        await config.updateIndex()
      } catch (err) {
        console.log(err)
      }
    },

    async populateStore () {
      const config = useConfig()
      await config.populateStore()

      if ((await db.campaign.count()) > 0 && config.data.current !== '') {
        try {
          await this.load(config.data.current)
        } catch (err) {
          console.log(err)
        }
      } else {
        await this.new()
        await config.updateIndex()
      }
    }
  }
})
