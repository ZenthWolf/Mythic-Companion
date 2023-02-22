import {
  ICampaign
} from 'src/components/models'
import { v4 as uuid } from 'uuid'

export const NewCampaign = (): ICampaign => {
  const character = {
    id: uuid(),
    name: 'Simon',
    desc: '',
    notes: ''
  }

  return {
    id: uuid(),
    name: 'Campaign Name',
    character: [character],
    npc: [],
    thread: []
  }
}

/*  id: string;
name: string;
character: ICharacter[];
npc: INPC[];
thread: IThread[]; */
