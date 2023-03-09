---
'@graphcommerce/eslint-config-pwa': minor
'@graphcommerce/next-ui': patch
---

Added a linting rule that disallows `import { Theme } from '@emotion/react'` because that causes huge performance issues. Added tsc:trace to the root project to debug typescript performance issues.
