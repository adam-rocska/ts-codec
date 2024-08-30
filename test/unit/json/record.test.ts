import {Codec} from '!src/Codec';
import {CorruptPayload} from '!src/CorruptPayload';
import {record} from '!src/json';

describe('JSON Codec : record', () => {
  const mockEncode = jest.fn(() => 'test');
  const mockDecode = jest.fn(() => 'test');
  const stubCodec: Codec<string> = {
    encode: mockEncode,
    decode: mockDecode,
  };
  const testCodec = record({
    field1: stubCodec,
    field2: stubCodec,
  });
  const field1 = 'value1';
  const field2 = 'value2';

  describe('#encode', () => {
    test('ideal case.', () => {
      const actual = testCodec.encode({field1, field2});
      const expected = '{"field1":"test","field2":"test"}';
      expect(actual).toStrictEqual(expected);
      expect(mockEncode.mock.calls[0]).toEqual(['value1']);
      expect(mockEncode.mock.calls[1]).toEqual(['value2']);
    });

    test('throws on failure.', () => {
      const expectedCause = new TypeError();
      JSON.stringify = jest.fn(() => {
        throw expectedCause;
      });
      const payload = {field1, field2};
      const expectedException = new CorruptPayload(
        testCodec,
        'encode',
        payload
      );
      expectedException.cause = expectedCause;
      expect(() => testCodec.encode(payload)).toThrowError(expectedException);
    });
  });

  describe('#decode', () => {
    test('ideal case.', () => {
      const actual = testCodec.decode('{"field1":"test","field2":"test"}');
      const expected = {field1: 'test', field2: 'test'};
      expect(actual).toStrictEqual(expected);
      expect(mockEncode.mock.calls[0]).toEqual(['value1']);
      expect(mockEncode.mock.calls[1]).toEqual(['value2']);
    });

    test('throws on failure.', () => {
      const expectedCause = new TypeError();
      JSON.parse = jest.fn(() => {
        throw expectedCause;
      });
      const payload = '';
      const expectedException = new CorruptPayload(
        testCodec,
        'decode',
        payload
      );
      expectedException.cause = expectedCause;
      expect(() => testCodec.decode(payload)).toThrowError(expectedException);
    });
  });
});
