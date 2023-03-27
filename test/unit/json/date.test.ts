import {CorruptPayload} from '#CorruptPayload';
import {date} from '#json/date';

describe('JSON Codec : date', () => {
  const now = new Date();
  test('#encode', async () => {
    expect(date.encode(now)).toStrictEqual(now.toISOString());
  });

  test('#decode', async () => {
    expect(date.decode(now.toISOString())).toStrictEqual(now);
  });

  test('#decode throws CorruptPayload.', () => {
    expect(() => {
      date.decode('invalid value example');
    }).toThrowError(
      new CorruptPayload(date, 'decode', 'invalid value example')
    );
  });

  test('An Encode-Decode cycle should bring us to where we were.', () => {
    expect(date.decode(date.encode(now))).toStrictEqual(now);
  });
});
