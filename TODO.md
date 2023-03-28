# TODOS

## PreRelease
- [x] Package Description
- [x] Package Keywords
- [ ] Package Author
- [ ] Browserlist
- [ ] README file.

## Make things nicer
- [ ] Bring doc' coverage to 100%
- [ ] Improve the `optional` type to allow for choice between explicit and implicit undefined field value – as in: `somthing?: type` or `something: type | undefined`
- [ ] Add `either` codec.
- [ ] Exceptions' generic structure is shit.
- [ ] Would be great to wrestle `KeyOfType` in typefest.
– [ ] Bring back our oneliner style once we figure out how to know out prettier's dumb restrictions.
- [ ] For now we only have a few measily "meh" quality unit tests. We'll need component, system and regression tests by summer.
- [ ] We could implement and open-source a 21Gram TypeDoc theme. All the options out there suck badly.
- [ ] Add `@knodes/typedoc-plugin-pages` for funky stuff.
- [ ] Contribute to `https://www.npmjs.com/package/typedoc-plugin-coverage` & fix a few typos.

## Suspicious
- [ ] @adam-rocska I distrust JavaScript's failure system. Will have to perform a thorough manual check on all type decodings + automated tests to confirm whether we get the expected runtime failres on bad string values.
