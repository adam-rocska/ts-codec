import {Codec} from '#Codec';

export const float: Codec<number> = {
  decode: v => parseFloat(v),
  encode: v => v.toString(),
};
