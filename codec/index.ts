/**
 * @packageDocumentation
 * @summary
 * Provides  the primary Codec API, and convenient access to
 * its implementations.
 *
 */

export * from './Codec';
export * from './Exception';
export * from './CorruptPayload';
export * from './KeyOfType';
export * from './RecordShape';
export * from './urlSearchParams';

/**
 * @summary Provides convenient access to the {@link Codec} {@link json} implementations.
 * @module
 */
export * as json from './json';
