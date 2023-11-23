---
'@graphcommerce/next-ui': patch
---

Change the critical css injection location to be in the head instead of `<style>` tags in the body. It has a number of negative consequences, such as the famous "flash of unstyled content" (FOUC) and the re-paint and re-layout required.
