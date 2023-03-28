import {Codec} from '#Codec';

/**
 * @summary Constructs a {@link Codec} for an array of `V`.
 * @param valueCodec The {@link Codec} encoding values of `V`.
 * @typeParameter V The type of values to be contained in the array.
 * @returns The built {@link Codec} of `Array<V>`.
 * @see {@link "json" | The JSON Codec Module}
 * @example
 * ```ts
 * import {json} from "@21gram-consulting/ts-codec";
 *
 * const numbers = json.array(json.number);
 * ```
 */ export const array = <V>(valueCodec: Codec<V>): Codec<Array<V>> => ({
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
