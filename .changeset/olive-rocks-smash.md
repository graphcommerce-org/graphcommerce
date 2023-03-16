---
'@graphcommerce/eslint-config-pwa': patch
'@graphcommerce/next-ui': patch
---

Added a linting rule that disallows `import { Theme } from '@emotion/react'` because that causes huge performance issues. Also added `tsc:trace` to the root project to debug typescript performance issues.
