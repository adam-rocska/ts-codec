import {Codec} from '#Codec';

type Shape<Record> = { [key in keyof Record]: Codec<Record[key]> };
type ShapeKey<Record> = keyof Shape<Record>;
const shapeKeys = <R>(shape: Shape<R>): Array<ShapeKey<R>> => Object.keys(shape) as Array<keyof Shape<R>>;
const isKey = <Record>(key: unknown, shape: Shape<Record>): key is ShapeKey<Record> => typeof key === 'string' && key in shape;

export const record = <R>(shape: Shape<R>): Codec<R> => ({
  encode: record => JSON.stringify(
    shapeKeys(shape)
      .reduce((r, k) => ({
        ...r,
        [k]: shape[k].encode(record[k]),
      }), {}),
  ),
  decode: r => JSON.parse(r, (k, v) => isKey(k, shape) ? shape[k].decode(v) : v),
});
