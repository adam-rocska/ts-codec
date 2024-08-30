import {Codec} from './Codec';

/**
 * Represents a general 21Gram Codec exception.
 * Exception specificities should be treated by subtyping.
 *
 * @typeParam F The type from which the Codec's mapping was performed.
 * @typeParam T The type to which the Codec's mapping was performed.
 * @category Exception
 */
export class Exception<T> extends Error {
  /**
   * Provides the codec with which the excpetion occurred.
   */
  readonly codec: Codec<T>;

  /**
   * Represents the cause of the given Exception which could
   * be any `Error` basically.
   * Handy for debugging, folks!
   *
   * It's of unknown type, because that's the way JavaScirpt
   * and TypeScript rolls with Errors & Exceptions.
   */
  override cause?: unknown;

  /**
   * Creates a new exception instance.
   * @param codec   The Codec with which the exception occurred.
   * @param message The exception message describing the exception.
   */
  constructor(codec: Codec<T>, message: string) {
    super(message);
    this.codec = codec;
  }
}
