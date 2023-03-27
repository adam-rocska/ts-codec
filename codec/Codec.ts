export type RawData = string;
export type Encoder<D, C = RawData> = (d: D) => C;
export type Decoder<D, C = RawData> = (c: C) => D;
export type Codec<D, C = RawData> = {
  encode: Encoder<D, C>;
  decode: Decoder<D, C>;
};
