import {isCoder, isRawData, isCodec} from '#Codec';

describe('Codec.ts', () => {
  describe('.isRawData', () => {
    test('should return true for string', () => {
      expect(isRawData('')).toBe(true);
    });
    test('should return false for number', () => {
      expect(isRawData(0)).toBe(false);
    });
    test('should return false for boolean', () => {
      expect(isRawData(true)).toBe(false);
    });
    test('should return false for object', () => {
      expect(isRawData({})).toBe(false);
    });
    test('should return false for array', () => {
      expect(isRawData([])).toBe(false);
    });
    test('should return false for null', () => {
      expect(isRawData(null)).toBe(false);
    });
    test('should return false for undefined', () => {
      expect(isRawData(undefined)).toBe(false);
    });
  });

  describe('.isCoder', () => {
    it('should return true for a function with one argument', () => {
      expect(isCoder((v: string) => v)).toBe(true);
    });
    it('should return false for a function with no arguments', () => {
      expect(isCoder(() => {})).toBe(false);
    });
    it.each([
      (a: number, b: number) => a + b,
      (a: number, b: number, c: number) => a + b + c,
      (a: number, b: number, c: number, d: number) => a + b + c + d,
    ])(
      'should return false for a function with %i arguments',
      (f: Function) => {
        expect(isCoder(f)).toBe(false);
      }
    );
  });

  describe('.isCodec', () => {
    it('should return false for a function', () => {
      expect(isCodec(() => {})).toBe(false);
    });
    it('should return false for an object with no encode or decode', () => {
      expect(isCodec({})).toBe(false);
    });
    it('should return false for an object with encode but no decode', () => {
      expect(isCodec({encode: () => {}})).toBe(false);
    });
    it('should return false for an object with decode but no encode', () => {
      expect(isCodec({decode: () => {}})).toBe(false);
    });
    it('should return false for an object with encode and decode but encode is not a coder', () => {
      expect(isCodec({encode: () => {}, decode: () => {}})).toBe(false);
    });
    it('should return false for an object with encode and decode but decode is not a coder', () => {
      expect(isCodec({encode: () => {}, decode: () => {}})).toBe(false);
    });
    it('should return true for an object with encode and decode and both are coders', () => {
      expect(
        isCodec({encode: (v: string) => v, decode: (v: string) => v})
      ).toBe(true);
    });
  });
});
