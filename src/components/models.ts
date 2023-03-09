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

// Journal Entry
export interface IJournalEntry {
  title: string;
  content: string;
  pinned?: boolean;
}

// Campaign
export interface ICampaign {
  id: string
  name: string
  character: ICharacter[]
  npc: INPC[]
  thread: IThread[]
  journal: IJournalEntry[]
}

// Index a Collection
export interface IIndexItem {
  name: string
  id: string
}

// Game Configuration
export interface IConfig {
  id: number
  current: string
  index: IIndexItem[]
  saving: boolean
}

// Meaning Table
export interface IMeaningTable {
  Name: string
  Table: (string | number)[][]
}
