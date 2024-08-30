import {Codec} from '!src/Codec';
import {array} from '!src/json';

describe('JSON Codec : array', () => {
  const stubCodec: Codec<string> = {
    encode: v => `encoded:${v}`,
    decode: v => `decoded:${v}`,
  };

  const testCodec = array(stubCodec);

  test('#encode', async () => {
    const actual = testCodec.encode(['a', 'b', 'c']);
    const expected = '["encoded:a","encoded:b","encoded:c"]';
    expect(actual).toStrictEqual(expected);
  });

  test('#decode', async () => {
    const actual = testCodec.decode('["encoded:a","encoded:b","encoded:c"]');
    const expected = [
      'decoded:encoded:a',
      'decoded:encoded:b',
      'decoded:encoded:c',
    ];
    expect(actual).toStrictEqual(expected);
  });
});
