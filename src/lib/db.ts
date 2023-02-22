import { IConfig, ICampaign } from 'components/models'
import Dexie from 'dexie'

export class MythicDB extends Dexie {
  config: Dexie.Table<IConfig, number>
  campaign: Dexie.Table<ICampaign, string>

  constructor () {
    super('MythicDB')

    this.version(1).stores({
      config: '&id',
      campaign: '&id'
    })

    this.config = this.table('config')
    this.campaign = this.table('campaign')
  }
}

export const db = new MythicDB()
