import {json} from '#index';
import {shapeKeys, isKey} from '#RecordShape';

describe('RecordShape.ts', () => {
  describe('.shapeKeys', () => {
    test('should return the keys of the Record to be described', () => {
      const shape = {
        a: json.string,
        b: json.number,
        c: json.boolean,
      };
      expect(shapeKeys(shape)).toEqual(['a', 'b', 'c']);
    });

    test("it should return an empty array if the shape doesn't have any keys", () => {
      const shape = {};
      expect(shapeKeys(shape)).toEqual([]);
    });
  });

  describe('.isKey', () => {
    test('should return true if the given key is a key of the given shape', () => {
      const shape = {
        a: json.string,
        b: json.number,
        c: json.boolean,
      };
      expect(isKey('a', shape)).toBe(true);
      expect(isKey('b', shape)).toBe(true);
      expect(isKey('c', shape)).toBe(true);
    });

    test('should return false if the given key is not a key of the given shape', () => {
      const shape = {
        a: json.string,
        b: json.number,
        c: json.boolean,
      };
      expect(isKey('d', shape)).toBe(false);
      expect(isKey('e', shape)).toBe(false);
      expect(isKey('f', shape)).toBe(false);
    });
  });
});
