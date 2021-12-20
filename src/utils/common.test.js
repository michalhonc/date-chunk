import { getTimestamp } from './common';

describe('common', () => {
  describe('getTimestamp', () => {
    const dateNow = new Date();

    test('returns timestamp', () => {
      expect(getTimestamp(dateNow)).toBe(dateNow.valueOf());
      expect(getTimestamp(dateNow.valueOf())).toBe(dateNow.valueOf());
    });
  });
});
