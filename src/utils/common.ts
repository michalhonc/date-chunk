import type { ChunkDate, TimeType } from '../types'

type TimeTypeList = {
  [key in TimeType]: number;
}

export const timeTypeList: TimeTypeList = {
  ms: 1,
  s: 1000,
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000,
}

export function getTimestamp(time: ChunkDate): number {
  return time instanceof Date ? time.valueOf() : time
}
