import {Codec} from '#Codec';

export const array = <V>(valueCodec: Codec<V>): Codec<Array<V>> => ({
  encode: a => JSON.stringify(a.map(v => valueCodec.encode(v))),
  decode: s =>
    JSON.parse(s, (key, value) =>
      key === ''
        ? value
        : Number.isNaN(parseInt(key, 10))
        ? console.warn('Received a non-list value.', key, value)
        : valueCodec.decode(value)
    ),
});
