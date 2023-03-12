import {
  ICampaign, ICharacter, IJournalEntry
} from 'src/components/models'
import { v4 as uuid } from 'uuid'

export const NewCharacter = (): ICharacter => {
  return {
    id: uuid(),
    name: 'Simon',
    desc: '',
    notes: ''
  }
}

export const NewJournal = (cf: number): IJournalEntry => {
  return {
    title: 'New Entry',
    chaos_factor: cf,
    content: ''
  }
}

export const NewCampaign = (): ICampaign => {
  return {
    id: uuid(),
    name: 'Campaign Name',
    chaos_factor: 5,
    character: [NewCharacter()],
    npc: [],
    thread: [],
    journal: [NewJournal(5)]
  }
}
