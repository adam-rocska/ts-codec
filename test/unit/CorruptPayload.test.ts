import {Codec} from '#Codec';
import {CorruptPayload} from '#CorruptPayload';

describe('CorruptPayload', () => {
  const stubCodec: Codec<{}> = {
    encode: () => '',
    decode: () => ({}),
  };
  describe('.constructor', () => {
    describe('when no custom message provided', () => {
      test('it should provide a descriptive message.', () => {
        const payload = {};
        const testEncodeException = new CorruptPayload(
          stubCodec,
          'encode',
          payload
        );
        expect(testEncodeException.cause).toBeUndefined();
        expect(testEncodeException.message).toEqual(
          "Codec couldn't encode value of [object Object]."
        );
        expect(testEncodeException.codec).toBe(stubCodec);
        expect(testEncodeException.procedure).toBe('encode');
        expect(testEncodeException.input).toBe(payload);

        const testDecodeException = new CorruptPayload(
          stubCodec,
          'decode',
          'test'
        );
        expect(testDecodeException.cause).toBeUndefined();
        expect(testDecodeException.message).toEqual(
          "Codec couldn't decode value of test."
        );
        expect(testDecodeException.codec).toBe(stubCodec);
        expect(testDecodeException.procedure).toBe('decode');
        expect(testDecodeException.input).toBe('test');
      });
    });
  });
});
