import {Codec} from '#Codec';
import {set} from '#json';

describe('JSON Codec : set', () => {
  const stubCodec: Codec<string> = {
    encode: v => `encoded:${v}`,
    decode: v => `decoded:${v}`,
  };

  const testCodec = set(stubCodec);

  test('#encode', async () => {
    const actual = testCodec.encode(new Set(['a', 'b', 'c']));
    const expected = '["encoded:a","encoded:b","encoded:c"]';
    expect(actual).toStrictEqual(expected);
  });

  test('#decode', async () => {
    const actual = testCodec.decode('["encoded:a","encoded:b","encoded:c"]');
    const expected = new Set([
      'decoded:encoded:a',
      'decoded:encoded:b',
      'decoded:encoded:c',
    ]);
    expect(actual).toStrictEqual(expected);
  });
});
