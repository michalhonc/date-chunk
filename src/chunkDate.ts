import type { ChunkDateOptions, Dates } from './types'
import { isDate, isNumber } from './utils/typeCheck'
import { getTimestamp, timeTypeList } from './utils/common'

export function chunkDate(options: ChunkDateOptions) {
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

  const totalTimestampDiff = getTimestamp(end) - getTimestamp(start)

  if ('chunks' in options) {
    const dates: Dates = []

    let chunkTimestamp = totalTimestampDiff / options.chunks
    if (options.strictSizedChunks) {
      chunkTimestamp = Number(chunkTimestamp.toFixed())
    }

    let prevStartDate = getTimestamp(start)

    for (let i = 0; i < options.chunks; i++) {
      const endDate = prevStartDate + chunkTimestamp

      dates.push({
        start: isDate(start) ? new Date(prevStartDate) : prevStartDate,
        end: isDate(end) ? new Date(endDate) : endDate,
      })

      prevStartDate = endDate
    }

    return dates
  }

  if (
    Array.isArray(options.maxLimitPerChunk) &&
    typeof options.maxLimitPerChunk[0] === 'number' &&
    typeof timeTypeList[options.maxLimitPerChunk[1]] === 'number'
  ) {
    const dates: Dates = []
    const timeRange = options.maxLimitPerChunk[0] * timeTypeList[options.maxLimitPerChunk[1]]

    let chunkRange = totalTimestampDiff / timeRange

    let prevStartDate = getTimestamp(start)

    while (chunkRange > 0) {
      const denominator = chunkRange >= 1 ? 1 : chunkRange
      const endDate = prevStartDate + (timeRange * denominator)

      dates.push({
        start: isDate(start) ? new Date(prevStartDate) : prevStartDate,
        end: isDate(end) ? new Date(endDate) : endDate,
      })

      prevStartDate = endDate

      chunkRange--
    }

    return dates;
  }

  return []
}
