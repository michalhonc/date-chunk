export type ChunkDate = number | Date

export type TimeType = 'ms' | 's' | 'm' | 'h' | 'd'

export type MaxLimitPerChunk = [number, TimeType]

export type Dates = Array<{
  start: ChunkDate
  end: ChunkDate
}>

export interface ChunkDateOptionsBase {
  start: ChunkDate
  end: ChunkDate
}

export interface MaxLimitPerChunkOptions extends ChunkDateOptionsBase {
  maxLimitPerChunk: MaxLimitPerChunk
}

export interface ChunksOptions extends ChunkDateOptionsBase {
  chunks: number
  strictSizedChunks?: boolean
}

export type ChunkDateOptions = ChunksOptions | MaxLimitPerChunkOptions
