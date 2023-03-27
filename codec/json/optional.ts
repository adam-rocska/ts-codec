import {Codec} from '#Codec';

export const optional = <V>(codec: Codec<V>): Codec<V | undefined> => ({
  encode: a => a ? codec.encode(a) : '',
  decode: s => s ? codec.decode(s) : undefined,
});
