import type { ChunkDateOptions, Dates, MaxLimitPerChunkOptions, ChunksOptions } from './types'
import { isDate, isNumber } from './utils/typeCheck'
import { getTimestamp, timeTypeList } from './utils/common'

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
export function chunkDate(options: ChunkDateOptions): Dates {
  if (typeof options === 'undefined') {
    console.error('date-chunk: options are required in chunkDate function')
    return []
  }

  const { start, end } = options

  const isValidStartDate = isDate(start) || isNumber(start)
  const isValidEndDate = isDate(end) || isNumber(end)

  if (!isValidEndDate || !isValidStartDate) {
    console.error(
      'date-chunk: start or end must be either Date object or number (timestamp) in chunkDate function'
    )
    return []
  }

  if ('chunks' in options) {
    return chunkEven(options)
  }

  if ('maxLimitPerChunk' in options) {
    return chunkBySize(options)
  }

  return []
}

function chunkEven(options: ChunksOptions): Dates {
  const dates: Dates = []
  const totalTimestampDiff = getTimestamp(options.end) - getTimestamp(options.start)

  let chunkTimestamp = totalTimestampDiff / options.chunks
  if (options.strictSizedChunks) {
    chunkTimestamp = Number(chunkTimestamp.toFixed())
  }

  let prevStartDate = getTimestamp(options.start)

  for (let i = 0; i < options.chunks; i++) {
    const endDate = prevStartDate + chunkTimestamp

    dates.push({
      start: isDate(options.start) ? new Date(prevStartDate) : prevStartDate,
      end: isDate(options.end) ? new Date(endDate) : endDate,
    })

    prevStartDate = endDate
  }

  return dates
}

function chunkBySize(options: MaxLimitPerChunkOptions): Dates {
  const timeValue = options.maxLimitPerChunk[0];
  const timeDenominator = timeTypeList[options.maxLimitPerChunk[1]];

  const dates: Dates = []
  const totalTimestampDiff = getTimestamp(options.end) - getTimestamp(options.start)
  const timeRange = timeValue * timeDenominator

  let chunkRange = totalTimestampDiff / timeRange

  let prevStartDate = getTimestamp(options.start)

  while (chunkRange > 0) {
    const denominator = chunkRange >= 1 ? 1 : chunkRange
    const endDate = prevStartDate + timeRange * denominator

    dates.push({
      start: isDate(options.start) ? new Date(prevStartDate) : prevStartDate,
      end: isDate(options.end) ? new Date(endDate) : endDate,
    })

    prevStartDate = endDate

    chunkRange--
  }

  return dates
}
