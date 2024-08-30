# TODOS

## Make things nicer

- [ ] Improve the `optional` type to allow for choice between explicit and implicit undefined field value – as in: `somthing?: type` or `something: type | undefined`
- [ ] Exceptions' generic structure is shit.
- [ ] Would be great to wrestle `KeyOfType` in typefest.
- [ ] For now we only have a few measily "meh" quality unit tests. We'll need component, system and regression tests by summer.

## Suspicious

- [ ] @adam-rocska I distrust JavaScript's failure system. Will have to perform a thorough manual check on all type decodings + automated tests to confirm whether we get the expected runtime failres on bad string values.
