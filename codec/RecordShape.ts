import {Codec} from '#Codec';

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

/**
 * @summary Describes the keys of the `Record` to be described.
 */
export type ShapeKey<Record> = keyof RecordShape<Record>;

/**
 * @summary Returns the keys of the `Record` to be described.
 * @param shape The {@link RecordShape | RecordShape} to be described.
 * @returns The keys of the `Record` to be described.
 * @todo We are aware of the intricate challenges of
 * Object.keys it will be fine grained if/when users report
 * actual real life issues with this function.
 */
export const shapeKeys = <R>(shape: RecordShape<R>): Array<ShapeKey<R>> =>
  Object.keys(shape).filter(v => isKey(v, shape)) as Array<ShapeKey<R>>;

/**
 * @summary Checks if the given key is a key of the given shape.
 * @param key The key to be checked.
 * @param shape The {@link RecordShape | RecordShape} to be described.
 * @returns `true` if the given key is a key of the given shape.
 */
export const isKey = <Record>(
  key: unknown,
  shape: RecordShape<Record>
): key is ShapeKey<Record> => typeof key === 'string' && key in shape;
