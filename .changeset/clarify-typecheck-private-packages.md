---
'@graphcommerce/misc': patch
---

Clarify the type-check workflow in CLAUDE.md: type checking is per-example
only, and optional/private packages must be activated via
`PRIVATE_ADDITIONAL_DEPENDENCIES` and codegen must be re-run before `tsgo`
sees their fragments.
