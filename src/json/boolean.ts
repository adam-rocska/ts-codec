import {Codec} from '../Codec';

export const boolean: Codec<boolean> = {
  decode: v => v === 'true',
  encode: v => (v ? 'true' : 'false'),
};
