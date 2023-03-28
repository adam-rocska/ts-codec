/**
 * The default datatype used as the raw datasource type.
 */
export type RawData = string;

/**
 * Convenient type representing a function mapping `T` to `F`.
 * @typeParam F The type from which mapping is performed.
 * @typeParam T The type to which mapping is performed.
 * @throws {@link Exception}
 */
export type Coder<F, T> = (f: F) => T;

/**
 * Represents a function responsible for encoding the provided data.
 * @typeParam D The encoded datatype.
 * @typeParam C The target to which to encode `D`. By default it's `RawData`.
 * @throws {@link Exception}
 */
export type Encoder<D, C = RawData> = Coder<D, C>;

/**
 * Represents a function responsible for decoding the provided raw data.
 * @typeParam D The type to which this decoder decodes `C`.
 * @typeParam C The raw data type to decode as `D`.
 * @throws {@link Exception}
 */
export type Decoder<D, C = RawData> = Coder<C, D>;

/**
 * Represents an object capable of performing encoding & decoding based type
 * conversion between `C` and `D`.
 * @typeParam D Represents the type which is encoded or to which `C` is
 *                decoded to.
 * @typeParam C Represents the type to which `D` is encoded to or which
 *                `D` is decoded from.
 */
export type Codec<D, C = RawData> = {
  encode: Encoder<D, C>;
  decode: Decoder<D, C>;
};

/**
 * Utility type to extract the `SourceType` of a {@link Codec}.
 * @typeParam C must be a {@link Codec} type.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SourceType<C> = C extends Codec<infer Source, any> ? Source : never;

/**
 * Utility type to extract the `TargetType` of a {@link Codec}.
 * @typeParam T must be a {@link Codec} type.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TargetType<T> = T extends Codec<any, infer Target> ? Target : never;
