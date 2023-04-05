/**
 * @summary The default datatype used as the raw datasource type.
 * @category Core Interface
 */
export type RawData = string;

/**
 * @summary Checks if the given data is a raw data.
 * @description
 * This function is used to check if the given data is a raw data.
 * It's practically a check for `typeof data === 'string'` at least for now.
 * We may change what is considered to be a raw data in the future.
 * @param data The data to be checked.
 * @returns `true` if the given data is a raw data.
 * @category Core Interface
 */
export const isRawData = (data: unknown): data is RawData =>
  typeof data === 'string';

/**
 * Convenient type representing a function mapping `T` to `F`.
 * @typeParam F The type from which mapping is performed.
 * @typeParam T The type to which mapping is performed.
 * @throws {@link Exception}
 * @category Core Interface
 */
export type Coder<F, T> = (f: F) => T;

/**
 * @summary Checks if the given coder is a coder.
 * @description
 * This function is used to check if the given coder is a coder.
 * It's practically a check for `typeof coder === 'function',
 * and it checks the function length to be 1.
 * It's the most we could get to with TS so far.
 * It's admittedly not the safest smartest way to do this but
 * we need something.
 * @param coder The coder to be checked.
 * @returns `true` if the given coder is a coder.
 * @typeParam F The type from which mapping is performed.
 * @typeParam T The type to which mapping is performed.
 * @category Core Interface
 * @see {@link Codec}
 */
export const isCoder = <F, T>(coder: unknown): coder is Coder<F, T> => {
  if (typeof coder !== 'function') return false;
  if (coder.length !== 1) return false;
  return true;
};

/**
 * Represents a function responsible for encoding the provided data.
 * @typeParam D The encoded datatype.
 * @typeParam C The target to which to encode `D`. By default it's `RawData`.
 * @throws {@link Exception}
 * @category Core Interface
 */
export type Encoder<D, C = RawData> = Coder<D, C>;

/**
 * Represents a function responsible for decoding the provided raw data.
 * @typeParam D The type to which this decoder decodes `C`.
 * @typeParam C The raw data type to decode as `D`.
 * @throws {@link Exception}
 * @category Core Interface
 */
export type Decoder<D, C = RawData> = Coder<C, D>;

/**
 * Represents an object capable of performing encoding & decoding based type
 * conversion between `C` and `D`.
 * @typeParam D Represents the type which is encoded or to which `C` is
 *                decoded to.
 * @typeParam C Represents the type to which `D` is encoded to or which
 *                `D` is decoded from.
 * @category Core Interface
 */
export type Codec<D, C = RawData> = {
  encode: Encoder<D, C>;
  decode: Decoder<D, C>;
};

/**
 * @summary Checks if the given codec is a codec.
 * @param codec The codec to be checked.
 * @returns `true` if the given codec is a codec.
 * @typeParam D Represents the type which is encoded or to which `C` is
 *               decoded to.
 * @typeParam C Represents the type to which `D` is encoded to or which
 *              `D` is decoded from.
 * @category Core Interface
 * @see {@link Codec}
 * @see {@link Encoder}
 * @see {@link Decoder}
 * @see {@link Coder}
 */
export const isCodec = <D, C>(codec: unknown): codec is Codec<D, C> => {
  if (typeof codec !== 'object' || codec === null) return false;
  if (!('encode' in codec)) return false;
  if (!('decode' in codec)) return false;
  if (!isCoder(codec.encode)) return false;
  if (!isCoder(codec.decode)) return false;
  return true;
};

/**
 * Utility type to extract the `SourceType` of a {@link Codec}.
 * @typeParam C must be a {@link Codec} type.
 * @category Core Interface
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SourceType<C> = C extends Codec<infer Source, any> ? Source : never;

/**
 * Utility type to extract the `TargetType` of a {@link Codec}.
 * @typeParam T must be a {@link Codec} type.
 * @category Core Interface
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TargetType<T> = T extends Codec<any, infer Target> ? Target : never;
