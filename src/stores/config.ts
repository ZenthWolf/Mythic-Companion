import { defineStore } from 'pinia'
import { IConfig } from 'components/models'
import { NewConfig } from 'src/lib/config'
import { db } from 'src/lib/db'

export const useConfig = defineStore({
  id: 'config',

  state () {
    return {
      data: NewConfig()
    }
  },

  actions: {
    async populateStore () {
      if ((await db.config.count()) > 0) {
        try {
          this.data = (await db.config.where('id').equals(1).first()) as IConfig
        } catch (err) {
          console.log(err)
        }
      } else {
        const conf = NewConfig()
        this.data = conf
        db.config.put(conf).catch((err: Error) => console.log(err))
      }
    },

    async save () {
      console.log('saved')
    },

    async updateIndex () {
      const campaigns = await db.campaign.toArray()
      this.data.index = campaigns.map((c) => ({
        name: c.name,
        id: c.id
      }))
    }
  }
})
