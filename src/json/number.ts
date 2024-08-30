import {Codec} from '../Codec';
import {CorruptPayload} from '../CorruptPayload';

export const number: Codec<number> = {
  decode: v => {
    const candidate = parseFloat(v);
    if (Number.isNaN(candidate)) throw new CorruptPayload(number, 'decode', v);
    return candidate;
  },
  encode: v => v.toString(),
};
