import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';

import { chunkDate } from './chunkDate';

dayjs.extend(isLeapYear);

function dateDiff(chunk, timeRange = 's') {
  return dayjs(chunk.end).diff(dayjs(chunk.start), timeRange);
}

describe('chunkDate', () => {
  describe('with insufficient params', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    test('no params', () => {
      const chunks = chunkDate();
      expect(Array.isArray(chunks) && chunks.length === 0).toBe(true);
    });

    test('bad date format', () => {
      const chunks = chunkDate({
        start: '2012',
        end: '2013',
      });
      expect(Array.isArray(chunks) && chunks.length === 0).toBe(true);
    });

    test('no formating options', () => {
      const chunks = chunkDate({
        start: new Date('1995-04-21T00:00:00.000Z'),
        end: new Date('1996-04-20T00:00:00.000Z'),
      });
      expect(Array.isArray(chunks) && chunks.length === 0).toBe(true);
    });
  });

  describe('with different formated inputs', () => {
    const chunksWithDate = chunkDate({
      start: new Date('1995-04-21T00:00:00.000Z'),
      end: new Date('1996-04-20T00:00:00.000Z'),
      chunks: 13,
    });

    const chunksWithTimestamp = chunkDate({
      start: 798422400000,
      end: 829958400000,
      chunks: 13,
    });

    const chunksWithBoth = chunkDate({
      start: new Date('1995-04-21T00:00:00.000Z'),
      end: 829958400000,
      chunks: 13,
    });

    const chunksMaxLimitWithBoth = chunkDate({
      start: new Date('1995-04-21T00:00:00.000Z'),
      end: 829958400000,
      maxLimitPerChunk: [30, 'd'],
    });

    const chunksMaxLimitWithBothReverse = chunkDate({
      start: 798422400000,
      end: new Date('1996-04-20T00:00:00.000Z'),
      maxLimitPerChunk: [30, 'd'],
    });

    test('return instanceof Date', () => {
      chunksWithDate.forEach((chunk) => {
        expect(chunk.start instanceof Date && chunk.end instanceof Date).toBe(true);
      });
    });

    test('return timestamp', () => {
      chunksWithTimestamp.forEach((chunk) => {
        expect(typeof chunk.start === 'number' && typeof chunk.end === 'number').toBe(true);
      });
    });

    test('return different output types for different input types', () => {
      [...chunksWithBoth, ...chunksMaxLimitWithBoth].forEach((chunk) => {
        expect(chunk.start instanceof Date && typeof chunk.end === 'number').toBe(true);
      });

      chunksMaxLimitWithBothReverse.forEach((chunk) => {
        expect(chunk.end instanceof Date && typeof chunk.start === 'number').toBe(true);
      });
    });
  });

  describe('with chunks dates', () => {
    const chunks = chunkDate({
      start: new Date('1995-04-21T00:00:00.000Z'),
      end: new Date('1996-04-20T00:00:00.000Z'),
      chunks: 13,
    });

    const strictChunks = chunkDate({
      start: new Date('1995-04-21T00:00:00.000Z'),
      end: new Date('1996-04-20T00:00:00.000Z'),
      chunks: 13,
      strictSizedChunks: true,
    });

    test('return instanceof Date', () => {
      chunks.forEach((chunk) => {
        expect(chunk.start instanceof Date && chunk.end instanceof Date).toBe(true);
      });
    });

    test('length equals', () => {
      expect(chunks.length).toBe(13);
    });

    test('first date equals', () => {
      expect(chunks[0].start.valueOf()).toBe(798422400000);
    });

    test('unstrict sized chunks are different', () => {
      const nonUniqueSet = new Set(chunks.map(dateDiff));

      expect(nonUniqueSet.size).toBeGreaterThan(1);
    });

    test('last strict sized chunk is same', () => {
      const uniqueValues = new Set(strictChunks.map(dateDiff));
      expect(uniqueValues.size).toBe(1);
    });
  });

  describe('with ranges', () => {
    const chunks = chunkDate({
      start: new Date('1995-04-21T00:00:00.000Z'),
      end: new Date('1996-04-20T00:00:00.000Z'),
      maxLimitPerChunk: [1, 'd'],
    });

    test('length equals', () => {
      expect(chunks.length).toBe(dayjs('1995-04-21').isLeapYear() ? 366 : 365);
    });

    test('diff is right', () => {
      chunks.forEach((chunk) => {
        const diff = dateDiff(chunk, 'h');

        expect(diff).toBe(24);
      });
    });

    test('first date equals', () => {
      expect(chunks[0].start.valueOf()).toBe(798422400000);
    });
  });
});
