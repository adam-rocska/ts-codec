import {Codec} from '#Codec';
import {optional} from '#json/optional';

describe('JSON Codec : optional', () => {
  const stubCodec: Codec<string> = {
    encode: () => 'value',
    decode: () => 'value',
  };
  const testCodec = optional(stubCodec);
  test('#encode', async () => {
    expect(testCodec.encode(undefined)).toStrictEqual('undefined');
    expect(testCodec.encode('anything')).toStrictEqual('value');
  });

  test('#decode', async () => {
    expect(testCodec.decode('undefined')).toStrictEqual(undefined);
    expect(testCodec.decode('anything')).toStrictEqual('value');
  });
});
