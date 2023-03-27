/**
 * The default datatype used as the raw datasource type.
 */
export type RawData = string;

/**
 * Convenient type representing a function mapping `T` to `F`.
 * @typeParam F The type from which mapping is performed.
 * @typeParam T The type to which mapping is performed.
 */
export type Coder<F, T> = (f: F) => T;

/**
 * Represents a function responsible for encoding the provided data.
 * @typeParam D The encoded datatype.
 * @typeParam C The target to which to encode `D`. By default it's `RawData`.
 */
export type Encoder<D, C = RawData> = Coder<D, C>;

/**
 * Represents a function responsible for decoding the provided raw data.
 * @typeParam D The type to which this decoder decodes `C`.
 * @typeParam C The raw data type to decode as `D`.
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
