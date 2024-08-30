import {Exception} from './Exception';
import {Codec, Decoder, Encoder} from './Codec';
import {KeyOfType} from './KeyOfType';

/**
 * Represents an exception case when a Codec Payload is
 * considered to be corrupted.
 *
 * @typeParam T The type which is encoded-decoded by the related decoder.
 * @typeParam P The procedure which lead to failure (`encode` or `decode`)
 * @typeParam I The type of data procedure `P` took as input.
 * @category Exception
 */
export class CorruptPayload<
  T,
  P extends KeyOfType<Codec<T>, Encoder<T> | Decoder<T>>,
  I extends Parameters<Codec<T>[P]>[0]
> extends Exception<T> {
  /**
   * The procedure which produced this exception.
   */
  readonly procedure: P;
  /**
   * The input value with which the `procedure` failed.
   */
  readonly input: I;

  /**
   * Creaets a new CorruptPayload instance.
   * @param codec     The codec object from which the exception originated.
   * @param procedure The failing procedure.
   * @param input     The faulty input.
   * @param message   The error message.
   */
  constructor(codec: Codec<T>, procedure: P, input: I, message?: string) {
    super(codec, message ?? `Codec couldn't ${procedure} value of ${input}.`);
    this.input = input;
    this.procedure = procedure;
  }
}
