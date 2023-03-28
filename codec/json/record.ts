import {Codec} from '#Codec';
import {CorruptPayload} from '#CorruptPayload';

/**
 * @summary Constructs a {@link Codec} for `R`.
 * @param shape The {@link RecordShape} describing the {@link Codec} to construct.
 * @typeParameter R The record shape for which the {@link Codec} is constructed.
 * @returns the built {@link Codec} of `R`.
 * @see {@link "json" | The JSON Codec Module}
 * @example
 * ```ts
 * import {json} from "@21gram-consulting/ts-codec";
 *
 * const simplePerson = json.record({
 *   firstName: json.string,
 *   lastName: json.string
 * });
 * ```
 */
export const record = <R>(shape: RecordShape<R>): Codec<R> => {
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
        const result = JSON.parse(r, (k, v) =>
          isKey(k, shape) ? shape[k].decode(v) : v
        );
        const missingKeys = shapeKeys(shape).filter(key => !(key in result));
        for (const key of missingKeys) {
          result[key] = shape[key].decode('undefined');
        }
        return result;
      } catch (error) {
        const corruptPayload = new CorruptPayload(codec, 'decode', r);
        corruptPayload.cause = error;
        throw corruptPayload;
      }
    },
  };
  return codec;
};

/**
 * @summary Describes which codecs to use for each field of the `Record`.
 * @description
 * This contract type is to be taken as inputs for all codecs
 * responsible for encoding and decoding objects fulfilling a
 * record/struct role. Sometimes these types are also called model types.
 *
 * * `Keys` are expected to be the keys of the `Record` to be described.
 * * `Values` are expected to be the {@link Codec | Codecs} of the value stored under the respective key.
 * @typeParam Record The type of the object who's fields' codecs are to be provided.
 * @example
 */
export type RecordShape<Record> = {
  [key in keyof Record]: Codec<Record[key]>;
};

type ShapeKey<Record> = keyof RecordShape<Record>;

const shapeKeys = <R>(shape: RecordShape<R>): Array<ShapeKey<R>> =>
  Object.keys(shape).filter(v => isKey(v, shape)) as Array<ShapeKey<R>>;

const isKey = <Record>(
  key: unknown,
  shape: RecordShape<Record>
): key is ShapeKey<Record> => typeof key === 'string' && key in shape;
