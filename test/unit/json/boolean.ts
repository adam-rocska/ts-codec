import {boolean} from '#json/boolean';

describe('JSON Codec : boolean', () => {
  test('#encode', async () => {
    expect(boolean.encode(true)).toStrictEqual('true');
    expect(boolean.encode(false)).toStrictEqual('false');
  });

  test('An Encode-Decode cycle should bring us to where we were.', () => {
    expect(boolean.decode(boolean.encode(true))).toStrictEqual(true);
    expect(boolean.decode(boolean.encode(false))).toStrictEqual(false);
  });
});
