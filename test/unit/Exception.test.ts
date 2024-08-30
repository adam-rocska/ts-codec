import {Codec} from '!src/Codec';
import {Exception} from '!src/Exception';

describe('Exception', () => {
  describe('.constructor', () => {
    test('should provide referential access to the related codec', () => {
      const stubCodec: Codec<undefined> = {
        encode: () => '',
        decode: () => undefined,
      };
      const testMessage = 'Test Message.';
      const testException = new Exception(stubCodec, testMessage);
      expect(testException.cause).toBeUndefined();
      expect(testException.message).toEqual(testMessage);
      expect(testException.codec).toBe(stubCodec);
    });
  });
});
