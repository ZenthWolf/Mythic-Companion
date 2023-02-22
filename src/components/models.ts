export interface Todo {
  id: number
  content: string
}

export interface Meta {
  totalCount: number
}

// Character (PC)
export interface ICharacter {
  id: string
  name: string
  desc: string
  notes: string
}

export interface IIndexItem {
  name: string
  id: string
}

export interface IConfig {
  id: number
  current: string
  index: IIndexItem[]
  saving: boolean
}
// NPC (Non-Player Character)
export interface INPC {
  id: string
  name: string
  desc: string
  notes: string
  threadID: string[]
}

// Thread
export interface IThread {
  id: string
  name: string
  npcID: string[]
}

// Campaign
export interface ICampaign {
  id: string
  name: string
  character: ICharacter[]
  npc: INPC[]
  thread: IThread[]
}
