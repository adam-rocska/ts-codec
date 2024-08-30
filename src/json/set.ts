import {Codec} from '../Codec';
import {array} from './array';

export const set = <V>(valueCodec: Codec<V>): Codec<Set<V>> => {
  const arrayCodec = array(valueCodec);
  return {
    encode: a => arrayCodec.encode(Array.from(a)),
    decode: s => new Set(arrayCodec.decode(s)),
  };
};
