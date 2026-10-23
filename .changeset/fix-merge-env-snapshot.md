---
'@graphcommerce/next-config': patch
---

Regenerate the `mergeEnvIntoConfig` snapshot so `yarn test` passes on
canary. The test input already feeds `GC_DEMO_MODE` and
`GC_STOREFRONT_<i>_HYGRAPH_LOCALES_0` into the env-schema parser, but
the snapshot it was compared against still reflected the pre-`demoMode`
/ pre-flattened-`hygraphLocales` schema, so every CI run since those
config fields were added has been failing the `test` job on every PR
with a snapshot mismatch unrelated to the PR's own changes.
