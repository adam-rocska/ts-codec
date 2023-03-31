import {Codec} from '#Codec';
import {CorruptPayload} from '#CorruptPayload';
import {RecordShape, isKey, shapeKeys} from '#RecordShape';

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
