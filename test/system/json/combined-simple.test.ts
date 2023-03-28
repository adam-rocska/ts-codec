import {SourceType} from '#Codec';
import {
  array,
  boolean,
  date,
  number,
  optional,
  record,
  set,
  string,
} from '#json';

describe('System Test', () => {
  describe('combining simple cases', () => {
    const testCodec = record({
      firstName: string,
      lastName: optional(string),
      age: optional(number),
      traits: array(
        record({
          isVenerable: boolean,
          label: string,
          labelAlternatives: set(string),
          aquiredOn: date,
        })
      ),
    });
    type TestRecord = SourceType<typeof testCodec>;

    test('should work as expected.', () => {
      const source: TestRecord = {
        firstName: 'Adam',
        lastName: 'Rocska',
        age: undefined,
        traits: [],
      };
      const str = testCodec.encode(source);
      const result = testCodec.decode(str);
      expect(result).toMatchObject(source);
    });
  });
});
