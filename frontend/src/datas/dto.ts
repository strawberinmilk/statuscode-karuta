export type StatusCode = {
  status: string
  statusCode: string
  statusName: string
  statusText: string
  statusCodeId: number
  statusNameId: number
  statusTextId: number
}

export type VoiceAudio = {
  akane: boolean
  track: string | number
}

export type GameMode = 'easy' | 'normal' | 'medium' | 'hard' | 'lunatic'
export const GameModes = ['easy', 'normal', 'medium', 'hard', 'lunatic']

// backendを弄ったら修正すること
export type Score = {
  id: number
  userId: number
  userName: string
  score: number
  gameMode: string
  uuid: string
  createdAt?: Date
  updatedAt?: Date
}
