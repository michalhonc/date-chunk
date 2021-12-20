import { isDate, isNumber } from './typeCheck';

describe('typeCheck', () => {
  describe('isDate', () => {
    const dateNow = new Date();

    test('returns timestamp', () => {
      expect(isDate(dateNow)).toBe(true);
      expect(isDate('ahoj')).toBe(false);
    });
  });

  describe('isNumber', () => {
    const dateNow = new Date();
    test('returns timestamp', () => {
      expect(isNumber(123)).toBe(true);
      expect(isNumber(123_321)).toBe(true);
      expect(isNumber('ahoj')).toBe(false);
      expect(isNumber([])).toBe(false);
      expect(isNumber({})).toBe(false);
      expect(isNumber(dateNow)).toBe(false);
    });
  });
});
