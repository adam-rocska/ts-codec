import {Codec} from '#Codec';

export const nothing: Codec<void> = {
  decode: () => undefined,
  encode: () => '',
};
