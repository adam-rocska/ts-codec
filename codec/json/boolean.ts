import {Codec} from '#Codec';

export const boolean: Codec<boolean> = {
  decode: v => v.length > 0,
  encode: v => (v ? '1' : ''),
};
