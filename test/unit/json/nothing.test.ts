import {nothing} from '#json/nothing';

describe('JSON Codec : nothing', () => {
  test('#encode', async () => {
    expect(nothing.encode()).toStrictEqual('');
  });

  test('An Encode-Decode cycle should bring us to where we were.', () => {
    expect(nothing.decode(nothing.encode())).toStrictEqual(undefined);
  });
});
