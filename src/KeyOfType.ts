/**
 * All of `T`'s strongly typed field names/keys of type `V`.
 * Mildly inspired by Swit's `KeyPath` system.
 *
 * **DON'T USE THIS TYPE EXPLICITLY!** Only for implicit / inferred use.
 * This type would have a better place in typefest, or 21Gram's own take of
 * typefest. We have a few more smart types here & there, not enough for a
 * libraary yet, hence they're spread out in codebases with the
 * copy-pasta anti-pattern.
 *
 * @typeParam T The type who's keys to represent.
 * @typeParam V The type of field which must be matched for key selection.
 */
export type KeyOfType<T, V> = keyof {
  [P in keyof T as T[P] extends V ? P : never]: unknown;
};
