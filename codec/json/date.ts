import {Codec} from '#Codec';

export const date: Codec<Date> = {
  decode: v => {
    const timestamp = parseInt(v, 10);
    if (Number.isNaN(timestamp))
      throw new TypeError(`Failed to decode "${v}" as a date.`);
    return new Date(timestamp);
  },
  encode: v => v.valueOf().toString(10),
};
