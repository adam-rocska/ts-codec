import {Codec} from '#Codec';

/**
 * Responsible for string encoding and decoding.
 * Both functions practically return the value received, unchanged.
 */
export const string: Codec<string> = {
  /**
   * Function for string decoding procedures.
   * @param v
   * @returns The received value without changes.
   */
  decode: v => v,
  /**
   * Function for string encoding procedures.
   * @param v
   * @returns The received value without changes.
   */
  encode: v => v,
};
