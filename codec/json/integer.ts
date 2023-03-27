import {Codec} from '#Codec';

export const integer: Codec<number> = {
  decode: v => parseInt(v, 10),
  encode: v => v.toString(),
};
