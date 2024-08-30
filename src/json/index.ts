/**
 * @packageDocumentation
 * @summary
 * Provides a Codec API implementation designed for mapping between
 * your custom types to JSON strings.
 *
 * @example
 * Imported as:
 * ```ts
 * import {json} from '@21gram-consulting/ts-codec';
 * ```
 * @example
 * or, if you need something specific, as:
 *  ```ts
 * import {nothing} from '@21gram-consulting/ts-codec/json';
 * ```
 *
 * @example
 * # Simple but realistic example
 * ## Person Type
 * Let's assume you have the following `Person` type:
 * ```ts
 * export type Person = {
 *   firstName: string;
 *   lastName: string;
 *   age: number;
 *   contact?: {
 *     mail: string;
 *     phone: string;
 *   };
 * };
 * ```
 * Basically, a person has a first name and a last name, both strings,
 * has an age represented as a number, and optionally has a contact
 * object.
 * If it has a contact object, then it musthave an e-mail address
 * and a phone number.
 *
 * ## Person Codec
 * One possible way to implement a Codec for a type like `Person` is
 * as follows:
 * ```ts
 * import {json} from '@21gram-consulting/ts-codec';
 *
 * export const person = json.record<Person>({
 *   firstName: json.string,
 *   lastName: json.string,
 *   age: json.number,
 *   contact: json.optional(
 *     json.record({
 *       mail: json.string,
 *       phone: json.string,
 *     })
 *   ),
 * });
 * ```
 * This piece of code provides you with a runtime & typesafe
 * `Codec` which will map `Person` values to and from JSON
 * strings.
 *
 * ## Passing Around Data
 * So, given all the base assets we have, we can use our person
 * codec as follows:
 * ```ts
 * import {person} from '#models/person';
 * import {Person} from '#models/person';
 *
 * const rawString: string = person.encode({
 *   firstName: 'Adam',
 *   lastName: 'Rocska',
 *   age: 30,
 * });
 *
 * const decoded: Person = person.decode(rawString);
 * ```
 */

export * from './string';
export * from './array';
export * from './boolean';
export * from './date';
export * from './number';
export * from './nothing';
export * from './optional';
export * from './record';
export * from './set';
export * from './string';
