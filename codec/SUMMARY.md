Provides a convenient & strongly-typed API to perform coding
and decoding operations between datatypes in TypeScript.

Conceptually inspired by Swift's Codable API, however it's
nowhere near it. The first version's goal is to provide a
basic yet convenient functional API for these tasks.

# Design Goals
We intentionally separated the interface types which define
the API and the encoder modules in order to keep the door
open for a very diverse flavor of encoding-decoding.

Keep in mind, that 21Gram only open-sourced a simplified
version of its JSON module while internally we have a few of
other kinds and we need to maintain cross-compatibility
between them. We plan to open-source a few more later 2023,
but with this initial release, JSON is the first bird here.

# Nomenclature

## Encoding

We call the operation of transform a type into "serialized"
form as Encoding.

## Decoding

We call the operation of transforming a "serialized" piece
of data (like JSON strings) into more desirable types.

## Exceptions

Though JavaScript (hence TypeScript) has no mature Exception
mechanism, and we are aware that the community has a strong
belief & feelings against throwing Errors, by experience we
stick to the idea of using Exceptions as control flow tools.

21Gram's Engineers to comprehend the occasionally legitimate
arguments of performance drawbacks, however the cognitive
complexity benefits tip the balance to such trade-offs.

We always aim to annotate Exceptions using TypeDoc to avoid
undesirable surprises.
Please file a bug ticket if you experience an unnoted exception
thrown somewhere.

# Building Blocks

## Coder
Technically represents a function which maps a single value
of any given type to another value of a given type.
```ts
Coder<F, T>: ((f: F) => T)
```

It's the fundamental building block of the Encoder & Decoder
types, which throughout the major version 1.x will be kept.
21Gram's plans for an unforeseeable future major release is
to simplify the API further and contractually have a single
function with an overload of its reverse signature:
`A => B` and `B => A`

### Example

By doing this:
```ts
const stringToInt: Coder<string, number> = s => parseInt(s, 10);
```
congratulations, you have a `Coder`.

## Encoder
An Encoder is technically a Coder which maps a "convenient"
type to a target "serialized" form, which can be of any type.
For example a JSON.

Because the majority of web scripter usecases in the wild
would encode and decode between string serialized forms
(like JSON strings), we introduced by convenience a type
alias for `string` as `RawData` and take this `RawData` type
as a default for an `Encoder`'s serialized form.

### Example

By doing this:
```ts
const catEncoder: Encoder<Cat> = cat => JSON.stringify(cat);
```
congratulations, you have an `Encoder`.

## Decoder
A Decoder is technically a Coder which maps a "serialized"
piece of data to a "convenient" type.

Because the majority of web scripter usecases in the wild
would encode and decode between string serialized forms
(like JSON strings), we introduced by convenience a type
alias for `string` as `RawData` and take this `RawData` type
as a default for a `Decoder`'s serialized form.

### Example

By doing this:
```ts
const catDecoder: Decoder<Cat> = rawString => {
  const json = JSON.parse(rawString);
  return new Cat(json.name);
};
```
congratulations, you have a `Decoder`.


## Codec

A Codec is pracitcally an `Encoder` and a `Decoder` organized
in a single pair. It's at the heart of our 1.x API.

### Example

By doing this:
```ts
const catDecoder: Codec<Cat> = {catEncoder, catDecoder};
```
congratulations, you have a `Decoder`.
