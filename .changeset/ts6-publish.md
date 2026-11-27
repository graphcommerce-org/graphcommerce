---
'@graphcommerce/graphql-codegen-markdown-docs': patch
'@graphcommerce/graphql-codegen-near-operation-file': patch
'@graphcommerce/hygraph-cli': patch
---

Fix the publish of `@graphcommerce/graphql-codegen-near-operation-file`, `@graphcommerce/graphql-codegen-markdown-docs` and `@graphcommerce/hygraph-cli` with TypeScript 6. Their `prepack` build failed, so npm has no 11.0.0-canary.57 to 11.0.0-canary.63 of these packages, and an install of `@graphcommerce/graphql` or `@graphcommerce/cli` from those canaries fails.
