import {Codec} from '#Codec';

export type Shape<Record> = { [key in keyof Record]: Codec<Record[key]> };
type ShapeKey<Record> = keyof Shape<Record>;
const shapeKeys = <R>(shape: Shape<R>): Array<ShapeKey<R>> => Object.keys(shape) as Array<keyof Shape<R>>;
const isKey = <Record>(key: unknown, shape: Shape<Record>): key is ShapeKey<Record> => typeof key === 'string' && key in shape;
export const query = <R>(shape: Shape<R>): Codec<R> => ({
  encode: record => new URLSearchParams(
    shapeKeys(shape)
      .reduce((r, k) => ({
        ...r,
        [k]: shape[k].encode(record[k]),
      }), {}),
  ).toString(),
  decode: r => Array
    .from(new URLSearchParams(r))
    .reduce((partial, [key, value]) => {
      if (!isKey(key, shape)) return partial;
      return {
        ...partial,
        [key]: shape[key].decode(value),
      };
    }, {}) as R,
});
