---
'@graphcommerce/next-ui': patch
---

Created a new `memoDeep` function that is a deep compare variant of `React.memo`. Performance seems to be pretty good, but should only be used as a result of a profiling session.
