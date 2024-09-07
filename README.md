# Codec – Encode & Decode for TypeScript

[![NPM Version](https://img.shields.io/npm/v/@adam-rocska/ts-codec.svg)](https://www.npmjs.com/package/@adam-rocska/ts-codec)
[![License](https://img.shields.io/npm/l/@adam-rocska/ts-codec)](https://github.com/adam-rocska/ts-codec-typescript/blob/master/LICENSE)

| Aspect               | Badge                                                                                                                                                 |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Minified             | [![Minified](https://badgen.net/bundlephobia/min/@adam-rocska/ts-codec)](https://bundlephobia.com/package/@adam-rocska/ts-codec)                      |
| Minified + gzip      | [![Minified + gzip](https://badgen.net/bundlephobia/minzip/@adam-rocska/ts-codec)](https://bundlephobia.com/package/@adam-rocska/ts-codec)            |
| Dependency Count     | [![Dependency Count](https://badgen.net/bundlephobia/dependency-count/@adam-rocska/ts-codec)](https://bundlephobia.com/package/@adam-rocska/ts-codec) |
| Tree-shaking Support | [![Tree-shaking Support](https://badgen.net/bundlephobia/tree-shaking/@adam-rocska/ts-codec)](https://bundlephobia.com/package/@adam-rocska/ts-codec) |

A TypeScript library that provides a strongly-typed and
user-friendly API for encoding and decoding data types.

Inspired by Swift's Codable API, this library aims to offer
a straightforward functional API for basic encoding and
decoding tasks. While it's a simplified initial release,
future iterations will introduce more advanced features.

For detailed API documentation, please refer to this
repository's GitHub Pages.

## Example

```typescript
const testCodec = record({
  firstName: string,
  lastName: optional(string),
  age: optional(number),
  traits: array(
    record({
      isVenerable: boolean,
      label: string,
      labelAlternatives: set(string),
      aquiredOn: date,
    })
  ),
});

type TestRecord = SourceType<typeof testCodec>;

const source: TestRecord = {
  firstName: 'Adam',
  lastName: 'Rocska',
  age: undefined,
  traits: [],
};
const str = testCodec.encode(source);
const result = testCodec.decode(str);
expect(result).toMatchObject(source);
```
