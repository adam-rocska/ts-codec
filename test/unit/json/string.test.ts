import {string} from '#json/string';

describe('JSON Codec : string', () => {
  test('Both encode & decode return the value unchanged.', async () => {
    expect(string.encode('test')).toStrictEqual('test');
    expect(string.decode('test')).toStrictEqual('test');
  });

  test('An Encode-Decode cycle should bring us to where we were.', () => {
    const data = 'test';
    expect(string.decode(string.encode(data))).toStrictEqual(data);
  });

});
