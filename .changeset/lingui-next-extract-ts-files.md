---
'@graphcommerce/lingui-next': patch
---

`linguiNextConfig` includes the `.ts` files of a project and excludes declaration files. Lingui 5.7 escapes the parentheses of `!(*.d).ts`, so `yarn lingui` extracted no message of a `.ts` file.
