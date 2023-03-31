import {Codec} from '#Codec';
import {RecordShape, isKey, shapeKeys} from '#RecordShape';

/**
 * @summary Encodes and decodes a record of codecs into a URLSearchParams string.
 * @param shape A record of codecs.
 * @returns A codec that encodes and decodes a record of codecs into a URLSearchParams string.
 * @category General Purpose Codec
 */
export const urlSearchParams = <R>(shape: RecordShape<R>): Codec<R> => ({
  encode: record =>
    new URLSearchParams(
      shapeKeys(shape).reduce(
        (r, k) => ({
          ...r,
          [k]: shape[k].encode(record[k]),
        }),
        {}
      )
    ).toString(),
  decode: r =>
    Array.from(new URLSearchParams(r)).reduce((partial, [key, value]) => {
      if (!isKey(key, shape)) return partial;
      return {
        ...partial,
        [key]: shape[key].decode(value),
      };
    }, {}) as R,
});
