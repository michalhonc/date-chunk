declare module 'date-chunk/chunkDate' {
  import type { ChunkDateOptions, Dates } from 'date-chunk/types';
  /**
   * DateUnit
   * @typedef {'ms'|'s'|'m'|'h'|'d'} DateUnit
   */
  /**
   * Dates
   * @typedef {Object} Dates
   * @property {Date | number} start - Indicates start date
   * @property {Date | number} end - Indicates end date
   */
  /**
   * Split date range into multiple chunks.
   * @param {Object} options - ChunkDateOptions
   * @param {Date | number} options.start
   * @param {Date | number} options.end
   * @param {number} options.chunks
   * @param {boolean} options.strictSizeChunks=false
   * @param {[number, DateUnit]} options.maxLimitPerChunk
   * @return {Dates[]} Chunked date range
   */
  export function chunkDate(options: ChunkDateOptions): Dates;

}
declare module 'date-chunk/chunkDate.test' {
  export {};

}
declare module 'date-chunk/index' {
  export * from 'date-chunk/chunkDate';
  export * from 'date-chunk/types';

}
declare module 'date-chunk/types' {
  export type ChunkDate = number | Date;
  export type TimeType = 'ms' | 's' | 'm' | 'h' | 'd';
  export type MaxLimitPerChunk = [number, TimeType];
  export type Dates = Array<{
      start: ChunkDate;
      end: ChunkDate;
  }>;
  export interface ChunkDateOptionsBase {
      start: ChunkDate;
      end: ChunkDate;
  }
  export interface MaxLimitPerChunkOptions extends ChunkDateOptionsBase {
      maxLimitPerChunk: MaxLimitPerChunk;
  }
  export interface ChunksOptions extends ChunkDateOptionsBase {
      chunks: number;
      strictSizedChunks?: boolean;
  }
  export type ChunkDateOptions = ChunksOptions | MaxLimitPerChunkOptions;

}
declare module 'date-chunk/utils/common' {
  import type { ChunkDate, TimeType } from 'date-chunk/types';
  type TimeTypeList = {
      [key in TimeType]: number;
  };
  export const timeTypeList: TimeTypeList;
  export function getTimestamp(time: ChunkDate): number;
  export {};

}
declare module 'date-chunk/utils/common.test' {
  export {};

}
declare module 'date-chunk/utils/typeCheck' {
  export function isDate(date: unknown): boolean;
  export function isNumber(value: unknown): boolean;

}
declare module 'date-chunk/utils/typeCheck.test' {
  export {};

}
declare module 'date-chunk' {
  import main = require('date-chunk/index');
  export = main;
}