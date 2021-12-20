import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';

import { chunkDate } from './chunkDate';

dayjs.extend(isLeapYear);

describe('chunkDate', () => {
  describe('with chunks', () => {
    const chunks = chunkDate({
      start: new Date(1995, 4, 21),
      end: new Date(1996, 4, 21),
      chunks: 12,
    });

    test('length equals', () => {
      expect(chunks.length).toBe(12);
    });

    test('first date equals', () => {
      expect(chunks[0].start.valueOf()).toBe(801007200000);
    });
  });

  describe('with ranges', () => {
    const chunks = chunkDate({
      start: new Date(1995, 4, 21),
      end: new Date(1996, 4, 20),
      maxLimitPerChunk: [1, 'd'],
    });

    test('length equals', () => {
      expect(chunks.length).toBe(dayjs('1995-04-21').isLeapYear() ? 366 : 365);
    });

    test('diff is right', () => {
      chunks.forEach(({ start, end }) => {
        const date1 = dayjs(end);
        const diff = date1.diff(dayjs(start), 'h');

        expect(diff).toBe(24);
      });
    });

    test('first date equals', () => {
      expect(chunks[0].start.valueOf()).toBe(801007200000);
    });
  });
});
