import {CorruptPayload} from '!src/CorruptPayload';
import {number} from '!src/json/number';

describe('JSON Codec : number', () => {
  test('#encode', async () => {
    expect(number.encode(123)).toStrictEqual('123');
    expect(number.encode(555)).toStrictEqual('555');
    expect(number.encode(0)).toStrictEqual('0');
  });

  test('#decode', async () => {
    expect(number.decode('123')).toStrictEqual(123);
    expect(number.decode('555')).toStrictEqual(555);
    expect(number.decode('0')).toStrictEqual(0);
  });

  test('#decode throws CorruptPayload.', () => {
    expect(() => {
      number.decode('invalid value example');
    }).toThrowError(
      new CorruptPayload(number, 'decode', 'invalid value example')
    );
  });

  test('An Encode-Decode cycle should bring us to where we were.', () => {
    expect(number.decode(number.encode(123))).toStrictEqual(123);
    expect(number.decode(number.encode(555))).toStrictEqual(555);
    expect(number.decode(number.encode(0))).toStrictEqual(0);
  });
});
