import {Codec} from '#Codec';
import {CorruptPayload} from '#CorruptPayload';

export const record = <R>(shape: Shape<R>): Codec<R> => {
  const codec: Codec<R> = {
    encode: record => {
      const preCode = (r: {}, k: keyof R): {} => ({
        ...r,
        [k]: shape[k].encode(record[k]),
      });
      const preCodedRecord = shapeKeys(shape).reduce(preCode, {});
      try {
        return JSON.stringify(preCodedRecord);
      } catch (error) {
        const corruptPayload = new CorruptPayload(codec, 'encode', record);
        corruptPayload.cause = error;
        throw corruptPayload;
      }
    },
    decode: r => {
      try {
        return JSON.parse(r, (k, v) =>
          isKey(k, shape) ? shape[k].decode(v) : v
        );
      } catch (error) {
        const corruptPayload = new CorruptPayload(codec, 'decode', r);
        corruptPayload.cause = error;
        throw corruptPayload;
      }
    },
  };
  return codec;
};

type Shape<Record> = {
  [key in keyof Record]: Codec<Record[key]>;
};

type ShapeKey<Record> = keyof Shape<Record>;

const shapeKeys = <R>(shape: Shape<R>): Array<ShapeKey<R>> =>
  Object.keys(shape).filter(v => isKey(v, shape)) as Array<ShapeKey<R>>;

const isKey = <Record>(
  key: unknown,
  shape: Shape<Record>
): key is ShapeKey<Record> => typeof key === 'string' && key in shape;
